const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__input-error');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_inactive')
  } else buttonElement.classList.remove('popup__save_inactive')
}

const checkEnter = (inputList, buttonElement) => {

  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      if (hasInvalidInput(inputList)) {
        event.preventDefault();
      }
    }
  })
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector) => {

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector)
  toggleButtonState(inputList, buttonElement)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
      checkEnter(inputList, buttonElement);
    });
  });
}

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector
}) => {
  const form = Array.from(document.querySelectorAll(formSelector));

  form.forEach((formElement) => {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector);

  });
};

enableValidation({
  formSelector: '.popup__block',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
});