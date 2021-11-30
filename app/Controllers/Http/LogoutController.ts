import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogoutController {
  public async index({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return 'Bye bye'
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
