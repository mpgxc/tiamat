import { QueueEvents } from 'bullmq';

import { Message } from '../providers/MailProvider/IMailProvider';
import { MailtrapMailProvider } from '../providers/MailProvider/impl/MailtrapMailProvider';
import { BullProvider } from '../providers/QueueProvider/impl/BullPovider';
import { Job } from '../providers/QueueProvider/IQueueProvider';

const workerQueue = new BullProvider('send-mailing');
const mailer = new MailtrapMailProvider();

workerQueue.process(async ({ data }: Job) => {
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
