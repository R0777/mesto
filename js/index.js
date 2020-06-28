const proFile = document.querySelector('.profile')
const popUp = document.querySelector('.popup')
const popUpAdd = document.querySelector('.popup-add')
const popUpBig = document.querySelector('.popup-big')
const editButton = proFile.querySelector('.profile__edit')
const closePop = popUp.querySelector('.popup__close')
const popSave = popUp.querySelector('.popup__save')
const closePopAdd = popUpAdd.querySelector('.popup-add__close')
const popSaveAdd = popUpAdd.querySelector('.popup-add__save')
const addButton = proFile.querySelector('.profile__button')
const popUpAddForm = popUpAdd.querySelector('.popup-add__form')
const closePopBig = popUpBig.querySelector('.popup-big__close');

const openPop = function () {
  popUp.classList.toggle('popup-open');
}

const openPopAdd = function () {
  popUpAdd.classList.toggle('popup-add-open');
}

const openPopBigClose = function () {
  popUpBig.classList.toggle('popup-big-open');
}

const openPopBig = function (pic, place) {
  const popUpBigPic = popUpBig.querySelector('.popup-big__pic')
  const popUpBigText = popUpBig.querySelector('.popup-big__place')
  popUpBigPic.setAttribute('src', pic);
  popUpBigPic.setAttribute('alt', place);
  popUpBigText.innerHTML = place
}

const saveButt = function (ev) {
  ev.preventDefault()
  let popName = popUp.querySelector('.popup__input_name').value
  let popJob = popUp.querySelector('.popup__input_job').value
  let avaName = proFile.querySelector('.profile__name')
  let avaJob = proFile.querySelector('.profile__job')
  avaJob.textContent = popJob;
  avaName.textContent = popName;
  openPop();
}

const addPlaceButton = function (ev) {
  ev.preventDefault()
  let popPlace = popUpAdd.querySelector('.popup-add__input_place').value
  let popPic = popUpAdd.querySelector('.popup-add__input_pic').value

  if (popPlace === "Название" || popPic === "Ссылка на картинку") {
    return
  } else {
    addPlace(popPlace, popPic);
    popUpAddForm.reset();
    openPopAdd();
  }
}

const closeOverlay = function (ev) {
  if (ev.target !== ev.currentTarget) {
    return
  }
  openPop();
}

editButton.addEventListener("click", openPop);
addButton.addEventListener('click', openPopAdd)
closePop.addEventListener("click", openPop);
closePopAdd.addEventListener("click", openPopAdd);
closePopBig.addEventListener("click", openPopBigClose);
popSaveAdd.addEventListener("click", addPlaceButton);
popSave.addEventListener("click", saveButt);
popUp.addEventListener('click', closeOverlay);

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

const place = document.querySelector('.places')
const temp = document.querySelector('.template__place')


function addPlace(name, link) {
  const elem = temp.content.cloneNode(true);
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