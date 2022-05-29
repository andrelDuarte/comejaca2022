import formData from 'form-data';
import Mailgun from 'mailgun.js';
import Client from 'mailgun.js/client';

import { logger } from '@shared/utils/logger';

import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

export class MailGunProvider implements IMailProvider {
  private mg: Client;
  private mgDomain = process.env.MAILGUN_DOMAIN;

  constructor() {
    const mailgun = new Mailgun(formData);

    this.mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    });
  }

  public async sendMail(data: ISendMailDTO): Promise<void> {
    try {
      const info = await this.mg.messages.create(this.mgDomain, data);
      logger.debug(info);
    } catch (err) {
      logger.error('MailGun', err);
    }
  }
}
