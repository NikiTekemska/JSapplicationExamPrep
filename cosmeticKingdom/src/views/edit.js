import { html } from '../lib.js';
import { getById, editProduct } from '../api/data.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (product, onEdit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                .value=${product.name}
              >
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                .value=${product.imageUrl}
              >
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                .value=${product.category}
              >
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${product.description}
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                .value=${product.price}
              >
              <button type="submit">post</button>
            </form>
          </div>
        </section>`;



export async function showEdit(ctx) {
    const id = ctx.params.id;
    const product = await getById(id);
    ctx.render(editTemplate(product,createSubmitHandler(onEdit)));

    async function onEdit({name,imageUrl,category,description,price}, form) {
        if ([name,imageUrl,category,description,price].some(e => e == '')) {
            return alert('All fields required!');
        }
        await editProduct(id,{name,imageUrl,category,description,price});
        form.reset();
        ctx.page.redirect('/catalog/'+id);
    }
}