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
      sideCardBtn[i].addEventListener('click', function () {
        //Load Recipe
        model.loadSearchResults(sideEle[i]);
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
  model.loadSearchResults('pizza');
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
    console.log(err);
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    // 2) Load search results
    await model.loadSearchResults(query);
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
