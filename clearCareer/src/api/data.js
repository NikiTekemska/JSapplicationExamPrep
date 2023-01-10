import { del, get, post, put } from './api.js';

export async function getAll(){
    return get('/data/offers?sortBy=_createdOn%20desc');
}

export async function getById(id){
    return get('/data/offers/' + id)
}


export async function deleteByID(id){
    return del('/data/offers/' + id);
}

export async function createPost(postData){
        return post('/data/offers', postData)
}

export async function editPost(id, postData){
    return put('/data/offers/'+ id, postData)

}