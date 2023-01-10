import { getById,deleteByID } from "../api/data.js";
import { html,nothing } from "../lib.js";


const detailsTemplate = (post,isOwner,onDelete) => html `<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${post.imageUrl} alt="example1" />
  <p id="details-title">${post.title}</p>
  <p id="details-category">
    Category: <span id="categories">${post.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${post.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span
        >${post.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span
        >${post.requirements}</span
      >
    </div>
  </div>
  <!-- <p>Applications: <strong id="applications">1</strong></p> -->

  <!--Edit and Delete are only for creator-->
  ${isOwner 
    ? html `
  <div id="action-buttons">
    <a href="/edit/${post._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` 
    : html`
    <a href="" id="apply-btn">Apply</a>`}
  

    <!--Bonus - Only for logged-in users ( not authors )-->
    
  </div>
</div>
</section>`;


export async function showDetails(ctx){
    const id = ctx.params.id;
    const post = await getById(id);
    const isOwner = post._ownerId === ctx.user._id;
    ctx.render(detailsTemplate(post,isOwner,onDelete));

    async function onDelete(){
        const userConfirm = confirm("Are you sure you want to delete this?");
        if(!userConfirm){
            return
        }
        await deleteByID(id);
        ctx.page.redirect("/catalog")
    }
}