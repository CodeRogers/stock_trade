import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Document from 'App/Models/Document'
import Env from '@ioc:Adonis/Core/Env'
import Drive from '@ioc:Adonis/Core/Drive'
import CreateCpfValidator from 'App/Validators/User/CreateCpfValidator'
import Application from '@ioc:Adonis/Core/Application'
import User from 'App/Models/User'
import VerifyEmail from 'App/Mailers/VerifyEmail'

export default class DocumentsController {
  public async index({}: HttpContextContract) {
    return await Document.all()
  }

  public async store({ request }: HttpContextContract) {
    const validation = await request.validate(CreateCpfValidator)
    const { type, userId, cpfInfo } = validation
    const name = `${cuid()}.${cpfInfo.extname}`

    await cpfInfo.moveToDisk('cpf', {
      name,
      overwrite: false,
    })
    return await Document.create({
      path: `cpf/${name}`,
      type: type,
      userId: userId,
    })
  }

  public async show({ params }: HttpContextContract) {
    const document = await Document.findOrFail(params.id)
    const url = await Drive.getSignedUrl(document.path)
    const formatted = `http://${Env.get('HOST')}:${Env.get('PORT')}${url}`

    const user = await User.findOrFail(document.userId)

    await new VerifyEmail({ name: user.name, email: user.email }, document).send()

    return Env.get('NODE_ENV') === 'development' ? formatted : url
  }

  public async showDownload({ params, response }: HttpContextContract) {
    const document = await Document.findOrFail(params.id)
    response.download(Application.tmpPath(`uploads/${document.path}`))
  }

  public async destroy({}: HttpContextContract) {}
}
