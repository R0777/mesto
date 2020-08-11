import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(picinfo) {
    super.open()
    console.log(picinfo)
    const targetPic = picinfo.target
    const targetCard = targetPic.closest('.card')
    const targetText = targetCard.querySelector('.card__name').textContent
    this._selector.querySelector('.popup__pic').src = targetPic.src
    this._selector.querySelector('.popup__place').textContent = targetText
    this._selector.querySelector('.popup__pic').alt = targetText
  }
}