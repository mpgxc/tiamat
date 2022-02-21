import { Processor, Queue, Worker } from 'bullmq';

import { redisConnection } from '@infra/redis';

import { IQueueProvider, Job } from '../IQueueProvider';

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

  async add(job: Job): Promise<void> {
    await this.queue.add('message', job);
  }

  async process(fn: (job: { data: Job }) => Promise<void>): Promise<void> {
    const workerConfigs = {
      concurrency: 100,
      connection: this.queue.opts.connection,
      limiter: { max: 400, duration: 1000 },
    };

    new Worker(this.queue.name, fn as Processor, workerConfigs);
  }
}

export { BullProvider };
