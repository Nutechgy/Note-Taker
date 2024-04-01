const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');//Import uuid module
const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Serve static files to public directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
// API routes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return next (err);//Pass error handler to error middleware
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // Generate a unique ID for the note
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return next(err);//Pass the err to error handler middleware
      }


//  res.cookie('cookieName', 'cookieValue', {
  // sameSite: 'none',
  // secure: true,
  // domain: '.example.com', // Replace with your domain
  // path: '/' // Replace with your desired path
// });
// 
      // res.status(201).json(newNote);
    });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return next(err);//Pass error to error handler middleware
    }

    let notes = JSON.parse(data);
    notes = notes.filter(note => note.id !== noteId);

    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) {
        console.error(err);
        return next (err);//Pass error to error handler middleware
      }
      res.status(200).json({ message: 'Note deleted successfully' });
    });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})