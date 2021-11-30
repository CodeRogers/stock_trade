import { DateTime } from 'luxon'
import {
  BaseModel,
<<<<<<< Updated upstream
  beforeSave,
  column,
=======
  column,
  beforeSave,
>>>>>>> Stashed changes
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
<<<<<<< Updated upstream
import Stock from './Stock'
import Document from './Document'
=======
import Option from './Option'
import UserDoc from './UserDoc'
>>>>>>> Stashed changes
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  @column()
  public name: string

  @column()
  public email: string

  @column()
  public profile: 'admin' | 'user'

  @column({ serializeAs: null })
  public password: string

<<<<<<< Updated upstream
=======
  @beforeSave()
  public static async hashPassword(cliente: User) {
    if (cliente.$dirty.password) {
      cliente.password = await Hash.make(cliente.password)
    }
  }
>>>>>>> Stashed changes
  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

<<<<<<< Updated upstream
  @hasMany(() => Document)
  public documentos: HasMany<typeof Document>

  @beforeSave()
  public static async hashPassword(auth: User) {
    if (auth.$dirty.password) {
      auth.password = await Hash.make(auth.password)
    }
  }

  @manyToMany(() => Stock, {
=======
  @manyToMany(() => Option, {
>>>>>>> Stashed changes
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
