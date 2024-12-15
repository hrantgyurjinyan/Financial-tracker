import db from '../models/db.js'

export const addExpense = async (req, res) => {
  const {amount, category, date, userId} = req.body

  try {
    const [result] = await db.execute(
      'INSERT INTO expenses (user_id, amount, category, date) VALUES (?, ?, ?, ?)',
      [userId, amount, category, date]
    )
    res.status(201).json({message: 'Expense added'})
  } catch (err) {
    res.status(500).json({message: 'Error adding expense', error: err})
  }
}

export const getMonthlyReport = async (req, res) => {
  const {userId, month, year} = req.query

  try {
    const [result] = await db.execute(
      'SELECT category, SUM(amount) AS total FROM expenses WHERE user_id = ? AND MONTH(date) = ? AND YEAR(date) = ? GROUP BY category',
      [userId, month, year]
    )
    res.json(result)
  } catch (err) {
    res.status(500).json({message: 'Error fetching report', error: err})
  }
}
