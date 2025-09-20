import instance from "./axios";

export async function getAll() {
    try {
        const response = await instance.get('/authors');
        return response.data;
    }  
    catch (error) {
        console.log(error);
    }
}

export async function getById(id) {
    try {
        const response = await instance.get('/authors/'+id);
        return response.data;
    }  
    catch (error) {
        console.log(error);
    }  
}
