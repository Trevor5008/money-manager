import mysql from '../../../../knexfile';

const db = require('knex')(mysql.development);

export default async function handler(req, res) {
   try {
      const { id } = req.query;
      const userData = await db('users')
         .where('users.id', id)
         .join('accounts', 'accounts.user_id', 'users.id')
         .select(
            'users.name as owner',
            'accounts.name',
            'starting_balance',
            'description'
         );
      res.status(200)
         .json(userData);
   } catch (err) {
      console.log(err)
   }
};