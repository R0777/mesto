import {
  closePop
} from './index.js'
export default class Popup {
  constructor(popupSelector) {
    this._selector = document.querySelector(popupSelector)
  }
  open() {
    this._selector.classList.add('active')
    this._handleEscClose();
  }

  close() {
    this._selector.classList.remove('active')
    this._selector.removeEventListener('keydown', _handleEscClose)
  }

  _handleEscClose() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        close()
      }
    })
  }

  setEventListeners() {
    this._selector.closePop.addEventListener('click', click)
  }
}