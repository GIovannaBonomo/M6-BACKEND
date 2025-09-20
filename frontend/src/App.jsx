import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Home from './Page/Home';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dettagli from './Page/Dettagli';
import AddPost from './Page/AddPost';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import GoogleLogin from './components/GoogleLogin';
import Authors from './Page/Authors';
import AuthorPost from './Page/AuthorPost';



function App() {

  const [searchTerm, setSearchTerm] = useState(""); // stato globale per ricerca
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token")); 
    // Controllo se c'è un token salvato all'avvio
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);


  return (
    <BrowserRouter>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLogged={isLogged} setIsLogged={setIsLogged}/>
      <Routes>
      <Route path="/" element={<Home searchTerm={searchTerm} />}/>
      <Route path="/posts/:id" element={<Dettagli/>}/>
      <Route path="/add-post" element={<AddPost/>}/>
      <Route path="/login" element={<Login setIsLogged={setIsLogged}></Login>}/>
      <Route path="/login/success" element={<GoogleLogin />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/authors" element={<Authors/>}/>
      <Route path="/authors/:id/posts" element={<AuthorPost />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
    )
}

export default App
