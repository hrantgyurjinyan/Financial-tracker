document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = 'dashboard.html'; // Redirect to dashboard on success
      } else {
        alert(data.message); // Show error message
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
    });
});
