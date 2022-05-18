import { QueueEvents } from 'bullmq';

import { Message } from '@infra/providers/mail/IMailProvider';
import { EtherealMailProvider } from '@infra/providers/mail/impl/EtherealMailProvider';
import { BullProvider } from '@infra/providers/queue/impl/BullQueuePovider';

const workerQueue = new BullProvider('send-mailing');
const mailer = new EtherealMailProvider();

workerQueue.process(async ({ data }) => {
  await mailer.sendMail(data as Message);
});

const queueEvents = new QueueEvents(workerQueue.instance.name, {
  connection: workerQueue.instance.opts.connection,
});

queueEvents.on('completed', ({ jobId }) => {
  console.log(`Terminou: ${jobId}`);
});

queueEvents.on('failed', (jobId, failedReason) => {
  console.error(`Erro: ${jobId}-${failedReason}`);
});

export { workerQueue };
