import View from './View';
class RecipeView extends View {
  _parentElement = document.querySelector('#full__view__recipe');
  _generateMarkup() {
    return ` <img class = "full__recipe__image" src= ${this._data.image} alt=${
      this._data.title
    }/> 
          <div class="image__overlay">
          
            <div class="image__header__container">
              <h>${this._data.title}</h>
            </div>
            <div class="image__display__container">
              <p>
                <span class="iconify" style="color: #EF4746; font-size: 27px; padding-right: 5px" data-icon="ant-design:clock-circle-outlined" data-inline="false"></span>
                Total Time: ${this._data.cookingTime} Min 
              </p>
              <div class="serve__nav__btn">
                <button ><span class="iconify" style="color: #EF4746; font-size: 22px"  data-icon="carbon:add-filled" data-inline="false"></span></button>
                <button><span class="iconify"  style="color: #EF4746; font-size: 22px"  data-icon="ant-design:minus-circle-filled" data-inline="false"></span></button>
              </div>
              <p>
                <span class="iconify" style="color: #EF4746; font-size: 27px;  padding-right: 5px" data-icon="foundation:laptop" data-inline="false"></span>
                Yield: Serves ${this._data.servings}
              </p>
            </div>
          </div>
          <div class="bottom__Container">
            <button class= "add__bookmark__btn">ADD TO BOOKMARK</button>
            <div class="recipe__ingredients">
              <h2 class="recipe__ingredients__heading" style="margin-bottom: 15px;">RECIPE INGREDIENTS </h2>
              <ul class = "recipe__ingredients__list">
              ${this._data.ingredients
                .map((ing) => {
                  return `
                <li style="text-align: left;">
                  <!-- <span class="iconify"  style="color: #EF4746; margin-right: 5px;" data-icon="subway:tick" data-inline="false"></span> -->
                  <span style="color: #EF4746; font-weight: bold; margin-right: 5px;">${ing.quantity}</span>
                  ${ing.description}
                </li>
                `;
                })
                .join(' ')}
              
              </ul>
            </div>
          </div>
        </div>`;
  }
}

export default new RecipeView();
