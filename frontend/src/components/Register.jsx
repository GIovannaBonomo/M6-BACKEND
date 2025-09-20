import { useState } from "react";
import instance from "../../data/axios";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [dataDiNascita, setDataDiNascita] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      const fData = new FormData();
      fData.append("nome", nome);
      fData.append("cognome", cognome);
      fData.append("email", email);
      fData.append("dataDiNascita", dataDiNascita);
      fData.append("password", password);

      if (avatar) {
        fData.append("avatar", avatar);
      }
      instance.post("/auth/register", fData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Registrazione avvenuta con successo!");
      navigate("/login");
    }
    catch (err) {
      console.log(err);
      alert("Errore durante la registrazione.");
    }

  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleRegister}
        className="p-4 rounded shadow"
        style={{ maxWidth: '400px', width: '100%', backgroundColor: '#f8f9fa' }}
      >

        <h3 className="text-center mb-4">Registrazione</h3>

        <div>
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            placeholder="Inserisci il tuo nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="cognome" className="form-label">Cognome</label>
          <input
            type="text"
            id="cognome"
            className="form-control"
            placeholder="Inserisci il tuo cognome"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Inserisci la tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="dataDiNascita" className="form-label">Data di Nascita</label>
          <input
            type="date"
            id="dataDiNascita"
            className="form-control"
            placeholder="Inserisci la tua data di nascita"
            value={dataDiNascita}
            onChange={(e) => setDataDiNascita(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="avatar" className="form-label">Avatar</label>
          <input
            type="file"
            id="avatar"
            className="form-control"
            placeholder="Inserisci il tuo avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Inserisci la tua password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Registrati
        </button>

        <p className="text-center mt-3">
          Hai già un account? <a href="/login">Accedi</a>
        </p>
      </form>
    </div>

  );
}
export default Register