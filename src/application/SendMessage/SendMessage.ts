import { inject, injectable } from 'tsyringe';

import { IQueueProvider } from '../../infra/providers/QueueProvider/IQueueProvider';
import { registerAlias } from '../../shared/container/registerAlias';

type SendMessageRequest = {
  destiny: Array<{ email: string; name: string }>;
  body: string;
  subject: string;
};

@injectable()
class SendMessage {
  constructor(
    @inject(registerAlias.QueueProvider)
    private queueProvider: IQueueProvider,
  ) {}

  public async run({
    destiny,
    body,
    subject,
  }: SendMessageRequest): Promise<void> {
    await Promise.all(
      destiny.map(async ({ email, name }) =>
        this.queueProvider.add({
          body,
          to: { email, name },
          from: { email: 'mpgx5.c@gmail.com', name: 'mpgxc' },
          subject,
        }),
      ),
    );
  }
}

export { SendMessage };
