import { stringToPatch } from "./utils";

export const patches = {
  cross1: stringToPatch(`
 1 
111
 1
`),

  cross2: stringToPatch(`
  1
  1 
11111
  1
  1
`),

  gliderRightDown: stringToPatch(`
 1
  1
111
`),

  gliderRightUp: stringToPatch(`
111
  1
 1
`),

  gliderLeftDown: stringToPatch(`
 1
1
111
`),

  gliderLeftUp: stringToPatch(`
111
1 
 1
`),
};
