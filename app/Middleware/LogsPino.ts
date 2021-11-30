import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import PinoLogger from 'App/PinoConfig/PinoLogger'

export default class LogsPino {
  public async handle({ response }: HttpContextContract, next: () => Promise<void>) {
    await next()

    const data: User = response.getBody()
    PinoLogger.info({ email: data.email, name: data.name }, 'user signup')
  }
}
