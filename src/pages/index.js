import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js'
import { initialCards } from '../utils/utils.js';
import { validationObj } from '../components/FormValidator.js';
import { cardForm, profileForm, avatarForm } from '../utils/constants.js'
import './index.css';
import Popup from '../components/Popup.js';

const popUpProfile = document.querySelector('#profile')
const popUp = document.querySelectorAll('.popup')
const popUpAddcard = document.querySelector('#add-card')
const popUpNewAvatar = document.querySelector('#new-avatar')
// const popUpRemovecard = document.querySelector('#remove-card')
const proFile = document.querySelector('.profile')
const addButton = proFile.querySelector('.profile__button')
const profileName = proFile.querySelector('.profile__name')
const profileJob = proFile.querySelector('.profile__job')
const profileAvatar = proFile.querySelector('.profile__avatar-img')
const editButton = proFile.querySelector('.profile__edit')
const nameInput = popUpProfile.querySelector('.popup__input_name'); 
const jobInput = popUpProfile.querySelector('.popup__input_job');
let idProfile

const cardValidator = new FormValidator(validationObj, cardForm)
const profileValidator = new FormValidator(validationObj, profileForm)
const avatarValidator = new FormValidator(validationObj, avatarForm)

const popUpTrash = new Popup('#remove-card')

const profileApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
  headers: {
    authorization: '2078e82d-f04d-4fd6-8014-7e1fe1782828',
    'Content-Type': 'application/json'
  }
});

const avatarApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me/avatar',
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
      const newCard = new Card(el.name, el.link, el.likes, '.template__place', {
        handleCardClick: (link, name) => {
          popupWithImage.open(link, name)
        }
      });

if (idProfile !== el.owner._id) {
  
      const cardElement = newCard.generateCard('id');
      cardsList.addItem(cardElement)
}
else {
  const cardElement = newCard.generateCard();
  cardsList.addItem(cardElement)
  const trashBin = document.querySelector('.card__trash')
  trashBin.addEventListener('click', () => {
  popUpTrash.open();
  popUpTrash.setEventListeners();
})
}
  },
  }, '.places')
  
  cardsList.renderItem();
})

const popupEdit = new PopupWithForm('#profile', {
  submitAction: ({ name, about}) => {
    profileApi.setProfile(name, about)
    .then(res => {
      userInfo.setUserInfo(res);
    })
  }
}); 


const newAvatar = new PopupWithForm('#new-avatar', {
  submitAction: ({avatar}) => {
    avatarApi.profileAvatar(avatar)
    .then(res => {
      userInfo.setUserInfo(res)
    })
  }
})



const popupAdd = new PopupWithForm('#add-card', {
  submitAction: ({ place, link }) => {
    cardsApi.setCard(place, link)
.then(res => {
  const createdCard = new Card(res.name, res.link, res.likes, '.template__place', {
    handleCardClick: (image, description) => {
      popupWithImage.open(image, description);
    }
  }).generateCard();
  
  new Section({
    items: res,
    renderer: (el) => {
      const newCard = new Card(el.name, el.link, res.likes, '.template__place', {
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

profileAvatar.addEventListener('click', () => {
  newAvatar.open();
  avatarValidator.hideErrors(popUpNewAvatar);
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
  about: 'profile__job',
  avatar: 'profile__avatar-img'
});

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupWithImage.setEventListeners();
newAvatar.setEventListeners()



popUp.forEach(element => {
  element.addEventListener('click', (event) => {
    if (event.target !== event.currentTarget) {
      return
    }
    element.classList.remove('active')
  });
})

cardValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();
