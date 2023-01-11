import { html } from '../lib.js';
import { getAll } from '../api/data.js';


const catalogTemplate = (products) => html `
<h2>Products</h2>
        ${products.length == 0 
        ? html `<h2>No products yet.</h2>`
        : products.map(cardTemplate)}
        </section> `;

const cardTemplate = (product) => html `
<section id="dashboard">
          <div class="product">
            <img src=${product.imageUrl} alt="example1" />
            <p class="title">${product.name}</p>
            <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
            <a class="details-btn" href="/catalog/${product._id}">Details</a>
          </div>`;


export async function showCatalog(ctx) {
    const products = await getAll();
    ctx.render(catalogTemplate(products));
}