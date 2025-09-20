import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const AuthorSchema = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: {type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, "Email non valida"] },
    dataDiNascita: { type: String},
    avatar: { type:String },
    password:{type:String },
    googleId: { type: String  }
})

//criptare la password prima di salvare l'autore
AuthorSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }
    try{
        const salt= await bcrypt.genSalt(10) 
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(error){
        next(error)
    }
})

//metodo per confrontare la password inserita con quella salvata
AuthorSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

const Author = mongoose.model("Author", AuthorSchema);

export default Author;

