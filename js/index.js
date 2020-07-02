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

const tooglePopUp = (element) => {
  element.classList.toggle('popup-open')
}

const openPopBig = (pic, place, popup) => {
  popUpBigPic.setAttribute('src', pic);
  popUpBigPic.setAttribute('alt', place);
  popUpBigText.textContent = place
  tooglePopUp(popup)
}

const updateProfile = (event) => {
  event.preventDefault()
  const popName = inputName.value
  const popJob = inputJob.value
  avaJob.textContent = popJob;
  avaName.textContent = popName;
  tooglePopUp(popUpProfile);
}

const addPlaceButton = (event) => {
  event.preventDefault()
  const popPlace = inputPlace.value
  const popPic = inputPic.value
  addPlace(popPlace, popPic);
  popUpAddForm.reset();
  tooglePopUp(popUpAddcard);
}

const closeOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  popUp.forEach(element => {
    element.classList.remove('popup-open');
  })
}

const addCard = (card) => {
  place.prepend(card)
}

const addPlace = (name, link) => {

  const elem = template.content.cloneNode(true);
  const placesPic = elem.querySelector('.places__pic')
  placesPic.src = link
  placesPic.alt = name
  elem.querySelector('.places__name').textContent = name

  placesPic.addEventListener('click', function (event) {
    const picEvent = event.target
    const picLink = picEvent.src;
    const placeCard = picEvent.closest('.places__card');
    const placeTitle = placeCard.querySelector('.places__name').textContent
    openPopBig(picLink, placeTitle, popUpBigimg);
  })

  const trash = elem.querySelector('.places__trash')
  const buttonLike = elem.querySelector('.places__like');

  buttonLike.addEventListener('click', function (event) {
    const likeTarget = event.target;
    likeTarget.classList.toggle('places__like_active')
  })

  trash.addEventListener('click', function (event) {
    const trashTarget = event.target;
    const cardToRemove = trashTarget.closest('.places__card');
    cardToRemove.remove();
  })

  addCard(elem);
}

editButton.addEventListener("click", function () {
  tooglePopUp(popUpProfile)
});
addButton.addEventListener("click", function () {
  tooglePopUp(popUpAddcard)
});




popUp.forEach(element => {
  element.addEventListener('click', closeOverlay);
})


closePop.forEach(element => {
  element.addEventListener("click", function (event) {
    const closeEvent = event.target
    const close = closeEvent.closest('.popup');
    tooglePopUp(close)
  });
})


buttonSave.addEventListener("click", updateProfile);
buttonAdd.addEventListener("click", addPlaceButton);

initialCards.forEach(element => {
  addPlace(element.name, element.link);
})

//Develop