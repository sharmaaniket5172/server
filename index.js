const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();


const PORT = process.env.PORT || 3000 ;

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB
const mongoURI = 'mongodb+srv://sharmaaniket5172:ZOToAknimLG2JaPt@cluster0.r9qcwqw.mongodb.net/Referal_info';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });


  // Define Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  referralCode: { type: String, required: true }
});


const User = mongoose.model('User', userSchema);



// Routes
app.post('/users', async (req, res) => {
    const { username, email, referralCode } = req.body;
    try {
      const newUser = new User({ username, email, referralCode });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Start the server
app.listen(PORT, () => {
    console.log(`Server is running on this PORT:${PORT}`);
  });





  
