import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deletePost } from "../../data/post";
import { createComment, deleteComment, getAllComments } from "../../data/comment";


function SinglePost({ post, onDelete }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchComments() {
      if (!post?._id) return;
      const data = await getAllComments(post._id);
      setComments(data);
    }
    fetchComments();
  }, [post]);

  const handleAddComment = async () => {
    if (!newComment) return;
    const comment = await createComment(post._id, newComment);
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(post._id, commentId);
    setComments(comments.filter(c => c._id !== commentId));
  };

  const handleDeletePost = async () => {
    const confirm = window.confirm("Sei sicuro di voler eliminare questo post?");
    if (!confirm) return;

    await deletePost(post._id);
    if (onDelete) onDelete(post._id);
  };

  if (!post) return null;

  return (
    <Card className="m-5" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={post.cover} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{post.category}</ListGroup.Item>
        <ListGroup.Item>Descrizione: {post.descrizione}</ListGroup.Item>
        <ListGroup.Item>By: {post.author.nome} {post.author.cognome}</ListGroup.Item>
        <ListGroup.Item>{post.readTime.value}{post.readTime.unit}</ListGroup.Item>
      </ListGroup>
      <Card.Body className="d-flex justify-content-between align-items-center">
        <Card.Link as={Link} to={`/posts/${post._id}`}>Link</Card.Link>
        <Button variant="danger" onClick={handleDeletePost}>x</Button>
      </Card.Body>
      <Card.Body>
        <h5>Commenti</h5>
        {comments.map(c => (
          <div key={c._id} className="d-flex justify-content-between align-items-center mb-2">
            <span>{c.text}</span>
            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(c._id)}>x</Button>
          </div>
        ))}
        <Form.Control
          type="text"
          value={newComment}
          placeholder="Scrivi un commento..."
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleAddComment}>Invia</Button>
      </Card.Body>
    </Card>
  );
}

export default SinglePost;
