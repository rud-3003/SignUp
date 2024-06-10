const express = require("express");
const router = express.Router();
const User = require("../models/User");
const cors = require("cors")
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
router.use(cors())

router.use(bodyParser.json({ limit: '10mb' })); // Adjust limit as needed
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/",cors(),(req,res)=>{

})

//Route 1
//Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post("/signup", [
    body('fname', 'Enter a valid Name').isLength({ min: 3 }),
    body('lname', 'Enter a valid Name').isLength({ min: 3 }),
    body('uname', 'Enter a valid Name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid Email Address').isEmail(),
], async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //Check whether user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "A User with this email already exists" });
        }
        else {

            // Create a new user
            const newUser = new User({ fname, lname, uname, email, password, myFile });
            await newUser.save();

            res.json(user)
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route 2 
// Authenticating a user using: POST "/api/auth/login" No Login required
// router.post("/login", [
//     body('email', 'Enter a valid Email Address').isEmail(),
//     body('password', 'Password cannot be blank').exists()
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: "Incorrect Username or Password" });
//         }

//         const passwordCompare = await bcrypt.compare(password, user.password);
//         if (!passwordCompare) {
//             return res.status(400).json({ error: "Incorrect Username or Password" });
//         }

//         const data = {
//             user: {
//                 id: user.id
//             }
//         }
//         const authToken = jwt.sign(data, JWT_SECRET);

//         // res.json(user)
//         res.json({ authToken: authToken });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error Occured");
//     }
// })

// Route 3
// Get logged in user details using POST "/api/auth/getuser" Login required
// router.get("/getuser", fetchuser, async (req, res) => {
//     try {
//         userId = req.user.id;
//         const user = await User.findById(userId).select("-password")
//         res.send(user)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error Occured");
//     }
// })
module.exports = router