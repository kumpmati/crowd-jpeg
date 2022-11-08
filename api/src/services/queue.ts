import queue from "queue";

const q = queue({
  concurrency: 1,
  timeout: 100,
  autostart: true,
});

export const addToQueue = (func: () => Promise<void>) => {
  console.log("queue:", q.length);

  if (q.length < 100) q.push(func);
};
