import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider, Message } from '../IMailProvider';

class MailtrapMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor() {
    const mailerConfigs = {
      host: String(process.env.SMTP_HOST),
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: String(process.env.SMTP_AUTH_USER),
        pass: String(process.env.SMTP_AUTH_PASS),
      },
    };

    this.transporter = nodemailer.createTransport(mailerConfigs);
  }

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

    await this.transporter.sendMail(mailParams);
  }
}

export { MailtrapMailProvider };
