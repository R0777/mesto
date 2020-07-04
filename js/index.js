const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const proFile = document.querySelector('.profile')
const popUp = document.querySelectorAll('.popup')
const popUpProfile = document.querySelector('#profile')
const popUpAddcard = document.querySelector('#addcard')
const popUpBigimg = document.querySelector('#bigimg')
const editButton = proFile.querySelector('.profile__edit')
const closePop = document.querySelectorAll('.popup__close')
const buttonSave = popUpProfile.querySelector('.popup__save')
const buttonAdd = popUpAddcard.querySelector('.popup__save')
const addButton = proFile.querySelector('.profile__button')
const popUpAddForm = popUpAddcard.querySelector('.popup__block')
const place = document.querySelector('.places')
const template = document.querySelector('.template__place')
const popUpBigPic = popUpBigimg.querySelector('.popup__pic')
const popUpBigText = popUpBigimg.querySelector('.popup__place')
const avaName = proFile.querySelector('.profile__name')
const avaJob = proFile.querySelector('.profile__job')
const inputName = popUpProfile.querySelector('.popup__input_name')
const inputJob = popUpProfile.querySelector('.popup__input_job')
const inputPlace = popUpAddcard.querySelector('.popup__input_place')
const inputPic = popUpAddcard.querySelector('.popup__input_pic')


const togglePopUp = (popupWindow) => {
  popupWindow.classList.toggle('popup-open')
}

const openPopBig = (pic, place, popup) => {
  popUpBigPic.setAttribute('src', pic);
  popUpBigPic.setAttribute('alt', place);
  popUpBigPic.setAttribute('title', place);
  popUpBigText.textContent = place
  togglePopUp(popup)
}

const updateProfile = (event) => {
  event.preventDefault()
  const popName = inputName.value
  const popJob = inputJob.value
  avaJob.textContent = popJob;
  avaJob.setAttribute('title', popJob);
  avaName.textContent = popName;
  avaName.setAttribute('title', popName);
  togglePopUp(popUpProfile);

}

const closeOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  togglePopUp(event.target);
}

const addPlace = (cardContent) => {

  const elem = template.content.cloneNode(true);
  const placesPic = elem.querySelector('.card__pic')
  placesPic.src = cardContent.link
  placesPic.alt = cardContent.name
  placesPic.title = cardContent.name
  elem.querySelector('.card__name').textContent = cardContent.name

  placesPic.addEventListener('click', (event) => {
    const targetPic = event.target
    const picLink = targetPic.src;
    const placeCard = targetPic.closest('.card');
    const placeTitle = placeCard.querySelector('.card__name').textContent
    openPopBig(picLink, placeTitle, popUpBigimg);
  })

  const trash = elem.querySelector('.card__trash')
  const buttonLike = elem.querySelector('.card__like');

  buttonLike.addEventListener('click', (event) => {
    const likeTarget = event.target;
    likeTarget.classList.toggle('card__like_active')
  })

  trash.addEventListener('click', (event) => {
    const trashTarget = event.target;
    const cardToRemove = trashTarget.closest('.card');
    cardToRemove.remove();
  })
  return elem;
}

const addCard = (cardContent) => {
  const card = addPlace(cardContent)
  place.prepend(card)
}

const addPlaceButton = (event) => {
  event.preventDefault()
  const cardContext = {
    name: inputPlace.value,
    link: inputPic.value
  }
  addCard(cardContext);
  popUpAddForm.reset();
  togglePopUp(popUpAddcard);
}


editButton.addEventListener("click", () => {
  togglePopUp(popUpProfile)
});
addButton.addEventListener("click", () => {
  togglePopUp(popUpAddcard)
});

popUp.forEach(element => {
  element.addEventListener('click', closeOverlay);
})

closePop.forEach(element => {
  element.addEventListener("click", (event) => {
    const closeEvent = event.target
    const close = closeEvent.closest('.popup');
    togglePopUp(close)
  });
})

popUpProfile.addEventListener("submit", updateProfile);

popUpAddcard.addEventListener("submit", addPlaceButton);

const renderCard = (array) => {
  array.forEach(element => {
    addCard(element);
  })
}
renderCard(initialCards);

//Уважаемый Алексей, прошу вас. Пишите более понятно. Вы пишите не для человека который уже все уже знает, а который учится. Часто бывает так, что вещи которые мы умеем делать для нас неочевидны.
// Ваша формулировка "У функции должно быть единственное назначение, у этой -- сборка карточки и установка слушателей, но не добавление в разметку. Для добавления карточки в разметку надо завести отдельный метод, который вызывает функцию создания карточки и результат ее выполнения уже в разметку добавляет, его можно будет использовать как в методе загрузки первоначальных карточек, так и при добавлении пользовательской."
// Я даже сейчас сомневаюсь что понял все что вы хотели мне этим сказать. И то что я внес все необходимые изменения которые вы подразумевали.
// Нужно писать пошагово, типа создайте в функцию, там расположите то-то и то-то. Передайте то-то и то-то в функцию такую-то - вот как-то так.
// А то уже 4 раз отдаю полностью рабочую версию, а приходится переписывать
// Надеюсь что теперь все так как надо =)