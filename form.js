document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('postForm');
  const formMessage = document.getElementById('formMessage');

  // Listen for form submission
  postForm.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent default form submission behavior

    // Capture form data
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();

    // Clear any existing messages
    formMessage.textContent = '';

    // Validate form fields (basic validation)
    if (!title || !body) {
      formMessage.textContent = 'Please fill in both fields.';
      formMessage.style.color = 'red';
      return;
    }

    // Prepare data to send (as a JSON object)
    const postData = {
      title: title,
      body: body,
      userId: 1  // Hard-coded user ID for demonstration
    };

    // Send POST request to the test API endpoint
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Display success message
        formMessage.textContent = `Post created successfully with ID ${data.id}!`;
        formMessage.style.color = 'green';

        // Optionally, reset the form
        postForm.reset();
      })
      .catch(error => {
        // Display error message
        formMessage.textContent = `Error submitting post: ${error.message}`;
        formMessage.style.color = 'red';
      });
  });
});
