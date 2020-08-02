import {initialCards} from './utils.js';
import {proFile, avaName, avaJob,} from './Card.js';
import Card from './Card.js'
import {validationObj, cardForm, profileForm} from './FormValidator.js'
import FormValidator from './FormValidator.js'

const popUpProfile = document.querySelector('#profile')
const inputName = popUpProfile.querySelector('.popup__input_name')
const inputJob = popUpProfile.querySelector('.popup__input_job')
const popUp = document.querySelectorAll('.popup')
const popUpAddcard = document.querySelector('#add-card')
const editButton = proFile.querySelector('.profile__edit')
const closePop = document.querySelectorAll('.popup__close')
const addButton = proFile.querySelector('.profile__button')
const popUpAddForm = popUpAddcard.querySelector('.popup__block')
const buttonSave = popUpAddcard.querySelector('.popup__save')
const inputPlace = popUpAddcard.querySelector('.popup__input_place')
const inputPic = popUpAddcard.querySelector('.popup__input_pic')
const cardValidator = new FormValidator(validationObj, cardForm)
const profileValidator = new FormValidator(validationObj, profileForm)
let nameValue
let jobValue

const windowReset = (popupWindow, avaNameValue, avaJobValue) => {
  const forms = popupWindow.querySelector('.popup__block')
  const input = Array.from(popupWindow.querySelectorAll('.popup__input'))
  const button = popUpProfile.querySelector('.popup__save')

  if (avaNameValue) {
    avaName.textContent = avaNameValue
    avaJob.textContent = avaJobValue
    inputJob.value = avaJobValue
    inputName.value = avaNameValue

  } else {
    if (popupWindow.id === 'profile')
      forms.reset();
      else if (popupWindow.id === 'add-card') {
        forms.reset();
        inputPlace.reset();
        inputPic.reset();
      }
      else return
  }

  input.forEach(el => {
    cardValidator._hideInputError(forms, el);
    profileValidator._hideInputError(forms, el);
  })
  cardValidator._toggleButtonState(input, button)
  profileValidator._toggleButtonState(input, button)
}

export const togglePopUp = (popupWindow) => {

  popupWindow.classList.toggle('active');
  windowReset(popupWindow, nameValue, jobValue);
}

const updateProfile = (event) => {

  event.preventDefault()
  avaJob.textContent = inputJob.value
  avaJob.setAttribute('title', inputJob.value);
  avaName.textContent = inputName.value
  avaName.setAttribute('title', inputName.value);
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

const validation = () => {
cardValidator.enableValidation()
profileValidator.enableValidation()
}

validation();