export async function  donate(productId) {
    return post('/data/bought', {
        productId
    });
}

export async function getBought (productId){
    return get(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`)
}

export async function getOwnProduct(productId, userId){
    return get(`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}