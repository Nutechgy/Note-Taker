const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Define port

// Other server setup code goes here...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'notes.html'));
});
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      let notes = JSON.parse(data);
      notes = notes.filter(note => note.id !== noteId);

      fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
          if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.status(200).json({ message: 'Note deleted successfully' });
      });
  });
});
