import { container } from 'tsyringe';

import { IQueueProvider } from '@infra/providers/queue/IQueueProvider';
import { registerAlias } from '@shared/container/registerAlias';

import { workerQueue } from './worker';

container.registerInstance<IQueueProvider>(
  registerAlias.QueueProvider,
  workerQueue,
);
