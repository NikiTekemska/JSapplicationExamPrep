import { getUserData } from "../util.js";

const host = 'http://localhost:3030';

async function request(method, url, data) { // функция, която да управлява заявките
    const options = {
        method,
        headers: {}

    };

    if (data !== undefined) {   // проверяваме дали има данни, при get заявка няма body ако се прати get + body ще върне грешка
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch (host + url, options);

        if (response.status == 204) { // ok статус но без content 
            return response;

        }
        const result = await response.json();

        if (response.ok == false) {
            throw new Error(result.message);
        }

        return result;

    } catch (err) {
        alert(err.message);
        throw err; // предаваме грешката нататък за да може функциите които викат рикуеста да знаят, че има грешка
    }
}


export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');