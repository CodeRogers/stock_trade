import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

enum ProfileTypes {
  ADMIN = 'admin',
  USER = 'user',
}

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({ column: 'email', table: 'users' }),
    ]),
    profile: schema.enum.optional(Object.values(ProfileTypes)),
  })

  public messages = {}
}
