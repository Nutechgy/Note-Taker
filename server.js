const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Define port

// Other server setup code goes here...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
