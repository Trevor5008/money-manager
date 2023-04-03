import db from '../../knexfile';

// const { client, connection } = db.development;
module.exports = require('knex')(db.development);