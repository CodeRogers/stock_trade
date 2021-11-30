import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

enum DocType {
  CPF = 'CPF',
  RG = 'RG',
}

export default class CreateCpfValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cpfInfo: schema.file({ size: '6mb', extnames: ['jpeg', 'png', 'bmg', 'pdf'] }),
    type: schema.enum(Object.values(DocType)),
    userId: schema.number([rules.unsigned(), rules.exists({ column: 'id', table: 'users' })]),
  })

  public messages = {}
}
