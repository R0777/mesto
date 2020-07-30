import {initialCards} from './utils.js';
import {popUpProfile, proFile, avaName, avaJob, inputName, inputJob} from './Card.js';
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
let nameValue
let jobValue

export const windowReset = (popupWindow, avaNameValue, avaJobValue) => {
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
    FormValidator.hideInputError(form, el)
  })
  FormValidator.toggleButtonState(input, button)
}

export const togglePopUp = (popupWindow) => {

  popupWindow.classList.toggle('active');
  windowReset(popupWindow, nameValue, jobValue);
}

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
  togglePopUp(popUpProfile);
}

const addCard = (generatedCard) => {
  const place = document.querySelector('.places')
  const card = generatedCard;
  place.prepend(card);
}

const closeOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  togglePopUp(event.target);
}

const addPlaceHandler = (event) => {
  event.preventDefault()
  const cardContext = {
    name: inputPlace.value,
    link: inputPic.value
  }

  const newCard = new Card(cardContext, '.template__place').generateCard();
  addCard(newCard);
  popUpAddForm.reset();
  buttonSave.classList.add('popup__save_inactive')
  togglePopUp(popUpAddcard);
}

editButton.addEventListener('click', () => {
  togglePopUp(popUpProfile);
})

addButton.addEventListener('click', () => {
  togglePopUp(popUpAddcard);
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
    togglePopUp(close);
  })
})

popUpProfile.addEventListener('submit', updateProfile);

popUpAddcard.addEventListener('submit', addPlaceHandler);

const renderCard = (array) => {
  array.forEach(element => {
    const newCard = new Card(element, '.template__place');
    addCard(newCard.generateCard());
  })
}
renderCard(initialCards);

const validationObj = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
};

const validation = (validationObj) => {
  const newValidation = new FormValidator(validationObj, '.popup__block')
  newValidation.enableValidation()
}

validation(validationObj);