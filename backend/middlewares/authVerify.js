import { verifyJwt } from "../helpers/jwt.js";
import Author from "../models/Author.js";

//middleware per proteggere le rotte
export async function authVerify(req, res, next){
    const headerAuth= req.headers.authorization || " ";
    const token= headerAuth.replace("Bearer ", "")
    if(!token){
        res.status(401).json({ message: "token mancante"})
    } 
    try{
        const payload= verifyJwt(token)
        const author= await Author.findById(payload.id)
        if(!author) return res.status(401).json({message: "autore non trovato"})
            req.author= author
        next()
    } catch(error){
        res.status(401).json({message: "token scaduto o non valido"})
    }
}