document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault()

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
        // SweetAlert2 popup for success
        Swal.fire({
          title: 'Success!',
          text: 'Login successful!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect to the dashboard page after user clicks OK
          window.location.href = 'http://localhost:5000/dashboard.html'
        })
      } else {
        // SweetAlert2 popup for error
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
