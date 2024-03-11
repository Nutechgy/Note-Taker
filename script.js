document.getElementById('noteForm') + ('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting normally

  const title = document.getElementById('titleInput').value;
  const content = document.getElementById('contentInput').value;

  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log('New note added:', data);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Error adding new note:', error);
    });
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const noteId = event.target.dataset.id;
    fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete note');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message); // Log success message
        // Update UI to reflect deleted note
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  }
});

