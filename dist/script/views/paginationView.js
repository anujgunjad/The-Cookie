import View from './View';
class PaginationView extends View {
  _parentElement = document.querySelector('#pagination__btn__container');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.page__btn');
      const goToPage = btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage == 1 && numPages > 1) {
      return `
      <button data-goto="${
        parseInt(curPage) + parseInt(1)
      }" class="page__btn">Page ${parseInt(curPage) + parseInt(1)}</button>
      `;
    }

    // Last Page
    if (curPage == numPages && numPages > 1) {
      return `
        <button data-goto="${
          parseInt(curPage) - parseInt(1)
        }" class="page__btn">Page ${parseInt(curPage) - parseInt(1)}</button>
      `;
    }
    // Other Page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          parseInt(curPage) - parseInt(1)
        }" class="page__btn">Page ${parseInt(curPage) - parseInt(1)}</button>
        <button  data-goto="${
          parseInt(curPage) + parseInt(1)
        }" class="page__btn">Page ${parseInt(curPage) + parseInt(1)}</button>
      `;
    }
    // Page 1, and there are no other pages

    return '';
  }
}

export default new PaginationView();
