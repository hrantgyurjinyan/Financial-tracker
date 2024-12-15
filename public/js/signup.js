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
    body: JSON.stringify({username, email, password})
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'User created') {
        window.location.href = '../login.html' // Full path to login page
      } else {
        alert(data.message) // Show error message
      }
    })
    .catch(error => {
      console.error('Error:', error)
      alert('Sign up failed. Please try again.')
    })
})
