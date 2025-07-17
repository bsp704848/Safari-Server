import { Router } from 'express';
const router = Router();
import User from '../Models/User.js';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getAuth } from '../firebaseAdmin.js';

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email },
        'your_jwt_secret',
        { expiresIn: '1d' }
      );
      res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}); 
  
router.post("/social-login", async (req, res) => {
  try {
    const { idToken, provider } = req.body;

    const decoded = await getAuth().verifyIdToken(idToken);
    console.log("Decoded Token:", decoded);

    const email = decoded.email;
    const name = decoded.name;
    const photo = decoded.picture;
    const firebaseUid = decoded.uid;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        username: name,
        profilePic: photo,
        provider,
        firebaseUid,
      });
      await user.save();
    }

         const token = jwt.sign(
        { id: user._id, email: user.email },
        'your_jwt_secret',
        { expiresIn: '1d' }
      );

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Social login failed" });
  }
});


export default router;
