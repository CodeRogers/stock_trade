import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stocks extends BaseSchema {
  protected tableName = 'stocks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.double('price').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
