export const validationObj = {
  formsSelector: '.popup__block',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  buttonDisabledClass: 'popup__save_inactive',
  inputError: '.popup__input-error',
  inputErrorClass: 'popup__input-error'

};

export default class FormValidator {
  constructor(obj, validForm) {
    this._formSelector = validForm;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._buttonDisabled = obj.buttonDisabledClass;
    this._inputError = obj.inputError;
    this._inputErrorClass = obj.inputErrorClass
  }

  _showInputError(formElement, inputElement, errorMessage, inputError) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputError);
  };

  _hideInputError = (formElement, inputElement, inputError) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputError);
    errorElement.classList.remove(inputError);
    errorElement.textContent = '';
  };

  hideErrors = (forms, formId) => {
    const input = Array.from(forms.querySelectorAll('.popup__input'))
    const button = forms.querySelector('.popup__save')
    input.forEach(el => {
      const errorElement = forms.querySelector(`#${el.id}-error`);
      el.classList.remove('popup__input_error');
      errorElement.classList.remove('popup__input-error');
      errorElement.textContent = '';
      input.value = '';
      if (formId) {
        el.classList.contains('popup__input_error') ?
          button.classList.add('popup__save_inactive') :
          button.classList.remove('popup__save_inactive')
      }
      else forms.querySelector('.popup__block').reset();
    })
  }

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, this._inputErrorClass);
    } else {
      this._hideInputError(formElement, inputElement, this._inputError);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

  _toggleButtonState(inputList, buttonElement, buttonDisabled) {

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(buttonDisabled)
    } else buttonElement.classList.remove(buttonDisabled)
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
    const buttonElement = formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._buttonDisabled);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement, this._buttonDisabled);
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

