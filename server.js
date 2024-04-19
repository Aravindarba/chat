const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://aravind:CLTEm2seLDyfhRWa@cluster0.guwfjdb.mongodb.net/matrimonyDetailsDatabase?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: String,
  number: Number
}, { collection: 'matrimonyDetailsCollection' });

const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.send(savedUser);
});

app.listen(3001, () => console.log('Server running on port 3001'));
