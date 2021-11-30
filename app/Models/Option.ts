import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

<<<<<<< Updated upstream:app/Models/Stock.ts
export default class Stock extends BaseModel {
=======
export default class Option extends BaseModel {
>>>>>>> Stashed changes:app/Models/Option.ts
  public serializeExtras() {
    return {
      quantity: this.$extras.pivot_quantity,
    }
  }
<<<<<<< Updated upstream:app/Models/Stock.ts
=======

>>>>>>> Stashed changes:app/Models/Option.ts
  @column({ isPrimary: true })
  public id: number

  @column()
  public crypto_symbol: string

  @column()
  public amount: number

  @column()
  public multiplicator: number

  @column()
  public expiration: '5m' | '15m' | '1h' | '1d'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'option_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'user_has_options',
    pivotColumns: ['result'],
  })
  public users: ManyToMany<typeof User>
}
