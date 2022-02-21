/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpStatusCodes } from './HttpStatusCodes';

type HttpResponse = {
  statusCode: number;
  body: any;
};

const ok = <T>(dto?: T): HttpResponse => ({
  statusCode: HttpStatusCodes.STATUS_CODE_OK,
  body: dto,
});

const created = <T>(dto?: T): HttpResponse => ({
  statusCode: HttpStatusCodes.STATUS_CODE_CREATED,
  body: dto,
});

export { HttpResponse, created, ok };
