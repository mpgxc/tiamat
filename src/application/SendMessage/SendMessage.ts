import { inject, injectable } from 'tsyringe';

import { IQueueProvider } from '@infra/providers/queue/IQueueProvider';
import { registerAlias } from '@shared/container/registerAlias';

type SendMessageRequest = {
  to: Array<{ email: string; name: string }>;
  body: string;
  subject: string;
};

@injectable()
class SendMessage {
  constructor(
    @inject(registerAlias.QueueProvider)
    private queueProvider: IQueueProvider,
  ) {}

  public async execute({
    body,
    to,
    subject,
  }: SendMessageRequest): Promise<void> {
    const buildMailContent = (email: string, name: string) => ({
      body,
      subject,
      to: { name, email },
      from: {
        name: 'mpgxc',
        email: 'mpgx5.c@gmail.com',
      },
    });

    const promisesTo = to.map(({ email, name }) =>
      this.queueProvider.add(buildMailContent(email, name)),
    );

    await Promise.all(promisesTo);
  }
}

export { SendMessage, SendMessageRequest };
