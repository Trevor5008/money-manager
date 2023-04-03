/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
   return knex.schema
      .createTable('users', (table) => {
         table.increments('id').primary();
         table.string('name');
         table.string('email');
         table.string('username');
         table.string('password');
         table.string('phone');
         table.json('preferences');
      })
      .createTable('icons', function(table) {
         table.increments('id').primary();
         table.string('name');
      })
      .createTable('account_type', function(table) {
         table.increments('id').primary();
         table.integer('icon_id').unsigned();
         table
            .foreign('icon_id')
            .references('id')
            .inTable('icons');
         table.string('type');
      })
      .createTable('account_subtype', function (table) {
         table.increments('id').primary();
         table.integer('account_type_id').unsigned();
         table.integer('icon_id').unsigned();
         table
            .foreign('account_type_id')
            .references('id')
            .inTable('account_type');
         table
            .foreign('icon_id')
            .references('id')
            .inTable('icons');
         table.string('subtype');
      })
      .createTable('accounts', function(table) {
         table.increments('id').primary();
         table.integer('user_id').unsigned();
         table.integer('account_subtype_id').unsigned();
         table
            .foreign('user_id')
            .references('id')
            .inTable('users');
         table
            .foreign('account_subtype_id')
            .references('id')
            .inTable('account_subtype');
         table.integer('icon_id').unsigned();
         table
            .foreign('icon_id')
            .references('id')
            .inTable('icons');
         table.string('name');
         table.decimal('starting_balance');
         table.date('opened_date');
         table.date('closed_date');
         table.string('description');
      })
      .createTable('transaction_type', function(table) {
         table.increments('id').primary();
         table.integer('icon_id').unsigned();
         table
            .foreign('icon_id')
            .references('id')
            .inTable('icons');
         table.string('type');
      })
      .createTable('transaction_subtype', function(table) {
         table.increments('id').primary();
         table.integer('transaction_type_id').unsigned();
         table.integer('icon_id').unsigned();
         table
            .foreign('transaction_type_id')
            .references('id')
            .inTable('transaction_type');
         table
            .foreign('icon_id')
            .references('id')
            .inTable('icons');
         table.string('subtype');
      })
      .createTable('recurrence_period', function(table) {
         table.increments('id').primary();
         table.string('recurrence_type');
         table.date('start_date');
         table.date('end_date');
      })
      .createTable('transactions', function(table) {
         table.increments('id').primary();
         table.integer('account_id').unsigned();
         table
            .integer('transaction_subtype_id').unsigned();
         table.integer('recurrence_period_id').unsigned();
         table
            .foreign('transaction_subtype_id')
            .references('id')
            .inTable('transaction_subtype');
         table
            .foreign('account_id')
            .references('id')
            .inTable('accounts');
         table
            .foreign('recurrence_period_id')
            .references('id')
            .inTable('recurrence_period');
         table.decimal('amount');
         table.string('status');
         table.string('description');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
   return knex.schema
      .dropTable('transactions')
      .dropTable('recurrence_period')
      .dropTable('transaction_subtype')
      .dropTable('transaction_type')
      .dropTable('accounts')
      .dropTable('account_subtype')
      .dropTable('account_type')
      .dropTable('icons')
      .dropTable('users');
};
