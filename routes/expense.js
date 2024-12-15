import express from 'express'
import {addExpense, getMonthlyReport} from '../controllers/expenseController.js'

const router = express.Router()

router.post('/add', addExpense)
router.get('/monthly', getMonthlyReport)

export default (db) => router
