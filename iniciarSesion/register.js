const form = document.getElementById("form")
const nameInput = document.getElementById("username")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")

const checkUsername = () => {
    let valid = false;

    const min = 3
    const max = 35

    const username = nameInput.value.trim()
    if (isEmpty(username)) {
        showError(nameInput, "El username es obligatorio")
    } else if(!isBetween(username.length,min,max)) {
        showError(nameInput, `El usuario debe tener entre ${min} y ${max} caracteres`)
    } else {
        showSuccess(nameInput)
        valid = true
    }
    return valid
}

const checkEmail = () => {
    let valid = false 

    const emailValue = emailInput.value.trim()
    if(isEmpty(emailValue)) {
        showError(emailInput, `El email es obligatorio`)
    } else if (!isEmailValid(emailValue)) {
        showError(emailInput, `El email es invalido`)
    } else {
        showSuccess(emailInput)
        valid = true
    }
    return valid;
}

const checkPassword = () => {
    let valid = false 
    const password = passwordInput.value.trim()
    if(isEmpty(password)){
        showError(passwordInput, `La contraseña es obligatoria`)
    } else if(!isPasswordSecure(password)) {
        showError(passwordInput, `La contraseña tiene que tener al menos 8 caracteres, una mayuscula, una minuscula y un simbolo`)
    } else {
        showSuccess(passwordInput)
        valid = true
    }
    return valid
}


const isEmpty = (value) => value === ""
const isBetween = (length, min, max) => length < min || length > max ? false : true
const isEmailValid = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(email)
} 
const isPasswordSecure = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return re.test(password)
} 
const showError = (input, message) => {
    const formField = input.parentElement
    formField.classList.remove("success")
    formField.classList.add("error")
    const error= formField.querySelector("small")
    error.innerText = message
}
const showSuccess = (input) => {
    const formField = input.parentElement
    formField.classList.remove("error")
    formField.classList.add("success")
    const error= formField.querySelector("small")
    error.textContext = ""
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let isUsernameValid = checkUsername();
    let isEmailValid = checkEmail();
    let isPasswordValid = checkPassword();

    console.log(isUsernameValid, isEmailValid, isPasswordValid);

    let isFormValid =
      isUsernameValid && isEmailValid && isPasswordValid;

    if (isFormValid) {
        form.submit();
        alert(
            "Enviamos el formulario",
            isUsernameValid,
            isEmailValid,
            isPasswordValid,
      );
    }
  });
  

const debonce = (fn, delay = 300) => {
    let timeoutId
    return (...args) => {
        if(timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay)
    }
}

form.addEventListener('input', debonce((e) => {
    switch (e.target.id) {
        case "username":
            checkUsername()
            break;
        case "email":
            checkEmail()
            break;
        case "password":
            checkPassword()
            break;
    }
}))