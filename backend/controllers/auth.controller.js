import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({error:"Passwords don't Match"});
        }

        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({error:"Username already Exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const boyProPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePicture: gender === 'male' ? boyProPic : girlProPic
        });

        if (newUser) {

            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePicture: newUser.profilePicture,
                createdAt: newUser.createdAt
            });
        } else {
            res.status(400).json({error: 'Invalid User Data'});
        }

    } catch (error) {
        console.log(`Error in SignUp Controller : => ${error.message}`);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const login = async  (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid Credentials"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture
        });

    } catch (error) {
        console.log(`Error in Login Controller : => ${error.message}`);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge:0});
        res.status(200).json({message: 'Logged out Successfully'});
    } catch (error) {
        console.log(`Error in Logout Controller : => ${error.message}`);
        res.status(500).json({error:"Internal Server Error"});
    }
};