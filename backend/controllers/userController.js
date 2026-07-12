import User from '../models/userModel.js';

// Named export သုံးထားတယ်
export const register = async (req, res) => {
    try {
        const { name, email, phone, age } = req.body;

        if (!name || !email || !phone || !age) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: 'User already exists.' });
        }

        const user = new User({ name, email, phone, age });
        await user.save();

        return res.status(201).json({ success: true, message: 'Account created successfully!', user });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const login = async (req, res) => {
    res.json({ message: "Login logic" });
};