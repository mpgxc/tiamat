abstract class Controller<Request, Response> {
  abstract handle(request?: Request): Promise<Response>;
}

export { Controller };
