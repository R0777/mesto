import {togglePopUp} from './index.js'

export const proFile = document.querySelector('.profile')
export const avaName = proFile.querySelector('.profile__name')
export const avaJob = proFile.querySelector('.profile__job')
const popupBigImg = document.querySelector('#bigimg')
const popUpBigPic = popupBigImg.querySelector('.popup__pic')
const popUpBigText = popupBigImg.querySelector('.popup__place')


export default class Card {
  constructor(data, cardTemplate) {
    this._name = data.name,
      this._link = data.link,
      this._temp = cardTemplate
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._temp)
      .content
      .querySelector('.card')
      .cloneNode(true);

   return this._element = cardElement;
  }

  _clickTrash() {
    this._element.querySelector('.card__pic').removeEventListener('click', this._openPopBig)
    this._element.querySelector('.card__like').removeEventListener('click', this._clickLike)
    this._element.querySelector('.card__trash').removeEventListener('click', this._clickTrash)
    this._element.remove()
    this._element = null
  }

 _openPopBig() {
    const placeTitle = this._element.querySelector('.card__name').textContent
    popUpBigPic.src = this._link;
    popUpBigPic.alt = this._name;
    popUpBigPic.title = this._name;
    popUpBigText.textContent = placeTitle
    togglePopUp(popupBigImg);
  }


  _clickLike() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active')
  }

  _setEventListeners = () => {

    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._clickTrash();
    });

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._clickLike();
    });

    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._openPopBig();
    });
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__name').textContent = this._name;
    const placesPic = this._element.querySelector('.card__pic')
    placesPic.src = this._link;
    placesPic.alt = this._name;
    placesPic.title = this._name;
    return this._element;
  }
}