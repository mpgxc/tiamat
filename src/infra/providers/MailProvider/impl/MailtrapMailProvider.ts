import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider, Message } from '../IMailProvider';

class MailtrapMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '23b948804781e6',
        pass: '69231179939de4',
      },
    });
  }

  async sendMail({ body, from, subject, to }: Message): Promise<void> {
    await this.transporter.sendMail({
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
    });
  }
}

export { MailtrapMailProvider };
