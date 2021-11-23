import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserStocksController {
  public async addStocks({ request, params }: HttpContextContract) {
    const stocks = request.input('stocks')
    const user = await User.findOrFail(params.id)
    const objectFormatter = {}
    stocks.forEach((stock) => {
      objectFormatter[Number(stock.id)] = { quantity: stock.quantity }
    })
    await user.related('stocks').attach(objectFormatter)
  }
}
