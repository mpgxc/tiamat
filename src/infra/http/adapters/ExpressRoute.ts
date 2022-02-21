import { Request, Response } from 'express';

import { Controller } from '@shared/core/Controller';
import { HttpRequest } from '@shared/http/HttpRequest';
import { HttpResponse } from '@shared/http/HttpResponse';

class ExpressRoute {
  static build(controller: Controller<HttpRequest, HttpResponse>) {
    return async (request: Request, response: Response): Promise<Response> => {
      const reponse = await controller.handle(request as HttpRequest);

      if (reponse.statusCode >= 200 && reponse.statusCode <= 299) {
        return response.status(reponse.statusCode).json(reponse.body);
      }

      return response.status(reponse.statusCode).json(reponse.body);
    };
  }
}

export { ExpressRoute };
