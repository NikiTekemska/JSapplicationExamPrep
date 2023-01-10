import { createSubmitHandler } from "../util.js";
import { html } from "../lib.js";
import { getById, editPost } from '../api/data.js';



const editTemplate = (post, onEdit) => html `
<section id="edit">
<div class="form">
  <h2>Edit Offer</h2>
  <form @submit=${onEdit}class="edit-form">
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
      .value=${post.title}
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
      .value=${post.imageUrl}
      
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
      .value=${post.category}
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
      .value=${post.description}
    ></textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
      .value=${post.requirements}
    ></textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
      .value=${post.salary}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`

export async function showEdit(ctx){
    const id = ctx.params.id;
    const post = await getById(id);
    ctx.render(editTemplate(post,createSubmitHandler(onEdit)));

    async function onEdit({title,imageUrl, category, description, requirements, salary}, form ){
        if ([title,imageUrl, category, description, requirements, salary].some(e => e =="")){
            return alert('All fields required!');
        }
        await editPost(id,{title, imageUrl,category, description, requirements, salary});
        form.reset();
        ctx.page.redirect('/catalog/'+id);
    }
}