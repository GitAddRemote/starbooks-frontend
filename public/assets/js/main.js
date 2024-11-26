// frontend/public/assets/js/main.js

// Initialize Materialize components
document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
});
  
// Reinitialize Materialize components after an htmx request
document.addEventListener('htmx:afterSwap', function(evt) {
  if (evt.target && evt.target.matches('select')) {
    M.FormSelect.init(evt.target);
  }
});

// Fetch user display name for the dashboard
document.addEventListener('DOMContentLoaded', function() {
  const userDisplayNameElement = document.getElementById('user-display-name');
  if (userDisplayNameElement) {
    fetch('http://localhost:3000/users/profile', {
      credentials: 'include',
    })
    .then(response => response.text())
    .then(html => {
      // Parse the HTML and extract the display name
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const displayName = tempDiv.querySelector('p strong').nextSibling.textContent.trim();
      userDisplayNameElement.textContent = displayName;
    })
    .catch(error => console.error('Error fetching user data:', error));
  }
});
  