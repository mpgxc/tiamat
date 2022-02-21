import { container } from 'tsyringe';

import { SendMessage } from './SendMessage';
import { SendMessageController } from './SendMessageController';

const sendMessage = container.resolve(SendMessage);
const sendMessageController = new SendMessageController(sendMessage);

export { sendMessageController };
