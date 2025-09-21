import { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import SinglePost from "../components/SinglePost";
import { getAllPost } from "../../data/post";
import NavBar from "../components/NavBar";
import instance from "../../data/axios";


function Home({ searchTerm }) {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
  async function fetchPosts() {
    try {
      const response = await instance.get("/post");
      console.log("Dati ricevuti dal backend:", response.data);
      setPosts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Errore nel fetch dei post", error);
      setPosts([]);
    }
  }
  fetchPosts();
}, []);


  const filteredPosts = Array.isArray(posts)
  ? posts.filter(post =>
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${post.author?.nome || ""} ${post.author?.cognome || ""}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


  return (
    <Container>
      <Row>
        {filteredPosts.map(post => (
          <Col key={post._id} className="mb-4" xs={12} md={4}>
            <SinglePost
              post={post}
              onDelete={(id) => setPosts(prev => prev.filter(p => p._id !== id))}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;

