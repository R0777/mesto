export default class Popup {
  constructor(popupSelector) {
    this._selector = document.querySelector(`${popupSelector}`);
  }
  open() {
    this._selector.classList.add('active')
    this._handleEscClose();
    this.setEventListeners();
  }

  close() {
    this._selector.classList.remove('active')
    this._selector.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        this.close();
      }
    })
  }

  setEventListeners() {
    const closePop = this._selector.querySelector('.popup__close')
    closePop.addEventListener('click', () => { 
      this.close();
    })
  }
}