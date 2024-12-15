/*
// Handle Sign Up form submission
document.getElementById('signup-form')?.addEventListener('submit', async function (e) {
  e.preventDefault()

  const username = document.getElementById('username').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, email, password}),
  })

  const data = await response.json()
  alert(data.message)
  if (data.success) {
    window.location.href = '/login.html' // Redirect to login
  }
})

// Handle Login form submission
document.getElementById('login-form')?.addEventListener('submit', async function (e) {
  e.preventDefault()

  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  })

  const data = await response.json()
  alert(data.message)
  if (data.success) {
    window.location.href = '/dashboard.html' // Redirect to dashboard
  }
})


// Handle Add Expense form submission
document.getElementById('expense-form')?.addEventListener('submit', async function (e) {
  e.preventDefault()

  const amount = document.getElementById('amount').value
  const category = document.getElementById('category').value

  const response = await fetch('http://localhost:3000/add-expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({amount, category}),
  })

  const data = await response.json()
  alert(data.message)
})

// Display Monthly Report
window.onload = async function () {
  if (document.getElementById('report')) {
    const response = await fetch('http://localhost:3000/monthly-report')
    const data = await response.json()
    const reportElement = document.getElementById('report')

    if (data.success) {
      reportElement.innerHTML = `
                <h3>Total Expenses: ${data.total}</h3>
                <ul>
                    ${data.expenses.map(expense => `<li>${expense.category}: $${expense.amount}</li>`).join('')}
                </ul>
            `
    } else {
      reportElement.innerHTML = '<p>No expenses found for this month.</p>'
    }
  }
}*/
