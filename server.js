import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import expenseRoutes from './routes/expense.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.static('public'))

app.use('/auth', authRoutes)
app.use('/expense', expenseRoutes)

//MESSAGE FOR METAKSYA

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
