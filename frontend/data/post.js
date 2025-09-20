import instance from "./axios";



export async function getAllPost() {
    try {
        const response = await instance.get('/post');

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getSinglePost(id) {
    try {
        const response = await instance.get('/post/'+id);

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export async function createPost(post) {
    try {
        const response = await instance.post('/post', post);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }   }

    export async function deletePost(id) {
  try {
    const response = await instance.delete(`/post/${id}`);
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}
