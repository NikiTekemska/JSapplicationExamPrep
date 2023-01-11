import {logout} from '../api/user.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const nav = document.querySelector('header');


const navTemplate = (hasUser) => html `
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

<nav>
  <div>
    <a href="/catalog">Dashboard</a>
  </div>
    ${hasUser 
        ? html `
    <div class="user">
        <a href="/create">Add Album</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>` 
  : html `
    <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
  
</nav>`;
// <!-- html`<nav>
//     <section class="logo">
//         <img src="./images/logo.png" alt="logo">
//     </section>
//     <ul>
//         Users and Guest-->
//         <!-- <li><a href="/">Home</a></li>
//         <li><a href="/catalog">Dashboard</a></li>
//         ${!hasUser 
//             ? html`<li class="guest"><a href="/login">Login</a></li>
//         <li class="guest"><a href="/register">Register</a></li>` 
//             : html`<li class="user"><a href="/create">Create Postcard</a></li>
//         <li class="user"><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>`};
//     </ul>
// </nav>`; -->

export function updateNav(){

    const user = getUserData();
    render(navTemplate(user), nav);
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/catalog');
}