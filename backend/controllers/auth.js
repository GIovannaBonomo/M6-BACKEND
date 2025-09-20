import { signJwt } from "../helpers/jwt.js";
import Author from "../models/Author.js";


export async function register(req, res, next) {
  console.log("Body ricevuto:", req.body);

  try {
    const { nome, cognome, email, dataDiNascita, password } = req.body;
    console.log(req.file);

    // Evito duplicati
    const existing = await Author.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email già registrata" });
    }

    const newAuthor = new Author({
      nome,
      cognome,
      email,
      dataDiNascita,
      password,
      avatar: req.file ? req.file.path : null,
    });

    const token = await signJwt({ id: newAuthor._id });

    return res.status(201).json({
      message: "Registrazione completata",
      token,
      author: {
        id: newAuthor._id,
        nome: newAuthor.nome,
        cognome: newAuthor.cognome,
        email: newAuthor.email,
        dataDiNascita: newAuthor.dataDiNascita,
        avatar: newAuthor.avatar,
      },
    });
  } catch (err) {
    console.log(err, "errore nella registrazione");
    next(err);
  }
}



export async function login(req, res, next) {
  const { email, password } = req.body;
  const userEmail = await Author.findOne({ email })

  if (userEmail) {
    if (await userEmail.comparePassword(password)) {
      const jwt = await signJwt(
        {
          id: userEmail._id,
        })
      return res.status(200).json({ message: "token generato", jwt })
    }
  }
  return res.status(400).json({ message: "email o password errata" })
}