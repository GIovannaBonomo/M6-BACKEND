import mongoose from "mongoose";
import CommentSchema from "./Comment.js";
const { Schema } = mongoose;

const PostSchema = new Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String},
    descrizione: {type: String, required: true},
    readTime: { value: { type: Number, required: true }, unit: { type: String, required: true }},
    author: {type: Schema.Types.ObjectId, ref: "Author", required: true}, 
    //embedding dei commenti
    comments: { type:[CommentSchema], default: [] }
}, { timestamps: true}) //aggiunge createdAt e updatedAt

const Post = mongoose.model("Post", PostSchema);

export default Post;