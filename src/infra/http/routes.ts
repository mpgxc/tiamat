import { Router } from 'express';

import { sendMessageController } from '@application/SendMessage';

import { ExpressRoute } from './adapters/ExpressRoute';

const routes = Router();

routes.post('/send-message', ExpressRoute.build(sendMessageController));

export { routes };
