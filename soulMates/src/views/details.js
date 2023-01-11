import { html,nothing } from '../lib.js';
import { deleteByID, getById } from '../api/data.js';

const detailsTemplate = (pair, isOwner, onDelete) => html `
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Shoe Details</p>
  <div id="img-wrapper">
    <img src=${pair.imgUrl} alt="example1" />
  </div>
  <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${pair.brand}</span></p>
    <p>
      Model: <span id="details-model">${pair.model}</span>
    </p>
    <p>Release date: <span id="details-release">${pair.release}</span></p>
    <p>Designer: <span id="details-designer">${pair.designer}</span></p>
    <p>Value: <span id="details-value">${pair.value}</span></p>
  </div>

  <!--Edit and Delete are only for creator-->
  ${isOwner ? html `
  <div id="action-buttons">
    <a  href="/edit/${pair._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete}href="javascript.void(0)" id="delete-btn">Delete</a>
  </div>` : nothing }
  
</div>
</section>`;

export async function showDetails(ctx){
    const id = ctx.params.id;
    const pair = await getById(id);
    const isOwner = pair._ownerId === ctx.user._id;
    ctx.render(detailsTemplate(pair,isOwner, onDelete));

    async function onDelete() {
        const userConfirm = confirm("Are you sure you want to delete this?");
        if(!userConfirm){
            return
        }
        await deleteByID(id);
        ctx.page.redirect("/catalog");
    }
}

