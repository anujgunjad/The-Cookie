export default class View {
  _data;
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
    this._parentElement.innerHTML = ' ';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message) {
    const markup = `
      <div class="full__view__recipe_error">
        <span class="iconify"  style="color: #EF4746; font-size: 30px;  padding-right: 5px" data-icon="bx:bxs-error-alt" data-inline="false"></span>
        <h style="font-family: 'Montserrat', sans-serif;">${message}</h>
      </div>
    `;
  }

  addHandlerRender(handler) {
    ['load', 'hashchange'].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }
}
