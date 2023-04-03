require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
   development: {
      client: 'mysql2',
      connection: {
         host: "127.0.0.1",
         database: process.env.DB_LOCAL_DBNAME,
         user: process.env.DB_LOCAL_USER,
         password: process.env.DB_LOCAL_PASSWORD
      },
      migrations: {
         directory: './src/database/migrations'
      },
      seeds: {
         directory: './src/database/seeds'
      }
   },


   staging: {
      client: 'postgresql',
      connection: {
         database: 'my_db',
         user: 'username',
         password: 'password'
      },
      pool: {
         min: 2,
         max: 10
      },
      migrations: {
         tableName: 'knex_migrations'
      }
   },

   production: {
      client: 'postgresql',
      connection: {
         database: 'my_db',
         user: 'username',
         password: 'password'
      },
      pool: {
         min: 2,
         max: 10
      },
      migrations: {
         tableName: 'knex_migrations'
      }
   }
};