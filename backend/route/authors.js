import express, { response } from 'express';
import { addAvatar, create, deleteById, getAll, getById, put } from '../controllers/authors.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js';
import passport from 'passport';
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const authorsRouter = express.Router();
authorsRouter.get('/',getAll);
authorsRouter.post('/', create);
authorsRouter.get('/:id', getById);
authorsRouter.put('/:id', put);
authorsRouter.patch('/:id/avatar', uploadCloudinary.single('avatar'), addAvatar);
authorsRouter.delete('/:id', deleteById);
authorsRouter.get('/login-google', passport.authenticate('google', {scope: ['profile', 'email']}));
authorsRouter.get('/google/callback', passport.authenticate('google', {session: false}), (req, res) => {
   res.redirect(`${process.env.FRONTEND_HOST}/login/success?jwt=${req.user.jwt}`);
  
    
});

export default authorsRouter;


