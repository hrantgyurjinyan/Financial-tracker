document.addEventListener('DOMContentLoaded', () => {
  // Handle "Add New Expense" button click
  const addExpenseButton = document.getElementById('add-expense')
  addExpenseButton.addEventListener('click', () => {
    window.location.href = '/../addExpense.html' // Redirect to add expense page
  })

  const monthlyReportButton = document.getElementById('monthly-report')
  monthlyReportButton.addEventListener('click', () => {
    window.location.href = '/../monthly-report.html' // Redirect to monthly report page
  })

  const logoutButton = document.getElementById('logout')
  logoutButton.addEventListener('click', () => {
    window.location.href = '/../login.html' // Redirect to login page
  })
})
