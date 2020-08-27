import { validationObj } from '../utils/constants.js';
import { renderLoading } from '../utils/utils.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js'
import {
  cardForm,
  profileForm,
  avatarForm
} from '../utils/constants.js';
import './index.css';
import Popup from '../components/Popup.js';

const popUpProfile = document.querySelector('#profile')
const popUp = document.querySelectorAll('.popup')
const popUpAddcard = document.querySelector('#add-card')
const popUpNewAvatar = document.querySelector('#new-avatar')
const popUpRemovecard = document.querySelector('#remove-card')
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

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '2078e82d-f04d-4fd6-8014-7e1fe1782828',
    'Content-Type': 'application/json'
  }
});

api.getProfile()
  .then(res => {
    profileName.textContent = res.name;
    profileJob.textContent = res.about;
    profileAvatar.src = res.avatar;
    idProfile = res._id;
  })
  .catch((err) => {
    console.log(err);
  })

  function cardsList(res) {
    const cardsList = new Section({
      items: res,
      renderer: (el) => {
        newCard(el);
      },
    }, '.places')

    return cardsList
  }

function newCard(el) {
  const newCard = new Card(el.name, el.link, el.likes, el._id, el.owner._id, idProfile, '.template__place', {
    handleCardClick: (image, description) => {
      popupWithImage.open(image, description);
    }
  }, {
    handleLikeClick: (cardId, cardElement) => {
      api.addLike(cardId)
        .then(res => {
          cardElement.querySelector('.card__like-number').textContent = newCard.countLikes(res);
          if (!cardElement.querySelector('.card__like').classList.contains('card__like_active')) {
            api.unLike(cardId)
              .then(res => {
                cardElement.querySelector('.card__like-number').textContent = newCard.countLikes(res);
              })
              .catch((err) => {
                console.log(err);
              })
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  })

  if (idProfile !== el.owner._id) {
    const ifCardElement = newCard.generateCard('id');
    cardsList(el).addItem(ifCardElement)

  } else {
    const elseCardElement = newCard.generateCard();
    cardsList(el).addItem(elseCardElement)
    const trashBin = document.querySelector('.card__trash')
    trashBin.addEventListener('click', () => {
      popUpTrash.open();
      popUpTrash.setEventListeners();
      popUpRemovecard.addEventListener('submit', (event) => {
        event.preventDefault();
        api.deleteCard(el._id)
          .then(res => {
            elseCardElement.remove();
            popUpTrash.close();
          })
          .catch((err) => {
            console.log(err);
          })
      })
    })
  }
  return newCard
}

Promise.all([
  api.getProfile(),
  api.getInitialCards()
])
.then(res => {
  const [userProfile, initialCards] = res
    cardsList(initialCards).renderItem();
    idProfile = userProfile._id
  })
  .catch((err) => {
    console.log(err);
  })

const popupEdit = new PopupWithForm('#profile', {
  submitAction: ({
    name,
    about
  }) => {
    renderLoading(true)
    api.setProfile(name, about)
      .then(res => {
        userInfo.setUserInfo(res)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(err => {
        renderLoading(false)
      })
  }
});

const newAvatar = new PopupWithForm('#new-avatar', {
  submitAction: ({
    avatar
  }) => {
    renderLoading(true)
    api.profileAvatar(avatar)
      .then(res => {
        userInfo.setUserInfo(res)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(err => {
        renderLoading(false)
      })
  }
})

const popupAdd = new PopupWithForm('#add-card', {
  submitAction: ({
    place,
    link
  }) => {
    renderLoading(true)
    api.setCard(place, link)
      .then(el => {
        newCard(el)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(err => {
        renderLoading(false)
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