import { createQueue } from '.';

let complete = 0;
const makePromiser = (name: string, n = 1000) => () => new Promise(res => setTimeout(() => {
  res(name);
  complete += 1;
  console.log('completed count: ', complete);
}, n));

const queue = createQueue();

let i = 0;
setInterval(async () => {
  i += 1;
  const n = Math.round(5000 * Math.random());
  const result = await queue.add(makePromiser(i.toString(), n));
  console.log(result);
}, 1000);
