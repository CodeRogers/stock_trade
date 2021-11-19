import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Stock from './Stock'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  /*
    table.string('name', 255).notNullable()
    table.string('email', 255).notNullable()
    table.enum('profile', ['admin', 'user']).notNullable().defaultTo('user')
  */
  @column()
  public name: string
  @column()
  public email: string
  @column()
  public profile: 'admin' | 'user'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Stock, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'stock_id',
    pivotTable: 'user_has_stocks',
    pivotColumns: ['quantity'],
  })
  public stocks: ManyToMany<typeof Stock>
}
