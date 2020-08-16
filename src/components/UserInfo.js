export default class UserInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(`.${name}`);
    this._job = document.querySelector(`.${job}`);
  }
  getUserInfo() {
    return {
      name: this._name,
      job: this._job
    }
  }


  setUserInfoInput({ name, job }) {
    this._nameInput = document.querySelector('.popup__input_name');
    this._jobInput = document.querySelector('.popup__input_job');
    this._nameInput.value = name.textContent;
    this._jobInput.value = job.textContent;
  }


  setUserInfo({ name, job }) {
    this._job.textContent = job
    this._name.textContent = name
  }
}