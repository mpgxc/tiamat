import { Controller } from '@shared/core/Controller';
import { HttpRequest } from '@shared/http/HttpRequest';
import { created, HttpResponse } from '@shared/http/HttpResponse';

import { SendMessage } from './SendMessage';

class SendMessageController extends Controller<HttpRequest, HttpResponse> {
  constructor(private readonly sendMessage: SendMessage) {
    super();
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    await this.sendMessage.execute(request.body);

    return created();
  }
}

export { SendMessageController };
