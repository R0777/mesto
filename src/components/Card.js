export default class Card {
  constructor(name, link, cardTemplate, { handleCardClick }) {
    this._name = name;
      this._link = link;
      this._template = cardTemplate;
      this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._template)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return this._element = cardElement;
  }

  _clickTrash() {
    this._element.querySelector('.card__pic').removeEventListener('click', this._openPopBig);
    this._element.querySelector('.card__like').removeEventListener('click', this._clickLike);
    this._element.querySelector('.card__trash').removeEventListener('click', this._clickTrash);
    this._element.remove();
    this._element = null
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
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__name').textContent = this._name;
    const placesPic = this._element.querySelector('.card__pic');
    placesPic.src = this._link;
    placesPic.alt = this._name;
    placesPic.title = this._name;
    return this._element;
  }
}