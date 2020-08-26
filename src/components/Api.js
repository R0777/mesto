export default class Api {
  constructor({
    url,
    headers
  }) {
    this._url = url;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Опаньки, ошибка с карточками: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setCard(place, link) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: place,
          link: link
        })
      })
      .then((el) => {
        if (el.ok) {
          return el.json();
        }
        return Promise.reject(`Опаньки, инфо карточки не пришло: ${el.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Опаньки, инфо удаление карточки не пришло: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  addLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Опаньки, лайк карточки не добавился: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  unLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Опаньки, минус лайк карточки не получился: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  getProfile() {
    return fetch(`${this._url}/users/me`, {
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Опаньки, ошибка в профайле: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setProfile(name, about) {

    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Опаньки, инфо из профайла не пришло: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  profileAvatar(avalink) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avalink
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Опаньки, инфо из профайла не пришло: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}