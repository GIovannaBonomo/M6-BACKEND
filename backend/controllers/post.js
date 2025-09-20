import mongoose from 'mongoose';
import Post from '../models/Post.js';
import mailer from '../helpers/mailer.js';

export async function getAllPost(request, response) {
    try {
        const post = await Post.find().populate("author");
        response.status(200).json(post);
    }
    catch (error) {
        response.status(500).json({ message: "Errore nel recupero dei post", error})
    }

}

export async function createPost(request, response) {
    
    try {
    const {category, title, cover, descrizione,readTime} = request.body;
    const newPost = new Post({
        category, title, cover, readTime, descrizione, author: request.author._id
    })
    const postSaved= await newPost.save();

    // Recupera l'autore per inviare la mail
        const author = request.author;
        await mailer.sendMail({
            from: '"Strive Blog" <noreply@striveblog.com>',
            to: author.email,
            subject: 'Nuovo post creato!',
            text: `Ciao ${author.nome}, hai creato un nuovo post: "${title}"`,
            html: `<h1>Ciao ${author.nome}</h1><p>Hai creato un nuovo post: <strong>${title}</strong></p>`
        });

    response.status(201).json(postSaved)

    }
    catch (error){
        response.status(500).json({ message: "Errore nel creare un post", error})
    }
}

export async function getSinglePost(request, response){
    try {
        const {id} = request.params;
        const post = await Post.findById(id);
        if(!post){
           return response.status(404).json({message: "Post non trovato"})
        }
        response.status(200).json(post);
    }
    catch (error){
        response.status(500).json({ message: "Errore nel recupero del singolo post", error})
    }
}


export async function putPost(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ message: "ID post non valido" });
        }

        const {category, title, readTime, descrizione} = request.body;

        const postUpdated = await Post.findByIdAndUpdate(
            id,
            { category, title,descrizione, readTime},
            { new: true }
        );

        if (!postUpdated) {
            return response.status(404).json({ message: "Post non trovato" });
        }

        response.status(200).json(postUpdated);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Errore nell'aggiornare il post", error: error.message });
    }
}

export async function deletePost(request, response) {
    try {
        const {id} = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ message: "ID post non valido" });
        }
        response.status(200).json(await Post.findByIdAndDelete(id));
    } catch (error){
        response.status(500).json({ message: "Errore nel cancellare il post", error})
    }
}


export async function addCover(request, response) {
    try {
        const filePath = request.file.path;
        const { id } = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ message: "ID post non valido" });
        }

        const post = await Post.findByIdAndUpdate(
            id, { cover: filePath }, { new: true })
            if (!post) {
                return response.status(404).json({ message: "Post non trovato" });
            }
            response.status(200).json(post  
        );
        
     } catch (error) {
        response.status(500).json({ message: "Errore nel caricare la cover", error });
    }   }
