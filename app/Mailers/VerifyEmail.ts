import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Application from '@ioc:Adonis/Core/Application'
import Document from 'App/Models/Document'

interface UserInfos {
  name: string
  email: string
}
export default class VerifyEmail extends BaseMailer {
  constructor(private infos: UserInfos, private document?: Document) {
    super()
  }
  public prepare(message: MessageContract) {
    message
      .subject(`CPF cadastrado`)
      .from('rogeriogvmm@gmail.com', 'Sou eu abestado!')
      .to(this.infos.email)
      .html(`Sr(a) ${this.infos.name} Verifique seu documento cadastrado no sistema`)
    // operador ternario cond?se:senao
    if (this.document?.path) {
      message.attach(Application.tmpPath(`uploads/${this.document.path}`))
    }
  }
}
