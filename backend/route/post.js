import express from 'express';
import { addCover, createPost, deletePost, getAllPost, getSinglePost, putPost } from '../controllers/post.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js';
import { authVerify } from '../middlewares/authVerify.js';


const postRouter = express.Router();

postRouter.get('/',getAllPost);
postRouter.post('/',authVerify, createPost);
postRouter.get('/:id', getSinglePost);
postRouter.put('/:id',authVerify, putPost);
postRouter.patch('/:id/cover', uploadCloudinary.single('cover'), addCover);
postRouter.delete('/:id',authVerify , deletePost);

export default postRouter;
