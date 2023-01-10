import { get, put, post, del } from "./api.js";

export async function getAll(){
    return get('/data/posts?sortBy=_createdOn%20desc');
}

export async function getById(id){
    return get('/data/posts/' + id)
}


export async function deleteByID(id){
    return del('/data/posts/' + id);
}

export async function createPost(postData){
        return post('/data/posts', postData)
}

export async function editPost(id, postData){
    return put('/data/posts/'+ id, postData)

}

export async function getMyPost(id){
    return get(`/data/posts?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}