import React, { MouseEvent, useEffect, useRef, useState } from "react";

export interface ColorMap {
  [state: number]: string | CanvasGradient | CanvasPattern;
}

export interface GridCanvasProps {
  cellWidth: number;
  cellHeight: number;
  rows: number;
  cols: number;
  padding?: number;
  radius?: number;
  onClick?: ([x, y]: [number, number]) => void;
  fillStyleFn: ([x, y]: [number, number]) =>
    | string
    | CanvasGradient
    | CanvasPattern;
}

export const GridCanvas: React.FC<GridCanvasProps> = ({
  cellWidth,
  cellHeight,
  rows,
  cols,
  padding = Math.round(cellWidth / 20),
  radius = Math.ceil(cellHeight / 5),
  fillStyleFn,
  onClick = () => void 0,
}) => {
  let canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursor, setCursor] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx != null) {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, cellWidth * cols, cellHeight * rows);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          drawCell(ctx, [x, y], fillStyleFn([x, y]));
        }
      }
      drawCell(ctx, cursor, "red");
    }
  }, [
    canvasRef,
    cellWidth,
    cellHeight,
    rows,
    cols,
    padding,
    radius,
    fillStyleFn,
  ]);

  function drawCell(
    ctx: CanvasRenderingContext2D,
    [x, y]: [number, number],
    style: string | CanvasGradient | CanvasPattern
  ) {
    ctx.fillStyle = style;
    ctx.fillRect(
      x * cellWidth,
      y * cellHeight,
      cellWidth - padding,
      cellHeight - padding
    );
  }

  function eventToCell(event: MouseEvent<HTMLCanvasElement>): [number, number] {
    const canvas = event.target as HTMLCanvasElement;
    const offsetX = event.nativeEvent.offsetX - padding;
    const offsetY = event.nativeEvent.offsetY - padding;
    const ratio = canvas.width / canvas.clientWidth;
    return [
      Math.floor((ratio * offsetX) / cellWidth),
      Math.floor((ratio * offsetY) / cellHeight),
    ];
  }

  return (
    <canvas
      ref={canvasRef}
      width={cellWidth * cols + padding}
      height={cellHeight * rows + padding}
      style={{ width: "100%", cursor: "none" }}
      onMouseMove={(ev) => {
        const ctx = canvasRef.current!.getContext("2d")!;
        const newCursor = eventToCell(ev);
        if (cursor[0] != newCursor[0] || cursor[1] != newCursor[1]) {
          drawCell(ctx, cursor, fillStyleFn(cursor));
          setCursor(newCursor);
          drawCell(ctx, newCursor, "red");
        }
      }}
      onClick={(ev) => onClick(eventToCell(ev))}
    />
  );
};

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: any,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.clearRect(x, y, width, height);
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
}
