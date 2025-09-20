import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../data/post";
import SinglePost from "../components/SinglePost";


function Dettagli() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const data = await getSinglePost(id);
      setPost(data);
    }
    fetchPost();
  }, [id]);

  return post ? <SinglePost post={post} /> : <p>Loading...</p>;
}

export default Dettagli;

