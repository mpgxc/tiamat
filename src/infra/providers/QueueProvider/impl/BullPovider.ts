import { Processor, Queue, Worker } from 'bullmq';

import { redisConnection } from '../../../redis';
import { IQueueProvider, Job, JobData } from '../IQueueProvider';

class BullProvider implements IQueueProvider {
  private queue: Queue;

  constructor(private queueName: string) {
    this.queue = new Queue(queueName, {
      connection: redisConnection,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    });
  }

  get instance(): Queue {
    return this.queue;
  }

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
  }
}

export { BullProvider };
