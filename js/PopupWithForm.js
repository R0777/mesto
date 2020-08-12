import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitAction) {
        super(popupSelector);
        this._submitAction = submitAction
    }

    _getInputValues() {
        const input = Array.from(this._selector.querySelectorAll('.popup__input'))
    }

    setEventListeners() {
        super.setEventListeners();
        this._selector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitAction();
            this.close();
        })
    }

    close() {
        super.close()
        this._selector.reset();
    }
}