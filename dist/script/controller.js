import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import * as model from './model';
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
import * as Config from './config';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';
import addRecipeView from './views/addRecipeView';
let fullViewRecipeContainer = document.querySelector('#full__view__recipe');

const controlInitialState = async function () {
  try {
    const sideCardBtn = document.querySelectorAll('.cat__card');
    const sideEle = Array('pizza', 'ice creame', 'burger', 'curry');
    for (let i = 0; i < sideCardBtn.length; i++) {
      sideCardBtn[i].addEventListener('click', async function () {
        //Loader
        resultsView.renderSpinner();
        //Load Recipe
        await model.loadSearchResults(sideEle[i]);
        //Render Recipe
        resultsView.render(model.searchResultPage());
        //4) Render initial Pagination
        paginationView.render(model.state.search);
        let curActive = document.getElementsByClassName('card_active');
        curActive[0].className = curActive[0].className.replace(
          ' card_active',
          ' '
        );
        this.className += ' card_active';
      });
    }
  } catch (err) {
    console.log(err);
  }
  //Loader
  resultsView.renderSpinner();
  //Load Recipe
  await model.loadSearchResults('pizza');
  //Render Recipe
  resultsView.render(model.searchResultPage());
  //Render initial Pagination
  paginationView.render(model.state.search);
};

const controlFullRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //1. Loading Recipe
    await model.loadFullRecipe(id);

    //2. render recipe
    recipeView.render(model.state.recipe);

    // //3. TEST
    // controlServings();
  } catch (err) {
    recipeView.renderError(`Recipe not found. Please try another one!`);
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);
    //3) Render results
    // console.log(model.searchResultPage());
    resultsView.render(model.searchResultPage());
    //4) Render initial Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1) Render results
  resultsView.render(model.searchResultPage(goToPage));
  //2) Render initial Pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.render(model.state.recipe);
  // recipeView.update(model.state.recipe);
};

const controlToggle = function () {
  const toggleActiveBtn = document.querySelector('.list__img__bookmark');
  const toggleDeactivateBtn = document.querySelector('.toggle__close');
  const toggleBar = document.querySelector('#toggle__bar');
  const overlay = document.querySelector('.full__overflow');

  toggleActiveBtn.addEventListener('click', function () {
    toggleBar.style.width = '360px';
    document.body.style.position = 'fixed';
    overlay.style.display = 'block';
  });
  toggleDeactivateBtn.addEventListener('click', function () {
    toggleBar.style.width = '0px';
    document.body.style.position = '';
    overlay.style.display = 'none';
  });
  overlay.addEventListener('click', function () {
    toggleBar.style.width = '0px';
    document.body.style.position = '';
    overlay.style.display = 'none';
  });
};

const controlAddBookmark = function () {
  // Add/Remove Bookmark
  if (!model.state.recipe.bookmark) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // Update Recipe View
  recipeView.render(model.state.recipe);
  // Display Bookmarks
  bookmarkView.render(model.state.bookmark);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlAddRecipe = function () {
  const formContainer = document.querySelector('.add__recipe__form')
    .parentElement;
  const recipeAddBtn = document.querySelector('.list__img');

  recipeAddBtn.addEventListener('click', function () {
    formContainer.style.display = 'flex';
  });

  formContainer.addEventListener('click', function (e) {
    if (e.target !== this) {
      return;
    }
    formContainer.style.display = 'none';
  });
};

const controlUploadRecipe = async function (newRecipe) {
  const formContainer = document.querySelector('.add__recipe__form')
    .parentElement;
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close window
    setTimeout(function () {
      formContainer.style.display = 'none';
    }, 2500);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = () => {
  controlInitialState();
  controlToggle();
  controlAddRecipe();
  addRecipeView.addHandlerUpload(controlUploadRecipe);
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerRender(controlFullRecipe);
  paginationView.addHandlerClick(controlPagination);
};
init();
