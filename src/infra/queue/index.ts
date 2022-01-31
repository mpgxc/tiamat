import { container } from 'tsyringe';

import { registerAlias } from '../../shared/container/registerAlias';
import { IQueueProvider } from '../providers/QueueProvider/IQueueProvider';
import { workerQueue } from './worker';

container.registerInstance<IQueueProvider>(
  registerAlias.QueueProvider,
  workerQueue,
);
