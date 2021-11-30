import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/*
 * Accepted Types
 */
enum ProfileTypes {
  ADMIN = 'admin',
  USER = 'user',
}

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    email: schema.string({}, [rules.email(), rules.unique({ column: 'email', table: 'users' })]),
    password: schema.string(),
    profile: schema.enum(Object.values(ProfileTypes)),
  })

  public messages = {}
}
