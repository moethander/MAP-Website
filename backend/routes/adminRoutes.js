import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const AdminRouter = express.Router();

//admin login 
AdminRouter.post('/login', async(req,res)=>{
    const {email,password} = req.body;

    try{
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({message: 'Email or Password wrong!'});
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json({message: 'Email or Password wrong!'});
        }
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET || 'SECRET_KEY_123',
            {expiresIn: '1d'}
        );

        res.json({token, message: 'Login Success!'});

    }catch(error){
        console.error('Login Error:', error);
        res.status(500).json({message: 'Login Failed!'});
    }
});

export default AdminRouter;