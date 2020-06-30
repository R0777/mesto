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
const editButton = proFile.querySelector('.profile__edit')
const closePop = document.querySelectorAll('.popup__close')
const popSave = document.querySelectorAll('.popup__save')
const addButton = proFile.querySelector('.profile__button')
const popUpAddForm = popUp[1].querySelector('.popup__block')
const place = document.querySelector('.places')
const template = document.querySelector('.template__place')
const popUpBigPic = popUp[2].querySelector('.popup__pic')
const popUpBigText = popUp[2].querySelector('.popup__place')
const avaName = proFile.querySelector('.profile__name')
const avaJob = proFile.querySelector('.profile__job')
const inputName = popUp[0].querySelector('.popup__input_name')
const inputJob = popUp[0].querySelector('.popup__input_job')
const inputPlace = popUp[1].querySelector('.popup__input_place')
const inputPic = popUp[1].querySelector('.popup__input_pic')

const tooglePopUp = (event) => {

  const openPopUpEvt = event.target
  const popClass = openPopUpEvt.getAttribute('class')

  switch (popClass) {
    case 'profile__edit':
      popUp[0].classList.add('popup-open');
      break;
    case 'profile__button':
      popUp[1].classList.add('popup-open');
      break;
    case 'places__pic':
      popUp[2].classList.add('popup-open');
      break;
    default:
      popUp.forEach(element => {
        element.classList.remove('popup-open')
      })
  }
}

const openPopBig = (pic, place, event) => {
  popUpBigPic.setAttribute('src', pic);
  popUpBigPic.setAttribute('alt', place);
  popUpBigText.textContent = place
  tooglePopUp(event)
}

const updateProfile = (event) => {
  event.preventDefault()
  const popName = inputName.value
  const popJob = inputJob.value
  avaJob.textContent = popJob;
  avaName.textContent = popName;
  tooglePopUp(event);
}

const addPlaceButton = (event) => {
  event.preventDefault()
  const popPlace = inputPlace.value
  const popPic = inputPic.value
  addPlace(popPlace, popPic);
  popUpAddForm.reset();
  tooglePopUp(event);
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
    openPopBig(picLink, placeTitle, event);
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

editButton.addEventListener("click", tooglePopUp);
addButton.addEventListener("click", tooglePopUp);
popUp.forEach(element => {
  element.addEventListener('click', closeOverlay);
})
closePop.forEach(element => {
  element.addEventListener("click", tooglePopUp);
})
popSave[0].addEventListener("click", updateProfile);
popSave[1].addEventListener("click", addPlaceButton);

initialCards.forEach(element => {
  addPlace(element.name, element.link);
})

//Develop