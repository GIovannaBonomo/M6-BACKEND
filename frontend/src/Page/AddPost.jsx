import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { createPost } from "../../data/post";
import instance from "../../data/axios";




function AddPost() {
    const [post, setPost] = useState({
        title: "",
        category: "",
        readTime: { value: 1, unit: "min" }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "readTime") {
            setPost({
                ...post,
                readTime: { value: Number(value), unit: "min" },
            });
        } else {
            setPost({ ...post, [name]: value });
        }
    };

    const [cover, setCover] = useState();

    const addCover = (e) => {
        setCover(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //creo il post
            const result = await createPost(post);
            console.log(result);

            //faccio la patch per la cover
            const fData = new FormData();
            fData.append("cover", cover);

            const idPost = result._id;
            const resCover = await instance.patch(`/post/${idPost}/cover`, fData)
            console.log(resCover.data);

            alert("Post creato con successo!");

            // Pulizia form dopo la creazione
            setPost({
                title: "",
                category: "",
                readTime: { value: 1, unit: "min" }
            });
            setCover(null);
        } catch (error) {
            console.error(error);
            alert("Si è verificato un errore durante la creazione del post!");
        }
    };



    return (
        <Container>
            <h2>Nuovo Post</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Titolo</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={post.category}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>URL Cover</Form.Label>
                    <Form.Control
                        type="file"
                        name="cover"
                        onChange={addCover}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="descrizione"
                        value={post.descrizione}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Durata</Form.Label>
                    <Form.Control
                        type="number"
                        name="readTime"
                        value={post.readTime.value}
                        onChange={handleChange}
                        required
                        min={1}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Crea Post
                </Button>
            </Form>
        </Container>
    );
}

export default AddPost;
