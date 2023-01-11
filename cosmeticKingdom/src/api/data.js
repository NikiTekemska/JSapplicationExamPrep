import { del, get, post, put } from './api.js';

export async function getAll(){
    return get('/data/products?sortBy=_createdOn%20desc');
}

export async function getById(id){
    return get('/data/products/' + id)
}


export async function deleteByID(id){
    return del('/data/products/' + id);
}

export async function createProduct(productData){
        return post('/data/products', productData)
}

export async function editProduct(id, productData){
    return put('/data/products/'+ id, productData)

}