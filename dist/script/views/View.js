export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError('No Recipes Found!');
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // update(data) {
  //   if (!data || (Array.isArray(data) && data.length === 0))
  //     return this.renderError();
  //   this._data = data;
  //   const newMarkup = this._generateMarkup();

  //   const newDom = document.createRange().createContextualFragment(newMarkup);
  //   const newElements = Array.from(newDom.querySelectorAll('*'));
  //   const curElements = Array.from(this._parentElement.querySelectorAll('*'));
  //   console.log(newElements);
  //   console.log(curElements);

  //   newElements.forEach((newEl, i) => {
  //     const curEl = curElements[i];
  //     // console.log(curEl, newEl.isEqualNode(curEl));

  //     // if (
  //     //   !newEl.isEqualNode(curEl) &&
  //     //   newEl.firstChild?.nodeValue.trim() !== ''
  //     // ) {
  //     //   console.log('^^', newEl.firstChild.nodeValue.trim());
  //     //   curEl.textContent = newEl.textContent;
  //     // }
  //   });
  // }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="lds-default" style="padding: 30px"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
    if (this._parentElement.id === 'recipe__list') {
      this._pageElement.innerHTML = '';
    }
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message) {
    const markup = `
      <div class="full__view__recipe_error">
        <span class="iconify"  style="color: #EF4746; font-size: 30px;  padding-right: 5px" data-icon="bx:bxs-error-alt" data-inline="false"></span>
        <h style="font-family: 'Montserrat', sans-serif;">${message}</h>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['load', 'hashchange'].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }
  renderMessage(message = this._message) {
    const markup = `
      <div class="full__view__recipe_error">
        
        <span class="iconify"  style="color: #EF4746; font-size: 30px;  padding-right: 5px" data-icon="clarity:success-standard-solid" data-inline="false"></span>
        <h style="font-family: 'Montserrat', sans-serif;">${message}</h>

      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
