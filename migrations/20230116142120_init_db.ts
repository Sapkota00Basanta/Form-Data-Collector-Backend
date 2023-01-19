import { Knex } from 'knex';

/*
    here, char and varchar type of database data can be used for indexing as well,
    but text type data is usually large and stored on disk
*/
// up migration is used to create a table
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('submissions', (table) => {
    table.specificType('id', 'CHAR(16)').primary();
    table.jsonb('data').notNullable();
    table.timestamp('submittedAt').notNullable;
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable();
  });
}

// down is used while running down migration
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('submissions');
}
