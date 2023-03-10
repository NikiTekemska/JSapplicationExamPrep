import {page, render} from './lib.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
// import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';
import { getUserData } from './util.js';
import { showEdit } from './views/edit.js';
import { showProfile } from './views/profile.js';

const main = document.getElementById('main-content');

page(decorateContext);
page('/', showCatalog);
page('/catalog', showCatalog);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);
page('/myposts', showProfile);

updateNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if(user) {
        ctx.user = user;
    }

    next();
}

function renderMain(content){
    render(content, main);
}