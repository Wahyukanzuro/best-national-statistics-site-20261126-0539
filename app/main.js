// main.js — the router: reads the hash, renders the matching page.
// No framework, no fetch, no network. The whole site is local files; the
// router only swaps which view's HTML sits inside <main> and marks the
// matching link in the section nav.

import { ROUTES } from './views.js';
import { SECTIONS } from './data.js';

const app = document.getElementById('app');
const nav = document.getElementById('section-nav');

function link(route, title) {
  return `<a href="${route}" data-route="${route}">${title}</a>`;
}

nav.innerHTML = link('#/', 'Home')
  + SECTIONS.map((s) => link(`#/${s.slug}`, s.title)).join('')
  + link('#/sources', 'Sources');

function pathFromHash() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1) || '/';
  return Object.prototype.hasOwnProperty.call(ROUTES, path) ? path : '/';
}

function renderPage() {
  const path = pathFromHash();
  const page = ROUTES[path];
  document.title = page.title;
  app.innerHTML = page.render();
  nav.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('data-route') === `#${path}`);
  });
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', renderPage);
renderPage();
