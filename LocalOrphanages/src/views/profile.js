import { html } from "../lib.js";
import { getMyPost } from "../api/data.js";

const profileTemplate = (myPosts)  => html `
<section id="my-posts-page">
            <h1 class="title">My Posts</h1>

            <!-- Display a div with information about every post (if any)-->
            <div class="my-posts">
            ${myPosts.length == 0 
            ? html `<h1 class="title no-posts-title">You have no posts yet!</h1>`
            : myPosts.map(profileCardTemplate)
            }    
        </section>`;

const profileCardTemplate = (myPost) => html `
<div class="post">
<h2 class="post-title">${myPost.title}</h2>
<img class="post-image" src=${myPost.imageUrl} alt="Material Image">
<div class="btn-wrapper">
    <a href="/details/${myPost._id}" class="details-btn btn">Details</a>
</div>
</div>`;

export async function showProfile(ctx) {
    const user = ctx.user._id;
    const posts = await getMyPost(user);
    ctx.render(profileTemplate(posts));
}