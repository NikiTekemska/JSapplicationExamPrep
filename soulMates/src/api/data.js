import { get, put, post, del } from "./api.js";

export async function getAll(){
    return get('/data/shoes?sortBy=_createdOn%20desc');
}

export async function getById(id){
    return get('/data/shoes/' + id)
}


export async function deleteByID(id){
    return del('/data/shoes/' + id);
}

export async function createPair(pairData){
        return post('/data/shoes', pairData)
}

export async function editPair(id, pairData){
    return put('/data/shoes/'+ id, pairData)

}