// @ts-ignore-line
import { Observable, Subject, Subscription, defer, from } from 'rxjs';
import {  mergeMap } from 'rxjs/operators';

export const createQueue = <T>(concurrency = 1) => {
  const subject = new Subject<() => Promise<void>>();
  const add = <T>(promiseFactory: () => Promise<T>) => new Promise<T>((res, rej) => {
    const run = async () => {
      try {
        res(await promiseFactory());
      } catch (error) {
        rej(error);
      }
    };
    subject.next(run);
  });
  const $ = subject.pipe(
    mergeMap(runnable => defer(() => from(runnable())), concurrency),
  );
  $.subscribe();
  return { add, subscribe: $.subscribe.bind($) as (next?: (value: T) => void, error?: (error: any) => void, complete?: () => void) => Subscription };
};

export type PromiseQueue = ReturnType<typeof createQueue>;
