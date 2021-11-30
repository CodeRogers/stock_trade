import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    crypto_symbol: schema.string({}, [rules.maxLength(4)]),
    amout: schema.number([rules.unsigned()]),
    multiplicator: schema.number([rules.unsigned()]),
    expiration: schema.enum(['5m', '15m', '1h', '1d'] as const),
  })

  public messages = {}
}
