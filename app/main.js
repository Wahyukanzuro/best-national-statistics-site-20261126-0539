// main.js — the router: reads the hash, renders the matching page.
// No framework, no fetch, no network: the whole site is local files and
// the router only swaps which view's HTML sits inside <main>.

import { ROUTES } from './views.js';
import { SECTIONS } from './data.js';

const app = document.getElementById('app');
const nav = document.getElementById('section-nav');

function navLink(route, title) {
  return `<a href="${route}" data-route="${route}">${title}</a>`;
}

nav.innerHTML = navLink('#/', 'Home')
  + SECTIONS.map((s) => navLink(s.route, s.title)).join('')
  + navLink('#/sources', 'Sources');

function currentRoute() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1) || '/';
  return ROUTES[path] ? path : '/';
}

function render() {
  const path = currentRoute();
  const page = ROUTES[path];
  document.title = page.title;
  app.innerHTML = page.render();
  nav.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('data-route') === `#${path}`);
  });
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
