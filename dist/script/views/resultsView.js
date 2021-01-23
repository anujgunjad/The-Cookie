import View from './View';
class ResultView extends View {
  _parentElement = document.querySelector('#recipe__list');
  _pageElement = document.querySelector('#pagination__btn__container');
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join(' ');
  }
  _generateMarkupPreview(result) {
    return `
    <a href="#${result.id}" class="recipe__card">
      <img src="${result.image}"  alt="recipe" />
      <p>${result.title.substring(0, 25)}...</p>
      <span>${result.publisher}</span>
   </a>
  `;
  }
}

export default new ResultView();
