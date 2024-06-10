const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = 'Thereoncewasaship$'


// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' })); // Adjust limit as needed
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Define a user schema and model
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    uname: String,
    email: String,
    password: String,
    myFile: String, // Store the base64-encoded file
});

const User = mongoose.model('User', userSchema);

// Handle signup route
app.post('/signup', [
    body('fname', 'Enter a valid Name').isLength({ min: 3 }),
    body('lname', 'Enter a valid Name').isLength({ min: 3 }),
    body('uname', 'Enter a valid Name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid Email Address').isEmail(),
], async (req, res) => {
    const { fname, lname, uname, email, password, myFile } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether a user with this email already exists
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ error: "A user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        
        // Create a new user
        const newUser = new User({ fname, lname, uname, email, password: secPass, myFile });
        await newUser.save();

        res.json(newUser); // Return the newly created user
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Handle Login Route
app.post("/login", [
    body('email', 'Enter a valid Email Address').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Incorrect Username or Password" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Incorrect Username or Password" });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred");
    }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
