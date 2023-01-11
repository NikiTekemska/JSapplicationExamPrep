import { deleteByID, getById } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { donate, getBought, getOwnProduct } from '../api/buying';


const detailsTemplate = (product, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${product.imageUrl} alt="example1" />
        <p id="details-title">${product.name}</p>
        <p id="details-category">
            Category: <span id="categories">${product.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${product.price}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">0</span> times.</h4>
                <span>${product.description}</span>
            </div>
        </div>

        ${isOwner ? html`
        <div id="action-buttons">
            <a href="/edit/${product._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete}href="javascript:void(0)" id="delete-btn">Delete</a>

        </div>` : nothing}

    </div>
</section>`;


function productFilter(product, hasUser, canBuy, isOwner, onDelete, onBuy) {
    if (hasUser === false) {
        return nothing;
    }
    if (canBuy) {
        return html`
        <div class="actionBtn">
        <a @click=${onBuy} href="javascript:void(0)" id="buy-btn">Buy</a>
        </div>`;
    }
    if (isOwner) {
        return html`
        <div id="action-buttons">
            <a href="/edit/${product._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete}href="javascript:void(0)" id="delete-btn">Delete</a>

        </div>` 
    }
}


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const hasUser = Boolean(ctx.user);
    const request = [
        getById(id),
        getBought(id),
    ]
    const [product, donation, hasBought] = await Promise.all(request)
    const isOwner = hasUser && product._ownerId === ctx.user._id;
    const canBuy = !isOwner && hasBought == 0;
    ctx.render(detailsTemplate(product, isOwner, onDelete, canBuy));


    async function onDelete() {
        const userConfirm = confirm("Are you sure you want to delete this?");
        if (!userConfirm) {
            return
        }
        await deleteByID(id);
        ctx.page.redirect("/catalog")
    }

}
