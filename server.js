import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import expenseRoutes from './routes/expense.js'
import cors from 'cors'
import path from 'path'  // Import path module to handle paths properly
import { fileURLToPath } from 'url'  // Import the fileURLToPath function


dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())
//const __filename = fileURLToPath(import.meta.url)
//const __dirname = path.dirname(__filename)

// Serve static files from the 'public' directory
//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.use('/auth', authRoutes)
app.use('/expense', expenseRoutes)


const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
