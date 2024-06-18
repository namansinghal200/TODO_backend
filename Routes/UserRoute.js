// // routes/userRoutes.js

// import express from 'express';
// const router = express.Router();
// import  User from '../models/User.js' // Assuming you have a User model

// // Route to search for a user based on email
// router.get('/searchUser', async (req, res) => {
//   const { email } = req.query;

//   try {
//     // Search for the user in the database by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Return the user ID if found
//     res.status(200).json({ userId: user._id });
//   } catch (error) {
//     console.error('Error searching user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// export default router;
