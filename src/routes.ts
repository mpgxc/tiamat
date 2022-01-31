import { Router } from 'express';

import { sendMessageController } from './application/SendMessage';

const routes = Router();

routes.post('/send-message', sendMessageController.handle);

export { routes };
