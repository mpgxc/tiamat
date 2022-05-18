import { IMailProvider, Message } from '../IMailProvider';

class LoggerMailProvider implements IMailProvider {
  async sendMail({ body, from, subject, to }: Message): Promise<void> {
    const mailParams = {
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from.name,
        address: from.email,
      },
      subject,
      html: body,
      text: body,
    };

    console.log('[Email]: ', mailParams);
  }
}

export { LoggerMailProvider };
