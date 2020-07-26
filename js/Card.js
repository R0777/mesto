export default class Card {
  constructor(data, cardTemplate) {
    this._name = data.name,
      this._link = data.link,
      this._temp = cardTemplate,
      this.nameValue,
      this.jobValue
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._temp)
      .content
      .querySelector('.card')
      .cloneNode(true);

    this._element = cardElement;
  }

 static _windowReset = (popupWindow, avaNameValue, avaJobValue) => {
    const popUpProfile = document.querySelector('#profile')
    const form = popupWindow.querySelector('.popup__block')
    const input = Array.from(popupWindow.querySelectorAll('.popup__input'))
    const button = popUpProfile.querySelector('.popup__save')

    if (avaNameValue) {
      avaName.textContent = avaNameValue
      avaJob.textContent = avaJobValue
      inputJob.value = avaJobValue
      inputName.value = avaNameValue

    } else {
      if ((popupWindow.id === 'add-card') || (popupWindow.id === 'profile'))
        popupWindow.querySelector('.popup__block').reset();
    }

    input.forEach(el => {
      hideInputError(form, el)
    })
    this.toggleButtonState(input, button)
  }

  static togglePopUp = (popupWindow) => {

    popupWindow.classList.toggle('active');
    Card._windowReset(popupWindow, this.nameValue, this.jobValue);
  }


  _clickTrash = () => {
    const trashTarget = this._element
    const cardToRemove = trashTarget.closest('.card');
    cardToRemove.querySelector('.card__pic').removeEventListener('click', this._clickPic)
    cardToRemove.querySelector('.card__like').removeEventListener('click', this._clickLike)
    cardToRemove.querySelector('.card__trash').removeEventListener('click', this._clickTrash)
    cardToRemove.remove();
  }

  _openPopBig = (pic, place, popup) => {
    const popupBigImg = document.querySelector('#bigimg')
    const popUpBigPic = popupBigImg.querySelector('.popup__pic')
    const popUpBigText = popupBigImg.querySelector('.popup__place')
    popUpBigPic.setAttribute('src', pic);
    popUpBigPic.setAttribute('alt', place);
    popUpBigPic.setAttribute('title', place);
    popUpBigText.textContent = place
    Card.togglePopUp(popup);
  }


  _clickLike = () => {
    this._element.querySelector('.card__like').classList.toggle('card__like_active')
  }

  _clickPic = () => {
    const targetPic = this._element
    const popupBigImg = document.querySelector('#bigimg')
    const picLink = targetPic.querySelector('.card__pic').src;
    const placeCard = targetPic.closest('.card');
    const placeTitle = placeCard.querySelector('.card__name').textContent
    this._openPopBig(picLink, placeTitle, popupBigImg);
  }

  _setEventListeners = () => {

    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._clickTrash();
    });

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._clickLike();
    });

    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._clickPic();
    });
  }

  addCard = () => {
    const place = document.querySelector('.places')
    const card = this._generateCard();
    place.prepend(card);
  }

  _generateCard = () => {
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