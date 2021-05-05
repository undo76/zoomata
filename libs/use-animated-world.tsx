import { Cell2d, GridWorld2d, State2d } from "./grid-world2d";
import { useCallback, useEffect, useRef, useState } from "react";

export function useAnimatedWorld(
  width: number,
  height: number,
  initFn: (world: GridWorld2d) => GridWorld2d,
  rule: (world: GridWorld2d, [x, y]: Cell2d) => State2d,
  delay: number,
  initialRunning: boolean = true
): [
  GridWorld2d,
  boolean,
  (b: boolean) => void,
  () => void,
  () => void,
  () => void
] {
  const [world, setWorld] = useState<GridWorld2d>(
    initFn(new GridWorld2d(width, height, rule))
  );
  const [running, setRunning] = useState(initialRunning);
  const timeoutId = useRef<NodeJS.Timeout>();

  const handleStep = useCallback(() => {
    clearTimeout(timeoutId.current!);
    setWorld(world.next());
  }, [world]);

  const handleReset = useCallback(() => {
    clearTimeout(timeoutId.current!);
    setWorld(initFn(new GridWorld2d(width, height, rule)));
  }, [width, height, initFn, rule]);

  const handleClear = useCallback(() => {
    clearTimeout(timeoutId.current!);
    setWorld(new GridWorld2d(width, height, rule));
  }, [width, height, initFn, rule]);

  useEffect(handleReset, [handleReset]);
  useEffect(() => {
    if (running) {
      timeoutId.current = setTimeout(() => setWorld(world.next()), delay);
      return () => clearTimeout(timeoutId.current!);
    } else {
      clearTimeout(timeoutId.current!);
    }
  }, [world, setWorld, delay, running]);

  return [world, running, setRunning, handleStep, handleReset, handleClear];
}
