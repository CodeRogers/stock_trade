import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Documents extends BaseSchema {
  protected tableName = 'documents'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').unsigned().notNullable().unique()
      table.string('path')
      table.enum('type', ['CPF', 'RG'])
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users')
      table.primary(['id', 'user_id'])

      table.timestamps(true, true)
    })
    this.schema.alterTable(this.tableName, (table) => {
      table.increments('id', { primaryKey: false }).alter()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
