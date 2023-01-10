import { html, nothing } from '../lib.js';
import { deleteByID, getById } from '../api/data.js';

const detailsTemplate = (post, isOwner, onDelete, hasUser) => html `
<section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src=${post.imageUrl} alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${post.title}</h2>
                        <p class="post-description">${post.description}</p>
                        <p class="post-address">${post.address}</p>
                        <p class="post-number">${post.phone}</p>
                        
                        
                        <div class="btns">
                            ${isOwner 
                            ? html `
                            <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                            <a @click=${onDelete}href="javascript:void(0)" class="delete-btn btn">Delete</a>`
                            : nothing }
                            
                        </div>

                    </div>
                </div>
            </div>
        </section>`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const post = await getById(id);
    const hasUser = Boolean(ctx.user);
    const isOwner = hasUser && post._ownerId === ctx.user._id;
    ctx.render(detailsTemplate(post, isOwner, onDelete, hasUser));
    

    async function onDelete(){
        const userConfirm = confirm("Are you sure you want to delete this?");
        if(!userConfirm){
            return
        }
        await deleteByID(id);
        ctx.page.redirect("/catalog")
    }
}