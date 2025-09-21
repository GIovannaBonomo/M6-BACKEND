import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteById } from "../../data/author";

function SingleAuthor({ author, onDelete }) {

  const handleDeleteAuthor = async () => {
    const confirm = window.confirm("Sei sicuro di voler eliminare questo autore?");
    if (!confirm) return;
    try{
      await deleteById(author._id);
    if (onDelete) onDelete(author._id);
  }catch{
    
  }
    
  };

  if (!author) return <p>Caricamento autore...</p>;

  return (
    <Card className="m-5 h-80">
      <Card.Img variant="top" src={author.avatar} />
      <Card.Body>
        <Card.Title className="fw-bold fs-5 text-dark">
          {author.nome} {author.cognome}
        </Card.Title>
        <Card.Text>Email: {author.email}</Card.Text>
        <Card.Text>Data di nascita: {author.dataDiNascita}</Card.Text>
        <Link to={`/authors/${author._id}/posts`}>Vedi i post</Link>
      </Card.Body>
      <i
          className="bi bi-x-circle-fill text-danger fs-4"
          role="button"
          onClick={handleDeleteAuthor}
        />
    </Card>
  );
}

export default SingleAuthor;
