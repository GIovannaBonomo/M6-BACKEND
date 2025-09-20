import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    //riferimento all'autore del commento  
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
}, { timestamps: true}) //aggiunge createdAt e updatedAt

const Comment = mongoose.model("Comment", CommentSchema);

export default CommentSchema;