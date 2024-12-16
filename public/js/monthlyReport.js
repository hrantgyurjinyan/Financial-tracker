document.addEventListener('DOMContentLoaded', function () {
  const userId = localStorage.getItem('user_id')
  const reportDiv = document.getElementById('report')
  const totalExpensesDiv = document.getElementById('total-expenses') // Target the total expenses section

  if (!userId) {
    Swal.fire({
      title: 'Error!',
      text: 'You must be logged in to view the monthly report',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = '/login.html'
    })
    return
  }

  fetch(`http://localhost:5000/expense/monthly-report/${userId}`)
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Monthly report retrieved successfully') {
        const expenses = data.expenses
        const totalExpenses = data.totalExpenses // Extract the total expenses from the response

        // Update the total expenses section
        totalExpensesDiv.textContent = `TOTAL EXPENSES: $${totalExpenses.toFixed(2)}`

        // Generate the HTML for the expenses table
        let htmlContent = '<table border="1"><tr><th>Category</th><th>Amount</th><th>Date</th></tr>'

        expenses.forEach(expense => {
          const formattedDate = new Date(expense.date).toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })
          htmlContent += `
            <tr>
              <td>${expense.category}</td>
              <td>${expense.amount}</td>
              <td>${formattedDate}</td>
            </tr>
          `
        })

        htmlContent += '</table>'
        reportDiv.innerHTML = htmlContent
      } else {
        reportDiv.innerHTML = `<p>${data.message}</p>`
      }
    })
    .catch(error => {
      console.error('Error:', error)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch the monthly report. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
})
