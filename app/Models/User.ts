import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeSave,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Option from './Option'
import UserDoc from './UserDoc'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string

  @column()
  public email: string

  @column()
  public profile: 'admin' | 'user'

  @column({ serializeAs: null })
  public password: string

  @beforeSave()
  public static async hashPassword(cliente: User) {
    if (cliente.$dirty.password) {
      cliente.password = await Hash.make(cliente.password)
    }
  }
  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Option, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'option_id',
    pivotTable: 'user_has_options',
    pivotColumns: ['result'],
    pivotTimestamps: true,
  })
  public options: ManyToMany<typeof Option>

  @hasMany(() => UserDoc, {
    foreignKey: 'userId',
  })
  public docs: HasMany<typeof UserDoc>
}
