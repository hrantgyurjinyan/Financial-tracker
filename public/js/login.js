document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault()
localStorage.removeItem('username')
  console.error('REMOVE ID: ', localStorage.getItem('user_id'))

  console.error('AFTER REMOVE ID: ', localStorage.getItem('user_id'))

  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password})
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful') {
        localStorage.setItem('user_id', data.user_id)
        console.error('ID AFTER SET: ', localStorage.getItem('user_id'))
        Swal.fire({
          title: 'Success!',
          text: 'Login successful!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000, // Auto-close the popup after 2 seconds
          willClose: () => {
            window.location.href = 'http://localhost:5000/dashboard.html'
          }
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Login failed. Please check your username or password.',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    })
    .catch(error => {
      console.error('Error:', error)
      // SweetAlert2 popup for error
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    })
})
