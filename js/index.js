import {initialCards} from './utils.js';
import {nameValue, jobValue, popUpProfile, proFile, avaName, avaJob, inputName, inputJob} from './Card.js';
import Card from './Card.js'
import FormValidator from './FormValidator.js'

const popUp = document.querySelectorAll('.popup')
const popUpAddcard = document.querySelector('#add-card')
const editButton = proFile.querySelector('.profile__edit')
const closePop = document.querySelectorAll('.popup__close')
const addButton = proFile.querySelector('.profile__button')
const popUpAddForm = popUpAddcard.querySelector('.popup__block')
const buttonSave = popUpAddcard.querySelector('.popup__save')
const inputPlace = popUpAddcard.querySelector('.popup__input_place')
const inputPic = popUpAddcard.querySelector('.popup__input_pic')


const closeOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  Card.togglePopUp(event.target);
}

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

popUpProfile.addEventListener('submit', Card.updateProfile);

popUpAddcard.addEventListener('submit', addPlaceHandler);

const renderCard = (array) => {
  array.forEach(element => {
const newCard = new Card(element, '.template__place');
newCard.addCard();
  })
}
renderCard(initialCards);

const validationObj = {
  formSelector: '.popup__block',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
};

const validation = (validationObj) => {
  const newValidation = new FormValidator(validationObj)
  newValidation.enableValidation()
}

validation(validationObj);
