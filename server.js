import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import expenseRoutes from './routes/expense.js'
import {login} from './controllers/authController.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/expense', expenseRoutes)


const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
