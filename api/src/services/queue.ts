import queue from "queue";

const q = queue({
  concurrency: 1,
  timeout: 200,
  autostart: true,
});

export const addToQueue = (func: () => Promise<void>) => {
  if (q.length < 1) q.push(func);
};
