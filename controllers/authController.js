import bcrypt from 'bcryptjs'
import db from '../models/db.js'


export const signup = async (req, res) => {
  const {username, password, email} = req.body

  if (!email) {
    return res.status(400).json({message: 'Email is required'})
  }

  const hashedPassword = bcrypt.hashSync(password, 10)

  try {
    const [result] = await db.execute(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    )
    console.log(result)

    res.status(201).json({message: 'User created'})
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

    res.status(200).json({success: true, message: 'Login successful'})
  } catch (err) {
    res.status(500).json({success: false, message: 'Error logging in', error: err})
  }
}


