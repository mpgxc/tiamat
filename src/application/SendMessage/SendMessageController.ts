import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendMessage } from './SendMessage';

class SendMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const sendMessage = container.resolve(SendMessage);

      await sendMessage.run(request.body);

      return response.status(201).json({ message: 'ok!' });
    } catch (error) {
      return response.status(400).json({ message: 'fail!', error });
    }
  }
}

export { SendMessageController };
