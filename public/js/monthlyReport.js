document.addEventListener('DOMContentLoaded', function () {
  const userId = localStorage.getItem('user_id')
  const reportDiv = document.getElementById('report')

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
        let htmlContent = '<table border="1"><tr><th>Category</th><th>Amount</th><th>Date</th></tr>'

        expenses.forEach(expense => {
          htmlContent += `
            <tr>
              <td>${expense.category}</td>
              <td>${expense.amount}</td>
              <td>${expense.date}</td>
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
