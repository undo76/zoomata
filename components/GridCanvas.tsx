import React, { MouseEvent, useEffect, useRef } from "react";
import { Cell2d } from "../libs/grid2d-world";

export interface ColorMap {
  [state: number]: string | CanvasGradient | CanvasPattern;
}

export interface GridCanvasProps {
  cellWidth: number;
  cellHeight: number;
  rows: number;
  cols: number;
  drawCell: (
    ctx: CanvasRenderingContext2D,
    cell: Cell2d,
    cellWidth: number,
    cellHeight: number,
    padding: number
  ) => void;
  editable: boolean;
  padding?: number;
  onClick?: ([x, y]: [number, number]) => void;
  cursorStyle?: string | CanvasGradient | CanvasPattern;
}

export const GridCanvas: React.FC<GridCanvasProps> = ({
  cellWidth,
  cellHeight,
  rows,
  cols,
  padding = Math.round(cellWidth / 20),
  editable,
  onClick = () => void 0,
  drawCell,
  cursorStyle = "red",
}) => {
  let canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx != null) {
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, cellWidth * cols, cellHeight * rows);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          drawCell(ctx, [x, y], cellWidth, cellHeight, padding);
        }
      }
    }
  });

  function eventToCell(event: MouseEvent<HTMLCanvasElement>): Cell2d {
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
      width={cellWidth * cols - padding}
      height={cellHeight * rows - padding}
      style={{ width: "100%", cursor: editable ? "crosshair" : "initial" }}
      onClick={(ev) => {
        if (editable) {
          const newCursor = eventToCell(ev);
          onClick(newCursor);
        }
      }}
    />
  );
};

export function drawRectCell(
  fillStyleFn: (cell: Cell2d) => string | CanvasGradient | CanvasPattern,
  ctx: CanvasRenderingContext2D,
  cell: Cell2d,
  cellWidth: number,
  cellHeight: number,
  padding: number
) {
  const [x, y] = cell;
  ctx.fillStyle = fillStyleFn(cell);
  ctx.fillRect(
    x * cellWidth,
    y * cellHeight,
    cellWidth - padding,
    cellHeight - padding
  );
}
