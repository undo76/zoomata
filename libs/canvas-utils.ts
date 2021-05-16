import { Cell2d } from "./grid2d-world";

export function roundedRect(
  fillStyleFn: (cell: Cell2d) => string | CanvasGradient | CanvasPattern,
  ctx: CanvasRenderingContext2D,
  cell: Cell2d,
  width: number,
  height: number,
  padding: number,
  radius: number
) {
  const [x, y] = cell;
  ctx.fillStyle = fillStyleFn(cell);
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

export function drawRectCell(
  fillStyleFn: (cell: Cell2d) => string | CanvasGradient | CanvasPattern,
  ctx: CanvasRenderingContext2D,
  cell: Cell2d,
  width: number,
  height: number,
  padding: number
) {
  const [x, y] = cell;
  ctx.fillStyle = fillStyleFn(cell);
  ctx.fillRect(x * width, y * height, width - padding, height - padding);
}

// export function drawCircleCell(
//   fillStyleFn: (cell: Cell2d) => string | CanvasGradient | CanvasPattern,
//   ctx: CanvasRenderingContext2D,
//   cell: Cell2d,
//   width: number,
//   height: number,
//   padding: number
// ) {
//   const [x, y] = cell;
//   ctx.fillStyle = fillStyleFn(cell);
//   ctx.ellipse(
//     x * width + width / 2,
//     y * height + height / 2,
//     0,
//     (width - padding) / 2,
//     (height - padding) / 2,
//     0,
//     2 * Math.PI
//   );
//   ctx.fill();
// }
