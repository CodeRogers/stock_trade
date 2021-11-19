import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stock from 'App/Models/Stock'
import { StockStoreValidator, StockUpdateValidator } from 'App/Validators/Stock'

export default class StocksController {
  public async index({}: HttpContextContract) {
    return await Stock.all()
  }

  public async store({ request }: HttpContextContract) {
    const stock = await request.validate(StockStoreValidator)
    return await Stock.create(stock)
  }

  public async show({ params }: HttpContextContract) {
    return await Stock.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(StockUpdateValidator)
    const stock = await Stock.findOrFail(params.id)
    stock.merge(data)
    await stock.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id)
    await stock.delete()
  }
}
