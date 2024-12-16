document.getElementById('expense-form').addEventListener('submit', function (e) {
  e.preventDefault()

  const category = document.getElementById('category').value
  const amount = document.getElementById('amount').value
  const userId = localStorage.getItem('user_id')
  console.log('add USER ID: ', userId)
  if (!category || !amount || !userId) {
    Swal.fire({
      title: 'Error!',
      text: 'Please fill out all fields.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
    return
  }

  fetch('http://localhost:5000/expense/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({user_id: userId, category, amount})
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Expense added successfully') {
        Swal.fire({
          title: 'Success!',
          text: 'Expense added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.href = '/dashboard.html'
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Failed to add expense.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    })
    .catch(error => {
      console.error('Error:', error)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add expense. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
})
