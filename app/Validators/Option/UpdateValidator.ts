import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    crypto_symbol: schema.string.optional({}, [rules.maxLength(4)]),
    amout: schema.number.optional([rules.unsigned()]),
    multiplicator: schema.number.optional([rules.unsigned()]),
    expiration: schema.enum.optional(['5m', '15m', '1h', '1d'] as const),
  })

  public messages = {}
}
