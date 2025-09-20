import mongoose from 'mongoose';
import Author from '../models/Author.js';

export async function getAll(request, response) {
    try {
        const authors = await Author.find();
        response.status(200).json(authors);
    }
    catch (error) {
        response.status(500).json({ message: "Errore nel recupero degli autori", error })
    }

}

export async function create(request, response) {

    try {
        const { nome, cognome, email, dataDiNascita, avatar, password } = request.body;
        const newAuthor = Author({
            nome, cognome, email, dataDiNascita, avatar, password
        })
        const authorSaved = await newAuthor.save();
        response.status(201).json(authorSaved)
    }
    catch (error) {
        response.status(500).json({ message: "Errore nel creare un autore", error })
    }
}

export async function getById(request, response) {
    try {
        const { id } = request.params;
        const author = await Author.findById(id);
        if (!author) {
            return response.status(404).json({ message: "Autore non trovato" })
        }
        response.status(200).json(author);
    }
    catch (error) {
        response.status(500).json({ message: "Errore nel recupero del singolo autore", error })
    }
}


export async function put(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ message: "ID autore non valido" });
        }

        const { nome, cognome, email, dataDiNascita, avatar } = request.body;

        const authorUpdated = await Author.findByIdAndUpdate(
            id,
            { nome, cognome, email, dataDiNascita, avatar },
            { new: true }
        );

        if (!authorUpdated) {
            return response.status(404).json({ message: "Autore non trovato" });
        }

        response.status(200).json(authorUpdated);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Errore nell'aggiornare l'autore", error: error.message });
    }
}

export async function addAvatar(request, response) {
    try {
        const filePath = request.file.path;
        const { id } = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ message: "ID avatar non valido" });
        }

        const author = await Author.findByIdAndUpdate(
            id, { avatar: filePath }, { new: true })
            if (!author) {
                return response.status(404).json({ message: "Avatar non trovato" });
            }
            response.status(200).json(author);
        
     } catch (error) {
        response.status(500).json({ message: "Errore nel caricare l'avatar", error });
    }   }

export async function deleteById(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ message: "ID autore non valido" });
        }
        response.status(200).json(await Author.findByIdAndDelete(id));
    } catch (error) {
        response.status(500).json({ message: "Errore nel cancellare l'autore", error })
    }
}
