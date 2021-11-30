import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserStoreValidator, UserUpdateValidator } from 'App/Validators/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.query()
      .preload('stocks', (query) => {
        return query.pivotColumns(['quantity'])
      })
      .preload('documentos')
    return users
  }

  public async store({ request }: HttpContextContract) {
    const user = await request.validate(UserStoreValidator)
    return await User.create(user)
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return user
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(UserUpdateValidator)
    const user = await User.findOrFail(params.id)
    user.merge(data)
    await user.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}
