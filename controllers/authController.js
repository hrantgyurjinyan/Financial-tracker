import bcrypt from 'bcryptjs'
import db from '../models/db.js'

export const signup = async (req, res) => {
  const {username, password, email} = req.body

  if (!email) {
    return res.status(400).json({message: 'Email is required'})
  }

  try {
    const [existingUsername] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )

    if (existingUsername.length > 0) {
      return res.status(400).json({message: 'Username already exists'})
    }

    const [existingEmail] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (existingEmail.length > 0) {
      return res.status(400).json({message: 'Email already exists'})
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const [result] = await db.execute(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    )

    res.status(201).json({message: 'User created', user_id: result.insertId})
  } catch (err) {
    res.status(500).json({message: 'Error signing up', error: err})
  }
}

export const login = async (req, res) => {
  const {username, password} = req.body

  try {
    const [user] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )

    if (user.length === 0) {
      return res.status(400).json({success: false, message: 'Invalid username or password'})
    }

    const isPasswordValid = bcrypt.compareSync(password, user[0].password)

    if (!isPasswordValid) {
      return res.status(400).json({success: false, message: 'Invalid username or password'})
    }

    res.status(200).json({success: true, message: 'Login successful', user_id: user[0].id})
    console.error('DDDDDDDDDDDDD: ', user[0].id)
  } catch (err) {
    res.status(500).json({success: false, message: 'Error logging in', error: err})
  }
}


