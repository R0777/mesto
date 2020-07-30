import FormValidator from './FormValidator.js'
import {togglePopUp} from './index.js'
export const popUpProfile = document.querySelector('#profile')
export const proFile = document.querySelector('.profile')
export const avaName = proFile.querySelector('.profile__name')
export const avaJob = proFile.querySelector('.profile__job')
export const inputName = popUpProfile.querySelector('.popup__input_name')
export const inputJob = popUpProfile.querySelector('.popup__input_job')


export default class Card {
  constructor(data, cardTemplate) {
    this._name = data.name,
      this._link = data.link,
      this._temp = cardTemplate
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._temp)
      .content
      .querySelector('.card')
      .cloneNode(true);

    this._element = cardElement;
  }

  _clickTrash = () => {
    const trashTarget = this._element
    const cardToRemove = trashTarget.closest('.card');
    cardToRemove.querySelector('.card__pic').removeEventListener('click', this._openPopBig)
    cardToRemove.querySelector('.card__like').removeEventListener('click', this._clickLike)
    cardToRemove.querySelector('.card__trash').removeEventListener('click', this._clickTrash)
    cardToRemove.remove();
  }

 _openPopBig = () => {
    const targetPic = this._element
    const picLink = targetPic.querySelector('.card__pic').src;
    const placeCard = targetPic.closest('.card');
    const placeTitle = placeCard.querySelector('.card__name').textContent
    const popupBigImg = document.querySelector('#bigimg')
    const popUpBigPic = popupBigImg.querySelector('.popup__pic')
    const popUpBigText = popupBigImg.querySelector('.popup__place')
    popUpBigPic.setAttribute('src', picLink);
    popUpBigPic.setAttribute('alt', placeTitle);
    popUpBigPic.setAttribute('title', placeTitle);
    popUpBigText.textContent = placeTitle
    togglePopUp(popupBigImg);
  }


  _clickLike = () => {
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

  generateCard = () => {
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