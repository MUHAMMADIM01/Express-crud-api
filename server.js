const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample in-memory data
let items = [
  { id: 1, name: "Item One", description: "This is item one" }
];

// Root Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// CRUD Routes
app.get('/items', (req, res) => res.json(items));
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  item ? res.json(item) : res.status(404).send('Item not found');
});
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  const newItem = { id: items.length + 1, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
});
app.put('/items/:id', (req, res) => {
  const { name, description } = req.body;
  const item = items.find(i => i.id == req.params.id);
  if (!item) return res.status(404).send('Item not found');
  item.name = name;
  item.description = description;
  res.json(item);
});
app.delete('/items/:id', (req, res) => {
  items = items.filter(i => i.id != req.params.id);
  res.send('Deleted');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
