import express from "express";
import bcrypt from "bcrypt";
import { login, register } from "../controllers/auth.js";
import passport from "passport";
import Author from "../models/Author.js";
import multer from "multer";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const authRouter = express.Router();

authRouter.post("/register", uploadCloudinary.single("avatar"), async (req, res) => {
  try {
    const { nome, cognome, email, dataDiNascita, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Campi mancanti" });

    const existingAuthor = await Author.findOne({ email });
    if (existingAuthor) return res.status(400).json({ message: "Email già in uso" });

 

    const newAuthor = await Author.create({
      nome,
      cognome,
      email,
      dataDiNascita,
      avatar: req.file ? req.file.path : undefined,
      password,
    });

    return res.status(201).json({ message: "Registrazione completata", author: newAuthor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Errore interno del server" });
  }
});

authRouter.post("/login", login)

authRouter.get('/login-google', passport.authenticate('google', {scope: ['profile', 'email']}));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_HOST}/login/success?jwt=${req.user.jwt}`);
  }
);

export default authRouter;

