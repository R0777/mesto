import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js'
import { initialCards } from '../utils/utils.js';
import { validationObj } from '../components/FormValidator.js';
import { cardForm, profileForm } from '../utils/constants.js'
import './index.css';

const popUpProfile = document.querySelector('#profile')
const popUp = document.querySelectorAll('.popup')
const popUpAddcard = document.querySelector('#add-card')
const proFile = document.querySelector('.profile')
const addButton = proFile.querySelector('.profile__button')
const profileName = proFile.querySelector('.profile__name')
const profileJob = proFile.querySelector('.profile__job')
const profileAvatar = proFile.querySelector('.profile__avatar')
const editButton = proFile.querySelector('.profile__edit')
const nameInput = popUpProfile.querySelector('.popup__input_name'); 
const jobInput = popUpProfile.querySelector('.popup__input_job'); 

const cardValidator = new FormValidator(validationObj, cardForm)
const profileValidator = new FormValidator(validationObj, profileForm)

const profileApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
  headers: {
    authorization: '2078e82d-f04d-4fd6-8014-7e1fe1782828',
    'Content-Type': 'application/json'
  }
});

const cardsApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-14/cards',
  headers: {
    authorization: '2078e82d-f04d-4fd6-8014-7e1fe1782828',
    'Content-Type': 'application/json'
  }
});

profileApi.getProfile()
.then(res => {
  profileName.textContent = res.name;
  profileJob.textContent = res.about;
  profileAvatar.src = res.avatar;
})

cardsApi.getInitialCards()
.then(res => {
  const cardsList = new Section({
    items: res,
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
})


const popupEdit = new PopupWithForm('#profile', {
  submitAction: ({ name, about }) => {
    profileApi.setProfile(name, about)
    .then(res => {
      userInfo.setUserInfo(res);
    })
  }
}); 

const popupAdd = new PopupWithForm('#add-card', {
  submitAction: ({ place, link }) => {
    cardsApi.setCard(place, link)
.then(res => {
  const createdCard = new Card(res.name, res.link, '.template__place', {
    handleCardClick: (image, description) => {
      popupWithImage.open(image, description);
    }
  }).generateCard();
  
  new Section({
    items: res,
    renderer: (el) => {
      const newCard = new Card(el.name, el.link, '.template__place', {
        handleCardClick: (link, name) => {
          popupWithImage.open(link, name)
        }
      });
      const cardElement = newCard.generateCard();
      cardsList.addItem(cardElement)
    },
  }, '.places').addItem(createdCard);
})
}
})



addButton.addEventListener('click', () => {
  popupAdd.open();
  cardValidator.hideErrors(popUpAddcard);
})

editButton.addEventListener('click', () => {
  popupEdit.open();
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name
  jobInput.value = profileInfo.about
  profileValidator.hideErrors(popUpProfile, '#profile');
});

const popupWithImage = new PopupWithImage('#bigimg', {
  image: 'popup__pic',
  description: 'popup__place'
});

const userInfo = new UserInfo({
  name: 'profile__name',
  about: 'profile__job'
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