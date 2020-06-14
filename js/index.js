const proFile = document.querySelector('.profile')
const popUp = document.querySelector('.popup')
const editButton = proFile.querySelector('.profile__edit')
const closePop = popUp.querySelector('.popup__close')
const popSave = popUp.querySelector('.popup__save')

const openPop = function() {
  popUp.classList.toggle('popup-open');
}

const saveButt = function(ev) {
  ev.preventDefault()
  let popName = popUp.querySelector('.popup__name').value
  let popJob = popUp.querySelector('.popup__job').value
  let avaName = proFile.querySelector('.profile__name')
  let avaJob = proFile.querySelector('.profile__job')
  avaJob.textContent = popJob;
  avaName.textContent = popName;
  openPop();
}

const closeOverlay = function(ev) {
  if (ev.target !== ev.currentTarget) {
    return
  }
  openPop();
}

editButton.addEventListener("click", openPop);
closePop.addEventListener("click", openPop);
popSave.addEventListener("click", saveButt);
popUp.addEventListener('click', closeOverlay);