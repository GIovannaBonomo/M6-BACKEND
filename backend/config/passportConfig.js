import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { signJwt } from "../helpers/jwt.js";
import Author from "../models/Author.js";

const strategyGoogle = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK_PATH}`
  },
  // callback che si attiva quando Google ci passa i dati del profilo
  async function (accessToken, refreshToken, profile, cb) { 
    
    try {
      // cerco l'autore 
      let author = await Author.findOne({ googleId: profile.id });
      // se l'autore non esiste, lo creo
      if (!author) {
        author = await Author.create({
          nome: profile._json.given_name,
          cognome: profile._json.family_name,
          email: profile._json.email,
          avatar: profile._json.picture,
          googleId: profile.id
        });
      }

      // genera JWT
      const jwt = await signJwt({ id: author._id });

      // Passport salva questo oggetto in req.user
      cb(null, { jwt });
      

    } catch (error) {
      cb(error, null);
    }
  }
);

export default strategyGoogle;