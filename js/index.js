import Section from './Section.js'
import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js'
import {initialCards} from './utils.js';
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import {validationObj} from './FormValidator.js'


const popUpProfile = document.querySelector('#profile')
const inputName = popUpProfile.querySelector('.popup__input_name')
const inputJob = popUpProfile.querySelector('.popup__input_job')
const popUp = document.querySelectorAll('.popup')
const popUpAddcard = document.querySelector('#add-card')

const popUpAddForm = popUpAddcard.querySelector('.popup__block')
const buttonSave = popUpAddcard.querySelector('.popup__save')
const inputPlace = popUpAddcard.querySelector('.popup__input_place')
const inputPic = popUpAddcard.querySelector('.popup__input_pic')
const proFile = document.querySelector('.profile')
const addButton = proFile.querySelector('.profile__button')
const editButton = proFile.querySelector('.profile__edit')
const avaName = proFile.querySelector('.profile__name')
const avaJob = proFile.querySelector('.profile__job')
const cardForm = '#add-card'
const profileForm = '#profile'
const cardValidator = new FormValidator(validationObj, cardForm)
const profileValidator = new FormValidator(validationObj, profileForm)
const cardsList = new Section({items: initialCards, renderer: (el) => {
    const newCard = new Card(el, '.template__place', {handleCardClick: (event) => {
new PopupWithImage('#bigimg').open(event)
    }});
    const cardElement = newCard.generateCard();
    cardsList.addItem(cardElement)
  },
}, '.places')
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
    if (popupWindow.id === 'profile' || popupWindow.id === 'add-card')
      forms.reset();
  }
  formReset(forms, input, button);
}

const formReset = (forms, input, button) => {
  input.forEach(el => {
    const errorElement = forms.querySelector(`#${el.id}-error`);
    el.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__input-error');
    errorElement.textContent = '';
    input.value = '';
    el.classList.contains('popup__input_error') ?
      button.classList.add('popup__save_inactive') :
      button.classList.remove('popup__save_inactive')
  })
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

// const addCard = (generatedCard) => {
//   const place = document.querySelector('.places')
//   const card = generatedCard;
//   place.prepend(card);
// }

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
  const popupEdit = new Popup ('#profile')
  popupEdit.open();

})

addButton.addEventListener('click', () => {
  const popupAdd = new Popup ('#add-card')
  popupAdd.open();

})

popUp.forEach(element => {
  element.addEventListener('click', (event) => {
    if (event.target !== event.currentTarget) {
      return
    }
  element.classList.remove('active')
  });
})


popUpProfile.addEventListener('submit', updateProfile);

popUpAddcard.addEventListener('submit', addPlaceHandler);

cardsList.renderItem();


const validation = () => {
  cardValidator.enableValidation()
  profileValidator.enableValidation()
}

validation();