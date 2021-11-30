import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiToken from 'App/Models/ApiToken'
import User from 'App/Models/User'

export default class LoginController {
  public async index({}: HttpContextContract) {}

  public async store({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.findByOrFail('email', email)

    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest('Invalid credentials')
    }

    if (await ApiToken.findBy('user_id', user.id)) {
      await ApiToken.query().delete().where('user_id', user.id)
    }

    const token = await auth.use('api').attempt(email, password, { expiresIn: '1m' })
    return token
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
