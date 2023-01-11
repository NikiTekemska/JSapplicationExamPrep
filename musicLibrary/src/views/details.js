import { deleteByID, getById } from '../api/data.js';
import { html, nothing } from '../lib.js';

const detailsTemplate = (album, isOwner,onDelete) => html`
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src=${album.imgUrl} alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${album.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
  </div>
  

  ${isOwner 
    ? html`
      <div id="action-buttons">

        <a href="/edit/${album._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete}href="javascript:void(0)" id="delete-btn">Delete</a>
      </div>`
    : nothing}
  
</div>
</section>`;


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const album = await getById(id);
    const hasUser = Boolean(ctx.user);

    const isOwner = hasUser && album._ownerId === ctx.user._id;
    ctx.render(detailsTemplate(album, isOwner, onDelete));
    

    async function onDelete(){
        const userConfirm = confirm("Are you sure you want to delete this?");
        if(!userConfirm){
            return
        }
        await deleteByID(id);
        ctx.page.redirect("/catalog")
    }
}