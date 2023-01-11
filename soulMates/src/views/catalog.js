import {html} from '../lib.js';
import { getAll } from '../api/data.js';
import { showDetails } from './details.js';

const catalogTemplate = (shoes, hasUser) => html `
<section id="dashboard">
<h2>Collectibles</h2>
${shoes.length == 0 ? html `
<h2>There are no items added yet.</h2>` 
: shoes.map(pair => cardTemplate(pair,hasUser))}
</section>`;

const cardTemplate = (pair) => html `
<ul class="card-wrapper">
  <!-- Display a li with information about every post (if any)-->
  <li class="card">
    <img src=${pair.imageUrl} alt="travis" />
    <p>
      <strong>Brand: </strong><span class="brand">${pair.brand}</span>
    </p>
    <p>
      <strong>Model: </strong
      ><span class="model">${pair.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${pair.value}</span>$</p>
    <a class="details-btn" href="/details/${pair._id}">Details</a>
  </li>
</ul>`;

export async function showCatalog(ctx){
    const shoes = await getAll();
    ctx.render(catalogTemplate(shoes, !!ctx.user))
}