import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserStocksController {
  public async addStocks({ request, params }: HttpContextContract) {
    const idsStock = request.input('ids_stock')
    const user = await User.findOrFail(params.id)
    await user.related('stocks').attach(idsStock)
  }
}
