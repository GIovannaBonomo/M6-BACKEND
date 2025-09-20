import { useState } from "react";
import instance from "../../data/axios";
import { useNavigate } from "react-router-dom";


function Login({ setIsLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const googleLogin = () => {
  window.location.href = import.meta.env.VITE_API_URL + import.meta.env.VITE_GOOGLE_PATH;
 
}

  const handleLogin = async (e) => {
    e.preventDefault(); // previene il refresh della pagina
    try {
      const response = await instance.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.jwt); // salva il JWT
      setIsLogged(true); // aggiorna lo stato di login
      navigate("/");// reindirizza alla home
      alert("Login effettuato con successo!");
      navigate("/");
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert("Email o password errata!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleLogin}
        className="p-4 rounded shadow"
        style={{ maxWidth: '400px', width: '100%', backgroundColor: '#f8f9fa' }}
      >

       <button
          type="button"   
          onClick={googleLogin}
          className="btn btn-danger w-100 mb-3"
        >
          Accedi con Google
        </button>

        <h3 className="text-center mb-4">Accedi</h3>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
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
          Login
        </button>

        <p className="text-center mt-3">
          Non hai un account? <a href="/register">Registrati</a>
        </p>
      </form>
    </div>

  );
}

export default Login;
