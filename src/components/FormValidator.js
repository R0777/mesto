
export default class FormValidator {
  constructor(obj, validForm) {
    this._formsSelector = obj.formsSelector;
    this._formSelector = validForm;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._buttonDisabled = obj.buttonDisabledClass;
    this._inputError = obj.inputError;
    this._inputErrorBorder = obj.inputErrorBorder;
  }

  _showInputError(formElement, inputElement, errorMessage, inputError, inputErrorBorder) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorBorder);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputError);
  };

  _hideInputError = (formElement, inputElement, inputError, inputErrorBorder) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorBorder);
    errorElement.classList.remove(inputError);
    errorElement.textContent = '';
  };

  hideErrors = (forms, formId) => {
    const input = Array.from(forms.querySelectorAll(`.${this._inputSelector}`))
    const button = forms.querySelector(`.${this._submitButtonSelector}`)
    input.forEach(el => {
      const errorElement = forms.querySelector(`#${el.id}-error`);
      el.classList.remove(this._inputErrorBorder);
      errorElement.classList.remove(this._inputError);
      errorElement.textContent = '';
      input.value = '';
      if (formId) {
        el.classList.contains(this._inputError) ?
          button.classList.add(this._buttonDisabled) :
          button.classList.remove(this._buttonDisabled)
      } else {
        forms.querySelector(`.${this._formsSelector}`).reset();
        button.classList.add(this._buttonDisabled);
      }
    })
  }

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, this._inputError, this._inputErrorBorder);
    } else {
      this._hideInputError(formElement, inputElement, this._inputError, this._inputErrorBorder);
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
    const form = document.querySelector(`${this._formSelector}`);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    this._setEventListeners(form, `.${this._inputSelector}`, `.${this._submitButtonSelector}`);
  };
}