import mysql from '../../../knexfile';

const db = require('knex')(mysql.development);

export default async function handler(req, res) {
   try {
      const users = await db('users');
      res.status(200)
         .json(users);
   } catch (err) {
      console.log(err)
   }
};