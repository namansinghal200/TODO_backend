import express from "express";
import { Login } from "../Controllers/User.js";
import User from "../models/User.js";
const Router = express.Router();

Router.post("/login", Login);
// Router.get("/searchUser/:id", async (req, res, next) => {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       return res.status(200).json({ user });
//     } catch (error) {
//       next(error);
//     }
//   });

Router.get("/searchUser", async (req, res, next) => {
    try {
      const userEmail = req.query.email;
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  });

export default Router;
