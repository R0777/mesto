export default class UserInfo {
  constructor({name, job}) {
    this._avaName = name,
      this._avaJob = job
  }
  getUserInfo() {
    const userObj = {
      name: this._avaName.value,
      job: this._avaJob.value
    };
    return userObj
  }

  setUserInfo({name, job}) {
    this._avaJob.textContent = job
    this._avaJob.setAttribute('title', job);
    this._avaName.textContent = name
    this._avaName.setAttribute('title', name);
  }
}