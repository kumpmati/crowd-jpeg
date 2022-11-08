import queue from "queue";

const q = queue({
  concurrency: 1,
  timeout: 100,
  autostart: true,
});

export const addToQueue = (func: () => Promise<void>) => {
  q.push(func);
};