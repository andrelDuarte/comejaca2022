import path from 'path';
import { inject, injectable } from 'tsyringe';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import ITemplateProvider from '@shared/container/providers/TemplateProvider/models/ITemplateProvider';

// import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRegistrationDTO } from '../dtos/ICreateRegistrationDTO';
import { IRegistrationsRepository } from '../repositories/IRegistrationsRepository';

@injectable()
class CreateRegistrationService {
  constructor(
    @inject('RegistrationsRepository')
    private registrationsRepository: IRegistrationsRepository,

    @inject('TemplateProvider')
    private templateProvider: ITemplateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(data: ICreateRegistrationDTO) {
    const registration = await this.registrationsRepository.create(data);

    const templateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'confirmation_mail.hbs',
    );

    const linkUpdate = `${process.env.MAIN_URL}/atualizacao_inscricao.html?id=${registration.id}`;
    const linkPrint = `${process.env.MAIN_URL}/api/registrations/print/${registration.id}`;
    const name = registration.nome_completo;

    const templateHTML = await this.templateProvider.parse({
      file: templateFile,
      variables: { linkUpdate, linkPrint, name },
    });

    const message = {
      to: registration.email,
      from: '"COMEJACA" confirmacao@comejaca.org.br',
      subject: 'Confirmação de inscrição 2022',
      html: templateHTML,
      bcc: 'coordenacaogeral@comejaca.org.br',
    };

    await this.mailProvider.sendMail(message);

    return registration;
  }
}

export { CreateRegistrationService };
