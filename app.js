// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const userDirectoryEl = document.getElementById('userDirectory');
  const searchBox = document.getElementById('searchBox');

  try {
    // Fetch users from JSONPlaceholder
    const users = await fetchUsers();
    // Remove the loading indicator
    loadingEl.style.display = 'none';
    // Display all users initially
    displayUsers(users, userDirectoryEl);

    // Add event listener for search filtering
    searchBox.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
      );
      // Clear previous results and display new filtered users
      userDirectoryEl.innerHTML = '';
      if (filteredUsers.length > 0) {
        displayUsers(filteredUsers, userDirectoryEl);
      } else {
        userDirectoryEl.innerHTML = '<p>No users found.</p>';
      }
    });
  } catch (error) {
    loadingEl.style.display = 'none';
    errorEl.textContent = `Error: ${error.message}`;
  }
}

// Function to fetch users using async/await
async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }
  return response.json();
}

// Function to display a list of users
function displayUsers(users, container) {
  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <h2>${user.name} (${user.username})</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.suite}, ${user.address.street}, ${user.address.city}</p>
    `;
    container.appendChild(card);
  });
}

