
import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
} 

_getInputValues() {
    const input = Array.from(this._selector.querySelectorAll('.popup__input'))
}

setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._selector.reset();
    })
  }

close() {
    super.close()
    this._selector.reset();
}



// const forms = this._selector.querySelector('.popup__block')
// const input = Array.from(this._selector.querySelectorAll('.popup__input'))
// const button = this._selector.querySelector('.popup__save')