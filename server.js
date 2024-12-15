import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import expenseRoutes from './routes/expense.js'
import {login} from './controllers/authController.js'

dotenv.config()

const app = express()
app.use(express.json())

// No need for a direct db connection here anymore, just the routes will handle it

app.use('/auth', authRoutes())  // Authentication routes
app.use('/expense', expenseRoutes())  // Expense routes

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
