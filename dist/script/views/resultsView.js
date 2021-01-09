import View from './View';
class ResultView extends View {
  _parentElement = document.querySelector('#recipe__content');

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join(' ');
  }
  _generateMarkupPreview(result) {
    return `
    <a href="#${result.id}" class="recipe__card">
      <img src="${result.image}"  alt="recipe" />
      <p>${result.title}</p>
      <span>${result.publisher}</span>
   </a>
  `;
  }
}

export default new ResultView();
