export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(container);
  }

  renderItem() {
    this._items.forEach(el => {
      this._renderer(el);
    })
  }

  addItem(elem) {
    this._container.prepend(elem);
  }
}