import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export function useAnimated(
  onStep: () => void,
  delay: number,
  initialRunning: boolean = true
): [boolean, (r: boolean) => void] {
  const callback = useRef(onStep);
  const timeoutId = useRef<NodeJS.Timeout>();
  const [running, setRunning] = useState<boolean>(initialRunning);

  useEffect(() => {
    callback.current = onStep;
  }, [onStep]);

  useEffect(() => {
    if (running) {
      timeoutId.current = setInterval(callback.current, delay);
    }
    return () => clearInterval(timeoutId.current!);
  }, [onStep, delay, running]);

  return [running, setRunning];
}

export function useAnimatedIterable<S extends { next: () => S }>(
  initialState: S | (() => S),
  delay: number,
  initialRunning: boolean = true
): [S, Dispatch<SetStateAction<S>>, boolean, (r: boolean) => void] {
  const [state, setState] = useState(initialState);
  const [running, setRunning] = useAnimated(
    useCallback(() => setState((s) => s.next()), [setState]),
    delay,
    initialRunning
  );
  return [state, setState, running, setRunning];
}
