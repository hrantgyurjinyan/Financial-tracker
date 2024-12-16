document.addEventListener('DOMContentLoaded', () => {
  const addExpenseButton = document.getElementById('add-expense')
  addExpenseButton.addEventListener('click', () => {
    window.location.href = '/../addExpense.html'
  })

  const monthlyReportButton = document.getElementById('monthly-report')
  monthlyReportButton.addEventListener('click', () => {
    window.location.href = '/../monthly-report.html'
  })

  const logoutButton = document.getElementById('logout')
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user_id')
    window.location.href = '/../login.html'
  })
})

