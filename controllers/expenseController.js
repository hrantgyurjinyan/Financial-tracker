import db from '../models/db.js'

// Add Expense Controller
export const addExpense = async (req, res) => {
  const {user_id, category, amount} = req.body

  if (!user_id || !category || !amount) {
    return res.status(400).json({message: 'User ID, category, and amount are required'})
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO expenses (user_id, category, amount) VALUES (?, ?, ?)',
      [user_id, category, amount]
    )

    res.status(201).json({message: 'Expense added successfully', expenseId: result.insertId})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error adding expense', error})
  }
}

export const getMonthlyReport = async (req, res) => {
  const {user_id} = req.params

  if (!user_id) {
    return res.status(400).json({message: 'User ID is required'})
  }

  try {
    // Fetch expenses for the current month
    const [expenses] = await db.execute(
      'SELECT * FROM expenses WHERE user_id = ? AND YEAR(date) = YEAR(CURRENT_DATE) AND MONTH(date) = MONTH(CURRENT_DATE)',
      [user_id]
    )

    if (expenses.length === 0) {
      return res.status(404).json({message: 'No expenses found for this month'})
    }

    res.status(200).json({message: 'Monthly report retrieved successfully', expenses})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error fetching monthly report', error})
  }
}
