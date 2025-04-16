import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const Login = async (req, res) => {
<<<<<<< HEAD
    const { userName, email, password } = req.body;

    try {


=======
    console.log('Login data', req.body)
    try {
        const { userName, email, password } = req.body;
>>>>>>> ea8f39e (fixed some bugs)
        if (!userName && !email || !password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false
            })
        }

        const user = await User.findOne({ $or: [{ email: email }, { userName: userName }] });
        console.log('find user', user)

        //user not find
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            })
        }
        const isMatch = await user.comparePassword({password});

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const payload = { user: { id: user._id, role: user.role } };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '40h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    },
                    token
                });
            }
        );

<<<<<<< HEAD
=======
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        return res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict'
            })
            .json({
                success: true,
                message: "Login successful",
                token,
                user 
            });
>>>>>>> ea8f39e (fixed some bugs)

    } catch (error) {
        console.log(`Invalid login: ${error}`)
        return res.status(500).json({
            message: "Login failed",
            success: false
        })
    }
}

export const Register = async (req, res) => {
    const { fullName, userName, email, password } = req.body;

    try {


        if (!fullName || !email || !userName || !password) {

            return res.status(401).json({
                message: "Invalid data",
                success: false
            })

        }
        const user = await User.findOne({ userName, email });

        // const existedUser = await User.findOne({
        //     $or: [{ username }, { email }]
        // })

        if (user) {
            return res.status(401).json({
                message: "This email is already used",
                success: false
            })
        }

        console.log(req.files);
        const avatarLocalPath = req.files?.avatar[0]?.path;
        //const coverImageLocalPath = req.files?.coverImage[0]?.path;

        let coverImageLocalPath;
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
            coverImageLocalPath = req.files.coverImage[0].path
        }


        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            fullName,
            userName,
            avatar: avatar?.url,
            coverImage: coverImage?.url || "",
            email,
            password: hashedPassword,
        })
        await newUser.save();
        // return res.status(201).json({
        //     message: "Account created successfully",
        //     success: true,
        //     newUser
        // })
        console.log("newUser", newUser)
        const payload = { user: { id: newUser._id, } };

        //sign and return the token along with user data 
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '40h' },
            (err, token) => {
                if (err) throw err;

                //send token in response
                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                });
            }
        );
    } catch (error) {
        console.log(`Account not created: ${error}`)
        return res.status(401).json({
            message: "Account not created",
            success: false,
        })
    }
};


export const getAllUser = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        return res.status(200).json(otherUsers)

    } catch (error) {
        console.log(`User not fetched: ${error}`)
    }

}

export const logOut = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully",
            success: true
        })
    } catch (error) {
        console.log(`Logout failed: ${error}`)
    }
}  
