import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function SingleAuthor({ author }) {
  if (!author) return <p>Caricamento autore...</p>;

  return (
    <Card className="m-5" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={author.avatar} />
      <Card.Body>
        <Card.Title>
          {author.nome} {author.cognome}
        </Card.Title>
        <Card.Text>{author.email}</Card.Text>
        <Card.Text>{author.dataDiNascita}</Card.Text>
        <Link to={`/authors/${author._id}/posts`}>Vedi i post</Link>
      </Card.Body>
    </Card>
  );
}

export default SingleAuthor;
