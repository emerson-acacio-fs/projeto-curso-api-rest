import nodemailer from 'nodemailer';
import {
  handlebarsMailTemplate,
  IParseMailTemplate,
} from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API',
        address: from?.email || 'aaaaa@gmail.com',
      },
      to: {
        name: to.name || 'Equipe API',
        address: to.email || 'aaaaa@gmail.com',
      },
      subject,
      html: await handlebarsMailTemplate.parse(templateData),
    });
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
