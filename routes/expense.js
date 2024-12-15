import express from 'express'
import {addExpense, getMonthlyReport} from '../controllers/expenseController.js'

const router = express.Router()

router.post('/add', addExpense)
router.get('/monthly-report/:user_id', getMonthlyReport)

export default router
