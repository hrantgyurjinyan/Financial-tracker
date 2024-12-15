import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: '172.21.136.179',
  user: 'newuser',
  password: 'newpassword',
  database: 'financial_tracker',
  connectionLimit: 10,
})

const promisePool = pool.promise()

export default promisePool
