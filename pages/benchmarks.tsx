import { PageLayout } from "../components/PageLayout";
import React, { useEffect, useReducer } from "react";
import { Grid2dWorld } from "../libs/grid2d-world";
import { randomizeWorld, singleDotInitFn } from "../libs/utils";
import { gameOfLifeRule } from "./game-of-life";
import { asyncRepeat } from "../libs/async";
import { langtonAntRule } from "./langton-ant";

export default function Benchmarks() {
  const gol = new Grid2dWorld(100, 100, randomizeWorld, gameOfLifeRule);
  const ant = new Grid2dWorld(100, 100, singleDotInitFn, langtonAntRule);
  return (
    <PageLayout title="Benchmarks">
      <div className="flex-col space-y-4">
        <Benchmark
          title="Game of life"
          batches={100}
          batchSize={10}
          fn={() => gol.next()}
        />
        <Benchmark
          title="Langton's ant"
          batches={100}
          batchSize={10}
          fn={() => ant.next()}
        />
      </div>
    </PageLayout>
  );
}

const Benchmark: React.FC<{
  title: React.ReactNode;
  batches: number;
  batchSize: number;
  fn: (idx: number) => void;
}> = ({ title, batches, batchSize, fn }) => {
  const times = useAsyncBenchmark(batches, batchSize, fn);
  return (
    <Card title={<h3 className="text-2xl uppercase text-gray-700">{title}</h3>}>
      <dl className="flex justify-between">
        {Object.entries(metrics(times)).map(([key, value]) => (
          <div>
            <dt className="uppercase font-bold text-gray-700">{key}</dt>
            <dd>{Math.round(value)}</dd>
          </div>
        ))}
      </dl>

      <div>
        <Histogram values={times} bins={30} />
      </div>
    </Card>
  );
};

interface Metrics {
  std: number;
  avg: number;
  min: number;
  size: number;
  max: number;
  sum: number;
}

function metrics(items: number[]): Metrics {
  const size = items.length,
    sum = items.reduce((acc, item) => acc + item, 0),
    avg = sum / size,
    std = Math.sqrt(
      items.reduce((acc, item) => acc + (item - avg) ** 2, 0) / size
    ),
    min = Math.min(...items),
    max = Math.max(...items);
  return { size, sum, avg, std, min, max };
}

function useAsyncBenchmark<T>(
  batches: number,
  batchSize: number,
  callback: (idx: number) => T
) {
  const [times, addBatchTimes] = useReducer(
    (times: number[], batchTimes: number[]) => [...times, ...batchTimes],
    []
  );
  useEffect(() => {
    asyncRepeat(batches, (idx) => {
      const batchTimes = [];
      for (let i = 0; i < batchSize; i++) {
        const start = performance.now();
        callback(idx);
        const stop = performance.now();
        batchTimes.push(stop - start);
      }
      addBatchTimes(batchTimes);
    });
  }, []);
  return times;
}

export function Card(props: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:p-6">{props.title}</div>
      <div className="px-4 py-4 sm:px-6">{props.children}</div>
    </div>
  );
}

interface HistogramProps {
  values: number[];
  bins: number;
}

export const Histogram: React.FC<HistogramProps> = ({
  values,
  bins,
  ...props
}) => {
  const counts = histogram(values, bins);
  const maxCount = Math.max(...counts);
  return (
    <svg
      viewBox={`0 0 ${bins} ${bins / 4}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {counts.map((count, bin) => {
        return (
          <rect
            x={bin}
            y={(bins * (1 - count / maxCount)) / 4}
            width={0.95}
            height={((bins / 4) * count) / maxCount}
            fill="#e95"
          />
        );
      })}
    </svg>
  );
};

function histogram(values: number[], bins: number): number[] {
  const { avg, std } = metrics(values);
  values = values.map((v) => (v - avg < 2 * std ? v : avg + 2 * std));
  const { min, max } = metrics(values);
  const binWidth = (max - min + 0.0001) / bins;
  const binValues = values.map((v) => Math.floor((v - min) / binWidth));
  const counts = Array<number>(bins).fill(0);
  for (const b of binValues) {
    counts[b]++;
  }
  return counts;
}
