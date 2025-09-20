import mongoose from 'mongoose';
import Post from '../models/Post.js';

export async function getAllComments(request, response) {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ message: "ID non valido" });
    }
    const post = await Post.findById(id);
    if (!post) {
        return response.status(404).json({ message: "Post non trovato" });
    }
    response.status(200).json(post.comments);
}

export async function createComment(request, response) {
    const { text } = request.body;
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ message: "ID non valido" });
    }
    const post = await Post.findById(id);
    if (!post) {
        return response.status(404).json({ message: "Post non trovato" });
    }
    post.comments.push({ text, author: request.author._id })
    await post.save();
    response.status(201).json(post.comments[post.comments.length - 1]);
}

export async function getSingleComment(request, response) {
    const { id, commentId } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(commentId)) {
        return response.status(400).json({ message: "ID non valido" });
    }
    const post = await Post.findById(id);
    if (!post) {
        return response.status(404).json({ message: "Post non trovato" });
    }
    const comment = post.comments.find(comment => comment._id.toString() === commentId);
    if (!comment) {
        return response.status(404).json({ message: "Commento non trovato" });
    }
}

export async function updateComment(request, response) {
    const { id, commentId } = request.params;
    const { text} = request.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(commentId)) {
        return response.status(400).json({ message: "ID non valido" });
    }
    if (!text) {
        return response.status(400).json({ message: "Dati mancanti" });
    }

    const post = await Post.findById(id);
    if (!post) {
        return response.status(404).json({ message: "Post non trovato" });
    }
    const comment = post.comments.find(comment => comment._id.toString() === commentId);
    if (!comment) {
        return response.status(404).json({ message: "Commento non trovato" });
    }
    comment.text = text;
    await post.save();
    response.status(200).json(comment);
}

export async function deleteComment(request, response) {
    const { id, commentId } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(commentId)) {
        return response.status(400).json({ message: "ID non valido" });
    }
    const post = await Post.findById(id);
    if (!post) {
        return response.status(404).json({ message: "Post non trovato" });
    }
    const comment = post.comments.find(comment => comment._id.toString() === commentId);
    if (!comment) {
        return response.status(404).json({ message: "Commento non trovato" });
    }
    post.comments = post.comments.filter (comment => comment._id.toString() !== commentId);
    await post.save();
    return response.status(200).json({ message: "Commento eliminato" });
}