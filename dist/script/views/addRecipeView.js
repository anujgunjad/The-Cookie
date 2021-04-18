import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.add__recipe__form');
  _message = 'Receipe added succesfully';
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
