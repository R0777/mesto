const proFile = document.querySelector('.profile')
const popUp = document.querySelectorAll('.popup')
const popUpProfile = document.querySelector('#profile')
const popUpAddcard = document.querySelector('#add-card')
const popupBigImg = document.querySelector('#bigimg')
const editButton = proFile.querySelector('.profile__edit')
const closePop = document.querySelectorAll('.popup__close')
const addButton = proFile.querySelector('.profile__button')
const popUpAddForm = popUpAddcard.querySelector('.popup__block')
const place = document.querySelector('.places')
const buttonSave = popUpAddcard.querySelector('.popup__save')
const template = document.querySelector('.template__place')
const popUpBigPic = popupBigImg.querySelector('.popup__pic')
const popUpBigText = popupBigImg.querySelector('.popup__place')
const avaName = proFile.querySelector('.profile__name')
const avaJob = proFile.querySelector('.profile__job')
const inputName = popUpProfile.querySelector('.popup__input_name')
const inputJob = popUpProfile.querySelector('.popup__input_job')
const inputPlace = popUpAddcard.querySelector('.popup__input_place')
const inputPic = popUpAddcard.querySelector('.popup__input_pic')

const togglePopUp = (popupWindow) => {
  popupWindow.classList.toggle('active');
}

const openPopBig = (pic, place, popup) => {
  popUpBigPic.setAttribute('src', pic);
  popUpBigPic.setAttribute('alt', place);
  popUpBigPic.setAttribute('title', place);
  popUpBigText.textContent = place
  togglePopUp(popup);
}

const updateProfile = (event) => {
  event.preventDefault()
  const popName = inputName.value
  const popJob = inputJob.value
  avaJob.textContent = popJob
  avaJob.setAttribute('title', popJob);
  avaName.textContent = popName
  avaName.setAttribute('title', popName);
  togglePopUp(popUpProfile);
}

const clickTrash = (event) => {
  const trashTarget = event.target;
  const cardToRemove = trashTarget.closest('.card');
  cardToRemove.querySelector('.card__pic').removeEventListener('click', clickPic)
  cardToRemove.querySelector('.card__like').removeEventListener('click', clickLike)
  cardToRemove.querySelector('.card__trash').removeEventListener('click', clickTrash)
  cardToRemove.remove();
}

const closeOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  togglePopUp(event.target);
}

const clickLike = (event) => {
  const likeTarget = event.target
  likeTarget.classList.toggle('card__like_active')
}

const clickPic = (event) => {
  const targetPic = event.target
  const picLink = targetPic.src;
  const placeCard = targetPic.closest('.card');
  const placeTitle = placeCard.querySelector('.card__name').textContent
  openPopBig(picLink, placeTitle, popupBigImg);
}

const addPlace = (cardContent) => {

  const elem = template.content.cloneNode(true);
  const placesPic = elem.querySelector('.card__pic')
  placesPic.src = cardContent.link
  placesPic.alt = cardContent.name
  placesPic.title = cardContent.name
  elem.querySelector('.card__name').textContent = cardContent.name

  const trash = elem.querySelector('.card__trash')
  const buttonLike = elem.querySelector('.card__like');

  placesPic.addEventListener('click', clickPic)
  buttonLike.addEventListener('click', clickLike)
  trash.addEventListener('click', clickTrash)
  return elem
}

const addCard = (cardContent) => {
  const card = addPlace(cardContent);
  place.prepend(card);
}

const addPlaceHandler = (event) => {
  event.preventDefault()
  const cardContext = {
    name: inputPlace.value,
    link: inputPic.value
  }
  addCard(cardContext);
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
    addCard(element);
  })
}
renderCard(initialCards);