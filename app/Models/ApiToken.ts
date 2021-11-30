import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ApiToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public type: string

  @column()
  public token: string

  @column.dateTime()
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}

/**
 *  table.increments('id').primary()
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
    table.string('name').notNullable()
    table.string('type').notNullable()
    table.string('token', 64).notNullable().unique()
 */
