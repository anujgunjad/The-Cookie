import { API_URL, KEY } from './config';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadFullRecipe = async function (id) {
  try {
    const data = await getJSON(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
      };
    });
    console.log(state.search.results);
    // const recContainer = document.querySelector('#recipe__content');
    // data.data.recipes.splice(0, 9).map((el) => {
    //   recContainer.insertAdjacentHTML(
    //     'afterbegin',
    //     `
    //   <a href="#${el.id}" class="recipe__card">
    //       <img src="${el.image_url}" alt="recipe" />
    //       <p>${el.title}</p>
    //       <span>${el.publisher}</span>
    //   </a>
    //   `
    //   );
    // });
  } catch (err) {
    throw err;
  }
};
