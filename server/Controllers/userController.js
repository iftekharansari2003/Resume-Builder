import User from "../Modals/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from "../Modals/Resume.js";

const generateToken = (userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET, {expiresIn : '7d'})
    return token;
}

//Controller for user registration(Create Account)
// for req POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check if require fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        //check if user already exists
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'Email Already Registered' })
        }

        //create new user
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, email, password: hashPassword
        })

        //return success message with token and user details
        const token=generateToken(newUser._id)
        newUser.password="undefined";

        return res.status(201).json({message:"User Created Successfully",token, user:newUser})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}


//Controller for user Login
// for req POST: /api/users/login

export const loginUser=async(req,res)=>{
    try {
        const {email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email or Password' })
        }

        //Check if password is correct
        if(!user.comparePassword(password)){
            return res.status(400).json({message:"Invalid Email or Password"})
        }

        //return success message with token and user details
        const token=generateToken(user._id)
        user.password=undefined;

        return res.status(200).json({message:"Login Successfull",token, user})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
} 


//Controller for getting user by id
//GET : /api/user/data
export const getUserById=async(req,res)=>{
    try {
        const userId=req.userId;

        // check if user exists
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not Found"})
        }
        
        //return user
        user.password="undefined"

        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
} 



//Controller for getting user resumes
//GEt: /api/users/resumes

export const getUserResumes=async(req,res)=>{
    try {
        const userId=req.userId;
        
        //return user resumes
        const resumes=await Resume.find({userId})
        return res.status(200).json({resumes})

    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}