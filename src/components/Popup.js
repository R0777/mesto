export default class Popup {
  constructor(popupSelector) {
    this._selector = document.querySelector(`${popupSelector}`);
  }

  open() {
    this._selector.classList.add('active')
    document.addEventListener('keydown', () => {
      this._handleEscClose();
    })
  }

  close() {
    this._selector.classList.remove('active')
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    const closePop = this._selector.querySelector('.popup__close')
    closePop.addEventListener('click', () => {
      this.close();
    })
  }
}