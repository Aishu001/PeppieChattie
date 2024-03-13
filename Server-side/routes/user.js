import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { checkIfEmailExist , generateToken } from '../controller/user.js';
import { searchUser } from '../controller/searchUser.js';

const router = express.Router()

router.post('/signup', async (req, res) => {
    try {
        
        const {password }  = req.body
        // Check if a user with the same email exists
        const checkUserExist = await checkIfEmailExist(req);
        if (checkUserExist) {
            return res.status(409).send('Email already exists');
        }
        if (password !== req.body.confirmPassword) {
            return res.status(409).send('Incorrect password');
        }

        const profilePictureboy = `https://avatar.iran.liara.run/public/boy?username=${req.body.gender}`
        const profilePictureGirl = `https://avatar.iran.liara.run/public/boy?username=${req.body.gender}`
        // Hash the password
const hashedPassword = await bcrypt.hash(req.body.password, 10);

// Create a new user
const newUser = new User({
    ...req.body,
    password: hashedPassword,
    profileImageUrl : req.body.gender = 'male' ? profilePictureboy : profilePictureGirl
});

// Save the user to the database
await newUser.save();

        // Generate a token
        const token = generateToken(newUser._id , res);
        res.status(201).json({
            message: 'User registered successfully',
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in code');
    }
});


// LOGIN
router.post('/login', async (req, res) => {
    try {
        // check if the user exists
        const isUser = await checkIfEmailExist(req);

        if (!isUser) {
            return res.status(403).send('Invalid User!');
        }

        // Log the isUser object to inspect its structure
        console.log('isUser:', isUser);

        // verify the password
        const { password } = req.body;

        if (!password) {
            return res.status(400).send('Password is required');
        }

        // Log the password to verify its presence
        console.log('Password:', password);

        //  bcrypt.compare() is used to compare the given password and stored password
        const passwordMatch = await bcrypt.compare(password, isUser.password);


        if (!passwordMatch) {
            return res.status(403).send('Invalid Password');
        }

        // generate the token
        const token = generateToken(isUser._id ,res);

        res.status(200).json({ message: "Successfully Logged In", token: token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in code');
    }
});

// search user 
router.route('/search').get(searchUser)

export const userRouter = router;