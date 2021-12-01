import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Options extends BaseSchema {
  protected tableName = 'options'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').notNullable().unique().unsigned()
      table.string('crypto_symbol').notNullable()
      table.decimal('amout', 19, 4).notNullable()
      table.integer('multiplicator').notNullable().unsigned()
      table.enum('expiration', ['5m', '15m', '1h', '1d']).notNullable()
      table.primary(['id', 'user_id'])

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
