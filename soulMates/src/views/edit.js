import { html } from '../lib.js';
import { getById, editPair } from '../api/data.js';
import { submitHandler } from '../util.js';


const editTemplate = (pair, onEdit) => html`
<section id="edit">
  <div class="form">
    <h2>Edit item</h2>
    <form @submit=${onEdit}class="edit-form">
      <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${pair.brand}>
      <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${pair.model}>
      <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${pair.imageUrl} >
      <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${pair.release}>
      <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${pair.designer}>
      <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${pair.value}>

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const pair = await getById(id);
  ctx.render(editTemplate(pair,submitHandler(onEdit)));

  async function onEdit({brand, model, imageUrl, release, designer, value}) {
    
      if([brand, model, imageUrl, release, designer, value].some(e => e == "")) {
          return alert('All fields required!');
      }
      await editPair(id,{brand, model, imageUrl, release, designer, value});
      //form.reset();
      ctx.page.redirect('/catalog'+id);
  
  }
}