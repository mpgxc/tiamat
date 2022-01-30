import { Queue, QueueEvents } from 'bullmq';

import { Message } from '../providers/MailProvider/IMailProvider';
import { MailtrapMailProvider } from '../providers/MailProvider/impl/MailtrapMailProvider';
import { BullProvider } from '../providers/QueueProvider/impl/BullPovider';
import { Job } from '../providers/QueueProvider/IQueueProvider';
import { redisConnection } from '../redis';

const paint = new Queue('send-mailing', {
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

const queue = new BullProvider(paint);
const mailer = new MailtrapMailProvider();

const sender = { email: 'mpgx5.c@gmail.com', name: 'MPGX5' };

queue.add({
  body: '<p>Hello 1</p>',
  to: { email: 'test1@test1.com', name: 'teste1' },
  from: sender,
  subject: 'Teste1',
});

queue.add({
  body: '<p>Hello 2</p>',
  to: { email: 'test2@test2.com', name: 'teste2' },
  from: sender,
  subject: 'Teste2',
});

queue.add({
  body: '<p>Hello 3</p>',
  to: { email: 'test2@test2.com', name: 'teste3' },
  from: sender,
  subject: 'Teste3',
});

queue.process(async ({ data }: Job) => {
  await mailer.sendMail(data as Message);
});

// Consumers
const queueEvents = new QueueEvents(paint.name, {
  connection: paint.opts.connection,
});

queueEvents.on('progress', ({ jobId, data }, timestamp) => {
  console.log(`${jobId} Progresso ${data} em ${timestamp}`);
});

queueEvents.on('completed', ({ jobId }) => {
  console.log(`Terminou: ${jobId}`);
});

queueEvents.on('failed', (jobId, failedReason) => {
  console.error(`Erro: ${jobId}${failedReason}`);
});
