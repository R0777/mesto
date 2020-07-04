const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const proFile = document.querySelector('.profile')
const popUp = document.querySelectorAll('.popup')
const popUpProfile = document.querySelector('#profile')
const popUpAddcard = document.querySelector('#addcard')
const popUpBigimg = document.querySelector('#bigimg')
const editButton = proFile.querySelector('.profile__edit')
const closePop = document.querySelectorAll('.popup__close')
const buttonSave = popUpProfile.querySelector('.popup__save')
const buttonAdd = popUpAddcard.querySelector('.popup__save')
const addButton = proFile.querySelector('.profile__button')
const popUpAddForm = popUpAddcard.querySelector('.popup__block')
const place = document.querySelector('.places')
const template = document.querySelector('.template__place')
const popUpBigPic = popUpBigimg.querySelector('.popup__pic')
const popUpBigText = popUpBigimg.querySelector('.popup__place')
const avaName = proFile.querySelector('.profile__name')
const avaJob = proFile.querySelector('.profile__job')
const inputName = popUpProfile.querySelector('.popup__input_name')
const inputJob = popUpProfile.querySelector('.popup__input_job')
const inputPlace = popUpAddcard.querySelector('.popup__input_place')
const inputPic = popUpAddcard.querySelector('.popup__input_pic')

const togglePopUp = (popupWindow) => {
  popupWindow.classList.toggle('popup-open')
}

const openPopBig = (pic, place, popup) => {
  popUpBigPic.setAttribute('src', pic);
  popUpBigPic.setAttribute('alt', place);
  popUpBigText.textContent = place
  togglePopUp(popup)
}

const updateProfile = (event) => {
  event.preventDefault()
  const popName = inputName.value
  const popJob = inputJob.value
  avaJob.textContent = popJob;
  avaName.textContent = popName;
  togglePopUp(popUpProfile);

}

const closeOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  togglePopUp(event.target);
}

const addCard = (card) => {
  place.prepend(card)
}

const addPlace = (cardContent) => {

  const elem = template.content.cloneNode(true);
  const placesPic = elem.querySelector('.card__pic')
  placesPic.src = cardContent.link
  placesPic.alt = cardContent.name
  elem.querySelector('.card__name').textContent = cardContent.name

  placesPic.addEventListener('click', function (event) {
    const picEvent = event.target
    const picLink = picEvent.src;
    const placeCard = picEvent.closest('.card');
    const placeTitle = placeCard.querySelector('.card__name').textContent
    openPopBig(picLink, placeTitle, popUpBigimg);
  })

  const trash = elem.querySelector('.card__trash')
  const buttonLike = elem.querySelector('.card__like');

  buttonLike.addEventListener('click', function (event) {
    const likeTarget = event.target;
    likeTarget.classList.toggle('card__like_active')
  })

  trash.addEventListener('click', function (event) {
    const trashTarget = event.target;
    const cardToRemove = trashTarget.closest('.card');
    cardToRemove.remove();
  })

  addCard(elem);
}

const addPlaceButton = (event) => {
  event.preventDefault()
  const popPlace = inputPlace.value
  const popPic = inputPic.value
  addPlace(popPlace, popPic);
  popUpAddForm.reset();
  togglePopUp(popUpAddcard);

}


editButton.addEventListener("click", () => {
  togglePopUp(popUpProfile)
});
addButton.addEventListener("click", () => {
  togglePopUp(popUpAddcard)
});

popUp.forEach(element => {
  element.addEventListener('click', closeOverlay);
})

closePop.forEach(element => {
  element.addEventListener("click", (event) => {
    const closeEvent = event.target
    const close = closeEvent.closest('.popup');
    togglePopUp(close)
  });
})

popUpProfile.addEventListener("submit", updateProfile);

popUpAddcard.addEventListener("submit", addPlaceButton);

const renderCard = (array) => {
  array.forEach(element => {
    addPlace(element);
  })
}
renderCard(initialCards);