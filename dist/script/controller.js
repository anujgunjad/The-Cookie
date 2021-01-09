import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import * as model from './model';
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
import * as Config from './config';
import resultsView from './views/resultsView.js';
let fullViewRecipeContainer = document.querySelector('#full__view__recipe');

const controlInitialState = async function () {
  try {
    const sideCardBtn = document.querySelectorAll('.cat__card');
    const sideEle = Array('pizza', 'ice creame', 'burger', 'barbeque');
    for (let i = 0; i < sideCardBtn.length; i++) {
      sideCardBtn[i].addEventListener('click', async function () {
        console.log(sideCardBtn);
        //Load Recipe
        await model.loadSearchResults(sideEle[i]);
        resultsView.render(model.state.search.results);
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
  await model.loadSearchResults('pizza');
  resultsView.render(model.state.search.results);
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
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  controlInitialState();
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerRender(controlFullRecipe);
};
init();
