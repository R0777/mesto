const proFile = document.querySelector('.profile')
const popUp = document.querySelectorAll('.popup')
const editButton = proFile.querySelector('.profile__edit')
const closePop = document.querySelectorAll('.popup__close')
const popSave = document.querySelectorAll('.popup__save')
const addButton = proFile.querySelector('.profile__button')
const popUpAddForm = popUp[1].querySelector('.popup__block')
const closePopBig = popUp[2].querySelector('.popup__close')
const place = document.querySelector('.places')
const template = document.querySelector('.template__place')

const openPop = function (ev) {
  const popEvt = ev.target
  const popClass = popEvt.getAttribute('class')

  if (popClass === 'profile__edit') {
    popUp[0].classList.toggle('popup-open');
  }
  else if (popClass === 'profile__button') {
  popUp[1].classList.toggle('popup-open');
  }
  else if (popClass === 'places__pic') {
  popUp[2].classList.toggle('popup-open');
  }
  else
  return
}

const openPopBig = function (pic, place) {
  const popUpBigPic = popUp[2].querySelector('.popup__pic')
  const popUpBigText = popUp[2].querySelector('.popup__place')
  popUpBigPic.setAttribute('src', pic);
  popUpBigPic.setAttribute('alt', place);
  popUpBigText.innerHTML = place
}

const saveButt = function (ev) {
  ev.preventDefault()
  let popName = popUp[0].querySelector('.popup__input_name').value
  let popJob = popUp[0].querySelector('.popup__input_job').value
  let avaName = proFile.querySelector('.profile__name')
  let avaJob = proFile.querySelector('.profile__job')
  avaJob.textContent = popJob;
  avaName.textContent = popName;
  openPop();
}

const addPlaceButton = function (ev) {
  ev.preventDefault()
  let popPlace = popUp[1].querySelector('.popup__input_place').value
  let popPic = popUp[1].querySelector('.popup__input_pic').value
  addPlace(popPlace, popPic);
  popUpAddForm.reset();
  openPopAdd();

}

const closeOverlay = function (ev) {
  if (ev.target !== ev.currentTarget) {
    return
  }
  openPop();
}

editButton.addEventListener("click", openPop);
addButton.addEventListener("click", openPop);

closePop.forEach(el => {
  el.addEventListener("click", openPop);
})
popSave.forEach(el => {
  el.addEventListener("click", saveButt);
})
popUp.forEach(el => {
  el.addEventListener('click', closeOverlay);
})

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




function addPlace(name, link) {
  const elem = template.content.cloneNode(true);
  elem.querySelector('.places__pic').src = link
  elem.querySelector('.places__pic').alt = name
  elem.querySelector('.places__name').textContent = name

  elem.querySelector('.places__pic').addEventListener('click', function (ev) {
    const picTarget = ev.target
    const picLink = picTarget.src;
    const placeTitleT = picTarget.closest('.places__card');
    const placeTitle = placeTitleT.querySelector('.places__name').textContent
    openPopBigClose();
    openPopBig(picLink, placeTitle);
  })


  const trash = elem.querySelector('.places__trash')
  const buttLike = elem.querySelector('.places__like');

  buttLike.addEventListener('click', function (ev) {
    const evTarget = ev.target;
    evTarget.classList.toggle('places__like_active')
  })

  trash.addEventListener('click', function (ev) {
    const cardRem = ev.target;
    const cardRemTarget = cardRem.closest('.places__card');
    cardRemTarget.remove();
  })

  place.prepend(elem)
}

initialCards.forEach(el => {
  addPlace(el.name, el.link);
})