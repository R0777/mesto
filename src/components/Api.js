export default class Api {
  constructor({
    url,
    headers
  }) {
    this._url = url;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(this._url, {
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
    return fetch(this._url, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: place,
          link: link
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Опаньки, инфо карточки не пришло: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getProfile() {
    return fetch(this._url, {
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
    return fetch(this._url, {
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
}