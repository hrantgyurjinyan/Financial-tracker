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
        window.location.href = 'http://localhost:5000/dashboard.html'
      } else {
        alert(data.message)
      }
    })
    .catch(error => {
      console.error('Error:', error)
      alert('Login failed. Please try again.')
    })
})
