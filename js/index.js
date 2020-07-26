import {initialCards} from './utils.js';
import Card from './Card.js'

const proFile = document.querySelector('.profile')
const popUp = document.querySelectorAll('.popup')
const popUpProfile = document.querySelector('#profile')
const popUpAddcard = document.querySelector('#add-card')
//const popupBigImg = document.querySelector('#bigimg')
const editButton = proFile.querySelector('.profile__edit')
const closePop = document.querySelectorAll('.popup__close')
const addButton = proFile.querySelector('.profile__button')
const popUpAddForm = popUpAddcard.querySelector('.popup__block')
//const place = document.querySelector('.places')
const buttonSave = popUpAddcard.querySelector('.popup__save')
//const template = document.querySelector('.template__place')
//const popUpBigPic = popupBigImg.querySelector('.popup__pic')
//const popUpBigText = popupBigImg.querySelector('.popup__place')
const avaName = proFile.querySelector('.profile__name')
const avaJob = proFile.querySelector('.profile__job')
const inputName = popUpProfile.querySelector('.popup__input_name')
const inputJob = popUpProfile.querySelector('.popup__input_job')
const inputPlace = popUpAddcard.querySelector('.popup__input_place')
const inputPic = popUpAddcard.querySelector('.popup__input_pic')
let nameValue
let jobValue


// const windowReset = (popupWindow, avaNameValue, avaJobValue) => {

//   const form = popupWindow.querySelector('.popup__block')
//   const input = Array.from(popupWindow.querySelectorAll('.popup__input'))
//   const button = popUpProfile.querySelector('.popup__save')

//   if (avaNameValue) {
//     avaName.textContent = avaNameValue
//     avaJob.textContent = avaJobValue
//     inputJob.value = avaJobValue
//     inputName.value = avaNameValue

//   } else {
//     if ((popupWindow.id === 'add-card') || (popupWindow.id === 'profile'))
//       popupWindow.querySelector('.popup__block').reset();
//   }

//   input.forEach(el => {
//     hideInputError(form, el)
//   })
//   toggleButtonState(input, button)
// }

// const togglePopUp = (popupWindow) => {

//   popupWindow.classList.toggle('active');
//   windowReset(popupWindow, nameValue, jobValue);
// }

const updateProfile = (event) => {
  event.preventDefault()
  const popName = inputName.value
  const popJob = inputJob.value
  avaJob.textContent = popJob
  avaJob.setAttribute('title', popJob);
  avaName.textContent = popName
  avaName.setAttribute('title', popName);
  nameValue = avaName.textContent
  jobValue = avaJob.textContent
  Card.togglePopUp(popUpProfile);
}



const closeOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  Card.togglePopUp(event.target);
}

// const addPlace = (cardContent) => {

//   const elem = template.content.cloneNode(true);
//   const placesPic = elem.querySelector('.card__pic')
//   placesPic.src = cardContent.link
//   placesPic.alt = cardContent.name
//   placesPic.title = cardContent.name
//   elem.querySelector('.card__name').textContent = cardContent.name

//   const trash = elem.querySelector('.card__trash')
//   const buttonLike = elem.querySelector('.card__like');

//   placesPic.addEventListener('click', clickPic)
//   buttonLike.addEventListener('click', clickLike)
//   trash.addEventListener('click', clickTrash)
//   return elem;
// }

const addPlaceHandler = (event) => {
  event.preventDefault()
  const cardContext = {
    name: inputPlace.value,
    link: inputPic.value
  }

  new Card(cardContext,'.template__place').addCard();
  popUpAddForm.reset();
  buttonSave.classList.add('popup__save_inactive')
  Card.togglePopUp(popUpAddcard);
}


editButton.addEventListener('click', () => {
  Card.togglePopUp(popUpProfile);
})

addButton.addEventListener('click', () => {
  Card.togglePopUp(popUpAddcard);
})

popUp.forEach(element => {
  element.addEventListener('click', closeOverlay);
})

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    popUp.forEach(form => {
      form.classList.remove('active')
    })
  }
})

closePop.forEach(element => {
  element.addEventListener('click', (event) => {
    const closeEvent = event.target
    const close = closeEvent.closest('.popup');
    Card.togglePopUp(close);
  })
})

popUpProfile.addEventListener('submit', updateProfile);

popUpAddcard.addEventListener('submit', addPlaceHandler);




const renderCard = (array) => {
  array.forEach(element => {
const newCard = new Card(element, '.template__place');
//const cardElement = newCard.generateCard()
newCard.addCard();
  })
}

renderCard(initialCards);