export default class Card {
  constructor(name, link, likes, cardTemplate, { handleCardClick }) {
    this._name = name;
      this._link = link;
      this._likes = likes;
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

  _submitClickTrash() {
    this._element.querySelector('.card__pic').removeEventListener('click', this._openPopBig);
    this._element.querySelector('.card__like').removeEventListener('click', this._clickLike);
    this._element.querySelector('.card__trash').removeEventListener('click', this._submitClickTrash);
    this._element.remove();
    this._element = null
  }

  _clickLike() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active')
  }

  _setEventListeners = () => {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._clickLike();
    });

    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _countLikes() {
    const likesNumber = this._likes.length
    return likesNumber
  }

  generateCard(userId) {
    this._getTemplate();
    this._setEventListeners();
    if (userId) {
      this._element.querySelector('.card__trash').style.display = 'none'
    }
    this._element.querySelector('.card__trash')
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__like-number').textContent = this._countLikes();
    const placesPic = this._element.querySelector('.card__pic');
    placesPic.src = this._link;
    placesPic.alt = this._name;
    placesPic.title = this._name;
    return this._element;
  }
}
