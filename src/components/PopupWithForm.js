import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitAction }) {
    super(popupSelector);
    this._submitAction = submitAction
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll('.popup__input');
    this._formValues = [];
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this._submitAction(this._getInputValues());
      super.close();
    })
  }

  close() {
    this._form = this._selector.querySelector('.popup__block');
    super.close();
    this._form.reset();
  }
}