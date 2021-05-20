import React, { MouseEvent, useEffect, useRef } from "react";
import { Cell2d } from "../libs/grid2d-world";

export type ColorMap = string[];

export type DrawCell = (
  ctx: CanvasRenderingContext2D,
  cell: Cell2d,
  cellWidth: number,
  cellHeight: number,
  padding: number
) => void;

export interface GridCanvasProps {
  cellWidth: number;
  cellHeight: number;
  rows: number;
  cols: number;
  drawCell: DrawCell;
  editable: boolean;
  padding?: number;
  onClick?: (cell: Cell2d) => void;
}

export const GridCanvas: React.FC<GridCanvasProps> = ({
  cellWidth,
  cellHeight,
  rows,
  cols,
  padding = Math.round(cellWidth / 20),
  editable,
  onClick,
  drawCell,
}) => {
  let canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx != null) {
      ctx.imageSmoothingEnabled = true;
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          drawCell(ctx, [x, y], cellWidth, cellHeight, padding);
        }
      }
      return () => ctx.clearRect(0, 0, cellWidth * cols, cellHeight * rows);
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
      onClick={
        editable && onClick ? (ev) => onClick(eventToCell(ev)) : undefined
      }
    />
  );
};
