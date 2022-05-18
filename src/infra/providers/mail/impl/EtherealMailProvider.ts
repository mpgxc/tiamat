/* eslint-disable consistent-return */
import axios from 'axios';
import * as handlebars from 'handlebars';
import nodemailer from 'nodemailer';

import { IMailProvider, Message } from '../IMailProvider';

class EtherealMailProvider implements IMailProvider {
  async sendMail({ body, from, subject, to }: Message): Promise<void> {
    const res = await axios(
      'https://firebasestorage.googleapis.com/v0/b/temvagas-5501c.appspot.com/o/email-sample.html?alt=media&token=aa5b515b-e41a-4686-8b24-9bd916e77179',
    );

    const remotehtml = res.data;

    const template = handlebars.compile(remotehtml);
    const htmlToSend = template({
      name: 'Mateus Garcia',
    });

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
      html: htmlToSend,
      text: body,
    };

    nodemailer.createTestAccount(async (err, account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      const message = await transporter.sendMail(mailParams);

      console.log('Message sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    });
  }
}

export { EtherealMailProvider };
