import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserDoc from 'App/Models/UserDoc'
import { FileUserValidator } from 'App/Validators/User'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Drive from '@ioc:Adonis/Core/Drive'
import SendDoc from 'App/Mailers/SendDoc'
import User from 'App/Models/User'

export default class UsersDocsController {
  public async store({ request, params }: HttpContextContract) {
    const payload = await request.validate(FileUserValidator)
    const file = payload.file
    const fileToUpload = { name: `${cuid()}.${file.extname}` }
    await file.moveToDisk('tmp', fileToUpload)
    const UserFile = {
      docName: file.fileName,
      docPath: file.filePath,
      docExt: file.extname,
      userId: params.id,
    }
    return await UserDoc.create(UserFile)
  }
  public async destroy({ params }: HttpContextContract) {
    const doc = await UserDoc.findOrFail(params.id)
    await Drive.delete(<string>doc.docPath)
    await doc.delete()
    return true
  }
  public async show({ params }: HttpContextContract) {
    const doc = await UserDoc.findOrFail(params.id)
    const user = await User.findOrFail(doc.userId)

    //Send e-mail to user with document atached
    const userInfos = {
      name: user.name,
      email: user.email,
    }
    await new SendDoc(userInfos, doc).sendLater()
  }
}
