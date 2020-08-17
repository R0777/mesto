import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js'
import { initialCards } from '../utils/utils.js';
import { validationObj } from '../components/FormValidator.js';
import { cardForm, profileForm } from '../utils/constants.js'
import './index.css';

const popUpProfile = document.querySelector('#profile')
const popUp = document.querySelectorAll('.popup')
const popUpAddcard = document.querySelector('#add-card')
const proFile = document.querySelector('.profile')
const addButton = proFile.querySelector('.profile__button')
const editButton = proFile.querySelector('.profile__edit')
const nameInput = popUpProfile.querySelector('.popup__input_name'); 
const jobInput = popUpProfile.querySelector('.popup__input_job'); 

const cardValidator = new FormValidator(validationObj, cardForm)
const profileValidator = new FormValidator(validationObj, profileForm)

const cardsList = new Section({
  items: initialCards,
  renderer: (el) => {
    const newCard = new Card(el.name, el.link, '.template__place', {
      handleCardClick: (link, name) => {
        popupWithImage.open(link, name)
      }
    });
    const cardElement = newCard.generateCard();
    cardsList.addItem(cardElement)
  },
}, '.places')

cardsList.renderItem();


const popupEdit = new PopupWithForm('#profile', {
  submitAction: ({ name, job }) => {
    userInfo.setUserInfo({ name, job });
  }
});


const popupAdd = new PopupWithForm('#add-card', {
  submitAction: ({ place, link }) => {
    const createdCard = new Card(place, link, '.template__place', {
      handleCardClick: (image, description) => {
        popupWithImage.open(image, description);
      }
    }).generateCard();
    cardsList.addItem(createdCard);
  }
})

addButton.addEventListener('click', () => {
  popupAdd.open();
  cardValidator.hideErrors(popUpAddcard);
})

editButton.addEventListener('click', () => {
  popupEdit.open();
   //Спасибо за развернутое пояснение. Буду с вами откровенен, я не понимаю почему именно так нужно сделать, а не то как сделал я в предыдущих итерациях. <3
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name
  jobInput.value = profileInfo.job
  profileValidator.hideErrors(popUpProfile, '#profile');
});

const popupWithImage = new PopupWithImage('#bigimg', {
  image: 'popup__pic',
  description: 'popup__place'
});

const userInfo = new UserInfo({
  name: 'profile__name',
  job: 'profile__job'
});

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupWithImage.setEventListeners();



popUp.forEach(element => {
  element.addEventListener('click', (event) => {
    if (event.target !== event.currentTarget) {
      return
    }
    element.classList.remove('active')
  });
})

cardValidator.enableValidation()
profileValidator.enableValidation()