import express from 'express';
import { createComment, deleteComment, getAllComments, getSingleComment, updateComment } from '../controllers/comments.js';


const commentsRouter = express.Router();

commentsRouter.get('/:id/comments',getAllComments);
commentsRouter.post('/:id/comments', createComment);
commentsRouter.get('/:id/comments/:commentId', getSingleComment);
commentsRouter.put('/:id/comments/:commentId', updateComment);
commentsRouter.delete('/:id/comments/:commentId', deleteComment);


export default commentsRouter;

