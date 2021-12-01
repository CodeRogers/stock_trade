import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserDocs extends BaseSchema {
  protected tableName = 'user_docs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').notNullable().unique().unsigned()
      table.integer('user_id').references('id').inTable('users').notNullable().unsigned()
      table.string('doc_name').notNullable()
      table.string('doc_path').notNullable()
      table.string('doc_ext').notNullable()
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
