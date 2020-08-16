import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, { image, description }) {
    super(popupSelector);
    this._image = this._selector.querySelector(`.${image}`);
    this._description = this._selector.querySelector(`.${description}`);
  }

  open(img, description) {
    super.open();
    this._image.src = img
    this._description.textContent = description
    this._image.alt = description
  }
}