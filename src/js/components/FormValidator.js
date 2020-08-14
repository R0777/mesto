export const validationObj = {
  formsSelector: '.popup__block',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputError: '.popup__input-error',
};

export default class FormValidator {
  constructor(obj, validForm) {
    this._formSelector = validForm,
      this._inputSelector = obj.inputSelector,
      this._submitButtonSelector = obj.submitButtonSelector,
      this._inputError = obj.inputError
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error');
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__input-error');
    errorElement.textContent = '';
  };

  hideErrors = (forms, id) => {
    const input = Array.from(forms.querySelectorAll('.popup__input'))
    const button = forms.querySelector('.popup__save')
      input.forEach(el => {
        const errorElement = forms.querySelector(`#${el.id}-error`);
        el.classList.remove('popup__input_error');
        errorElement.classList.remove('popup__input-error');
        errorElement.textContent = '';
        input.value = '';
        if(id) {
        el.classList.contains('popup__input_error') ?
          button.classList.add('popup__save_inactive') :
          button.classList.remove('popup__save_inactive')
        }
        else forms.querySelector('.popup__block').reset();
      })
    }

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

  _toggleButtonState(inputList, buttonElement) {

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save_inactive')
    } else buttonElement.classList.remove('popup__save_inactive')
  }

  _checkEnter(inputList) {

    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        if (this._hasInvalidInput(inputList)) {
          event.preventDefault();
        }
      }
    })
  }

  _setEventListeners(formElement, inputSelector, submitButtonSelector) {

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement)

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
        this._checkEnter(inputList);
      });
    });
  }

  enableValidation() {
    const form = document.querySelector(this._formSelector);
      form.addEventListener('submit', function (event) {
        event.preventDefault();
      });

      this._setEventListeners(form, this._inputSelector, this._submitButtonSelector); 
  };
}

