import { Processor, Queue, QueueScheduler, Worker } from 'bullmq';

import { IQueueProvider, Job, JobData } from '../IQueueProvider';

class BullProvider implements IQueueProvider {
  constructor(private queue: Queue) {}

  async add(job: JobData): Promise<void> {
    await this.queue.add('message', job);
  }

  async process(fn: (job: Job) => Promise<void>): Promise<void> {
    new Worker(this.queue.name, fn as Processor, {
      connection: this.queue.opts.connection,
      concurrency: 100,
      limiter: {
        max: 400,
        duration: 1000,
      },
    });

    // new QueueScheduler(this.queue.name, {
    //   connection: this.queue.opts.connection,
    // });
  }
}

export { BullProvider };
