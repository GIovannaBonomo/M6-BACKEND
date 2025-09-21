import { Col, Container, Row } from "react-bootstrap";
import SingleAuthor from "../components/SingleAuthor";
import { useEffect, useState } from "react";
import instance from "../../data/axios";

function Authors() {
    const [authors, setAuthors] = useState([])
    useEffect(() => {
        async function fetchAuthors() {
            try {
                const response = await instance.get("/authors");
                console.log("Dati ricevuti dal backend:", response.data);
                setAuthors(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Errore nel fetch degli autori", error);
                setAuthors([]);
            }   
        }
        fetchAuthors();
    }, []);
        const author = authors[0];

    return ( 
        <Container>
        <Row>
            {authors.map(author => (
            <Col key={author._id} className="mb-4" xs={12} md={4}>
                <SingleAuthor
                author={author}
                onDelete={(id)=> setAuthors(prev => prev.filter(p => p._id !== id))}
                />
            </Col>
            ))}
        </Row>
        </Container>
     );
}
export default Authors;