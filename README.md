# rx-promise-queue

A promise queue implementation using RxJS 6 streams.  Add promises
to the queue and they will be resolved in batches of _concurrency_,
with each batch waiting on the previous to complete before resolving
the next.

_For example, If the concurrency is 1, the promise queue resolves one
promise at a time, waiting for the previous to complete before triggering
the next._

### EXAMPLE USEAGE
```typescript
import { createQueue } from 'rx-promise-queue';

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
```
