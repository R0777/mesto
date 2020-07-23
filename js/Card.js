export default class Card {
  constructor(data, cardTemplate) {
    this._name = data.name,
      this._link = data.link,
      this._temp = cardTemplate
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._temp)
      .content
      .querySelector('.template__place')
      .cloneNode(true);

    this._element = cardElement;
  }

  _clickTrash = (event) => {
    const trashTarget = event.target;
    const cardToRemove = trashTarget.closest('.card');
    cardToRemove.querySelector('.card__pic').removeEventListener('click', clickPic)
    cardToRemove.querySelector('.card__like').removeEventListener('click', clickLike)
    cardToRemove.querySelector('.card__trash').removeEventListener('click', clickTrash)
    cardToRemove.remove();
  }

  _clickLike = (event) => {
    const likeTarget = event.target
    likeTarget.classList.toggle('card__like_active')
  }

  _clickPic = (event) => {
    const targetPic = event.target
    const picLink = targetPic.src;
    const placeCard = targetPic.closest('.card');
    const placeTitle = placeCard.querySelector('.card__name').textContent
    openPopBig(picLink, placeTitle, popupBigImg);
  }

  _setEventListeners = () => {

    const trash = this._element.querySelector('.card__trash')
    const buttonLike = this._element.querySelector('.card__like');

		trash.addEventListener('click', () => {
			this._clickTrash();
    });
    
    buttonLike.addEventListener('click', () => {
			this._clickLike();
    });
    
    placesPic.addEventListener('click', () => {
			this._clickPic();
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