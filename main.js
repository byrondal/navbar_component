import './style.css'
import { DOCUMENTATION } from './constants';


const toggleButton = document.querySelector('#menu-toggle');

const menuContentElement = document.querySelector('#menu-content');

const inputSearch = document.querySelector('.search');

const favoritesListElement = document.querySelector('#menu-content > .favorites');

const searchBlockElement = document.querySelector('#menu-content > .search');

const getFavoriteTemplate = (title, url) => {
  return `
    <li class="favorite-element">
      <a href="${url}" target="__blank">${title}</a>
    </li>
    `;
};

const setupFavoritesList = () => {
  const favorites = DOCUMENTATION.filter(doc => doc.favorite);
  const favoritesUl = document.createElement('ul');

  favorites.forEach(favorite => {
    const favoriteTemplate = getFavoriteTemplate(favorite.title, favorite.url);
    favoritesUl.innerHTML += favoriteTemplate;
  });

  favoritesListElement.append(favoritesUl);
};


const normalizeText = (text) => text.trim().toLowerCase();

const handleSearch = (event) => {
  const { value } = event.target;
  const normalizedValue = normalizeText(value);

  const filteredDocumentacion = DOCUMENTATION.filter(doc => {
    const normalizedTitle = normalizeText(doc.title)
    return normalizedTitle.includes(normalizedValue)
  });

  const searchUl = document.createElement('ul');
  searchUl.id = 'search-ul';

  filteredDocumentacion.forEach(doc => {
    const searhTemplate = getFavoriteTemplate(doc.title, doc.url);
    searchUl.innerHTML += searhTemplate;
  });

  const previousUl = document.querySelector('#search-ul');
  if (previousUl) {
    previousUl.remove();
  }


  searchBlockElement.append(searchUl);

};

const toggleOpenMenu = () => {
  menuContentElement.classList.toggle('menu-content--open');
};

toggleButton.addEventListener('click', toggleOpenMenu)
inputSearch.addEventListener('input', handleSearch);

setupFavoritesList();