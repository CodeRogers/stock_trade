import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import UserDoc from 'App/Models/UserDoc'
import Env from '@ioc:Adonis/Core/Env'

//Interface for necessaries infos
interface UserInfos {
  name: string
  email: string
}

export default class SendDoc extends BaseMailer {
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "SendDoc.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  constructor(private userInfos: UserInfos, private doc?: UserDoc) {
    super()
  }
  public prepare(message: MessageContract) {
    message
      .subject(`Documento Solicitado - ${this.userInfos.name}`)
      .from(Env.get('SMTP_USERNAME'))
      .to(this.userInfos.email)
      .html('Segue em anexo seu documetno solicitado')
    if (this.doc?.docPath) {
      message.attach(<string>this.doc.docPath),
        {
          filename: `${this.doc.docName}.${this.doc.docExt}`,
          contentDisposition: 'attachment',
          contentType: `document/${this.doc.docExt}`,
        }
    }
  }
}
