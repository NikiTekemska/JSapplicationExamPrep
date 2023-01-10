import { html } from "../lib.js";
import { getAll } from '../api/data.js';


const catalogTemplate = (posts) => html `
<section id="dashboard">
          <h2>Job Offers</h2>
         ${posts.length == 0 ? html `<h2>No offers yet.</h2>` 
         : posts.map(cardTemplate)}
          </section>`;

const cardTemplate = (post) => html ` 
        <div class="offer">
        <img src="./images/example1.png" alt="example1" />
        <p>
          <strong>Title: </strong><span class="title">${post.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${post.salary}</span></p>
        <a class="details-btn" href="/catalog/${post._id}">Details</a>
      </div>`;

export async function showCatalog(ctx){
    const posts = await getAll();
    ctx.render(catalogTemplate(posts));

}