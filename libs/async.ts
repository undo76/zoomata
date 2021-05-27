function immediatePromise<T>(value: (() => T) | T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value instanceof Function ? value() : value), 0);
  });
}

export async function* asyncRange(
  from: number,
  to: number
): AsyncGenerator<number> {
  for (let i = from; i < to; i++) {
    yield immediatePromise(i);
  }
}

export async function asyncRepeat<T>(
  n: number,
  callback: (idx: number) => T
): Promise<void> {
  for await (let i of asyncRange(0, n)) {
    callback(i);
  }
}

// asyncRepeat(10, console.log);
