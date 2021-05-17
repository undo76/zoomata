import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export function useDebounced<S>(
  initialState: S | (() => S),
  delay: number = 100
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return clearTimeout(timeoutId.current!);
  }, []);

  const setDebouncedState = (s: S | ((s: S) => S)) => {
    clearTimeout(timeoutId.current!);
    timeoutId.current = setTimeout(() => setState(s), delay);
  };

  return [state, setDebouncedState];
}
