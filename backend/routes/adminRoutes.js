import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Settings from '../models/Settings.js';

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


// Get Messenger Page ID
AdminRouter.get('/settings', async (req, res) => { 
    try {
         let settings = await Settings.findOne(); 
         if (!settings) {
            settings = await Settings.create({ messengerPageId: '' });
         }
         res.status(200).json(settings); 
        } catch (err) {
             res.status(500).json({ error: err.message });
             }
             });
// Update Messenger Page ID
AdminRouter.put('/settings', async (req, res) => { 
    try {
         const { messengerPageId } = req.body;
          let settings = await Settings.findOne();
if (!settings) {
  settings = await Settings.create({ messengerPageId });
} else {
  settings.messengerPageId = messengerPageId;
  await settings.save();
}

res.status(200).json({ message: 'Messenger Page ID updated successfully', settings });
} catch (err) { 
    res.status(500).json({ error: err.message }); 
}
});

export default AdminRouter;