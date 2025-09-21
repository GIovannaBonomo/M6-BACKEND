import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Form, Badge } from "react-bootstrap";
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
    <Card className="m-3 shadow-sm rounded-3 h-100">
      <Card.Img variant="top" src={post.cover} />
      <Card.Body>
        <Card.Title className="fw-bold fs-5 text-dark">{post.title}</Card.Title>
        <Badge bg="dark" className="mb-2">{post.category}</Badge>
        <Card.Text className="text-muted small">{post.descrizione}</Card.Text>
        <div className="d-flex justify-content-between text-muted small">
          <span>By: {post.author.nome} {post.author.cognome}</span>
          <span>{post.readTime.value} {post.readTime.unit}</span>
        </div>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center bg-white border-0">
        <Button as={Link} to={`/posts/${post._id}`} variant="outline-dark" size="sm">
          Vai al post
        </Button>
        <i
          className="bi bi-x-circle-fill text-danger fs-4"
          role="button"
          onClick={handleDeletePost}
        />
      </Card.Footer>
        <Card.Body>
        <h6 className="fw-bold">Commenti</h6>
        <ListGroup variant="flush" className="mb-2">
          {comments.map(c => (
            <ListGroup.Item 
              key={c._id} 
              className="d-flex justify-content-between align-items-center"
            >
              <span>{c.text}</span>
              <i
          className="bi bi-x-circle-fill text-danger fs-4"
          role="button"
          onClick={() => handleDeleteComment(c._id)}
        />
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="d-flex">
          <Form.Control
            type="text"
            value={newComment}
            placeholder="Scrivi un commento..."
            onChange={(e) => setNewComment(e.target.value)}
            className="me-2 rounded-pill"
          />
          <Button onClick={handleAddComment} size="sm" variant="dark" className="rounded-pill">
            Invia
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SinglePost;
