document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault()

  const username = document.getElementById('username').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  fetch('http://localhost:5000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, email, password}),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'User created') {
        localStorage.setItem('user_id', data.user_id)
        Swal.fire({
          title: 'Success!',
          text: 'User created successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect to the login page after user clicks OK
          window.location.href = 'http://localhost:5000/login.html'
        })
      } else {
        // SweetAlert2 popup for error
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Sign up failed.',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    })
})
