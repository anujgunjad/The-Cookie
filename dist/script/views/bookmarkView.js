import View from './View';
class BookmarkView extends View {
  _parentElement = document.querySelector(
    '.bookmark__recipe__container__parent'
  );
  _errorMessage = 'No bookmarks yet';
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join(' ');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkupPreview(result) {
    return `<li>
           <a href="#${result.id}">
            <div class="bookmark__recipe__container">
              <div class="bookmark__img__container">
                <img src="${result.image}">
              </div>
             
              <div class= "bookmark__text__container" style=" display: flex;width: 100%;flex-direction: column; justify-content: center;">
                <p style = "display: block;">${result.title.substring(
                  0,
                  25
                )}...</p>
                <span>${result.publisher}</span>
              </div>
              
            </div>
            </a>
          </li>
  `;
  }
}

export default new BookmarkView();
