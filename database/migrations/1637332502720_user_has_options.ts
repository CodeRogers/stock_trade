import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserHasStocks extends BaseSchema {
  protected tableName = 'user_has_stocks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('stock_id')
        .unsigned()
        .references('id')
        .inTable('stocks')
        .notNullable()
        .onDelete('RESTRICT')
      table.integer('quantity').notNullable().unsigned()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
