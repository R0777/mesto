export default class Card {
  constructor(name, link, likes, id, cardTemplate, { handleCardClick }, {handleLikeClick}) {
    this._name = name;
      this._link = link;
      this._likes = likes;
      this._id = id;
      this._template = cardTemplate;
      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._template)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return this._element = cardElement;
  }

  _clickLike() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active')
  }

  _setEventListeners = () => {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick(this._id, this._element);
    });

      this._element.querySelector('.card__like').addEventListener('click', () => {
        this._clickLike();
      });

    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  countLikes() {
    const likesNumber = this._likes.length
    return likesNumber
  }

  generateCard(userId) {
    this._getTemplate();
    this._setEventListeners();
    if (userId) {
      this._element.querySelector('.card__trash').style.display = 'none'
    }
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__like-number').textContent = this.countLikes();
    const placesPic = this._element.querySelector('.card__pic');
    placesPic.src = this._link;
    placesPic.alt = this._name;
    placesPic.title = this._name;
    return this._element;
  }
}
