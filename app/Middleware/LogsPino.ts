import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
<<<<<<< Updated upstream
import User from 'App/Models/User'
import PinoLogger from 'App/PinoConfig/PinoLogger'

export default class LogsPino {
  public async handle({ response }: HttpContextContract, next: () => Promise<void>) {
    await next()

    const data: User = response.getBody()
    PinoLogger.info({ email: data.email, name: data.name }, 'user signup')
=======

export default class LogsPino {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
    await next()
    // console.log('Jairo')
>>>>>>> Stashed changes
  }
}
