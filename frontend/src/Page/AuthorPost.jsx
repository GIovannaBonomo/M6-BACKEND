import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import SinglePost from "../components/SinglePost";
import { getAllPost } from "../../data/post";

function AuthorPost() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPost() {
            try {
                const allPost = await getAllPost();
                const authorPost = allPost.filter(
                    (post) => post.author && post.author._id === id
                );
                setPosts(authorPost);
            }
            catch (error) {
                console.error("errore nel caricamento dei post", error);
            }
        };
        fetchPost();
    }, [id]);

    return(
        <Container>
      <h2 className="my-4">Post dell’autore</h2>
      <Row>
        {posts.map((post) => (
          <Col key={post._id} md={4} className="mb-4">
            <SinglePost post={post} />
          </Col>
        ))}
      </Row>
    </Container>
    )
}
export default AuthorPost



