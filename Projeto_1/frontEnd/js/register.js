/* Criando funções para validar se o usuario preencheu corretamente os campos do formulario*/



/*Validação no E-mail */
function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisabled();
}

/*Validação na Senha */
function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordMarch();
    toggleRegisterButtonDisabled();
}

/* Validação na confirmação de senha */
function onChangeConfirmPassword() {
    validatePasswordMarch();
    toggleRegisterButtonDisabled();

}
/* Conferindo se as senhas são iguais */
function validatePasswordMarch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmpasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

/* Validação de registro */
function register() {
    showLoading();
    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading();
        window.location.href = "index.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "E-mail já está em uso";
    }
    return error.message;
}



/*Desabilidando botão Registrar */
function toggleRegisterButtonDisabled() {
    form.registerButton().disabled = isFormValid();
}

/* validação se todos os campos estão certos*/
function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }
    const password = form.password().value;
    if (!password || !password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (!confirmPassword != confirmPassword) {
        return false;
    }
    return true;
}



/* Criando uma "const" para ajudar na buscar dos elementos da tela*/
const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    confirmpasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    registerButton: () => document.getElementById('register-button')
}