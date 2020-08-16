import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js'
import { initialCards } from '../utils/utils.js';
import { validationObj } from '../components/FormValidator.js';
import { popUpProfile, popUp, popUpAddcard, addButton, editButton, cardForm, profileForm } from '../utils/constants.js'
import './index.css';

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
  userInfo.getUserInfo();
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