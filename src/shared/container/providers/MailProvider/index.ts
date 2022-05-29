import { container } from 'tsyringe';

import { HostGatorMailProvider } from './implementations/HostGatorMailProvider';
import { MailGunProvider } from './implementations/MailGunProvider';
import { MailTrapMailProvider } from './implementations/MailTrapMailProvider';
import { SendGridMailProvider } from './implementations/SendGridMailProvider';
import { IMailProvider } from './models/IMailProvider';

const mailProvider = {
  MailTrap: MailTrapMailProvider,
  SendGrid: SendGridMailProvider,
  HostGator: HostGatorMailProvider,
  MailGun: MailGunProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER] || mailProvider.MailTrap,
);
