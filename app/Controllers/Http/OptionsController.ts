import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Option from 'App/Models/Option'
import { OptionStoreValidator, OptionUpdateValidator } from 'App/Validators/Option'

export default class OptionsController {
  public async index({}: HttpContextContract) {
    return await Option.all()
  }

  public async store({ request }: HttpContextContract) {
    const option = await request.validate(OptionStoreValidator)
    return await Option.create(option)
  }

  public async show({ params }: HttpContextContract) {
    return await Option.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(OptionUpdateValidator)
    const option = await Option.findOrFail(params.id)
    option.merge(data)
    await option.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const option = await Option.findOrFail(params.id)
    await option.delete()
  }
}
