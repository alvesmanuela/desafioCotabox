/* Criando Função para validar os campos do formulario de login */
function onChangeEmail() {
    toggleButtonsDisabled();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisabled();
    togglePasswordErros();
}

/*Validação de login */
function login() {

    showLoading();
    firebase.auth().signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('password').value).then(Response => {
        hideLoading();
        window.location.href = "../html/index.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

/* Caso o usuario não seja encontrado ou senha inválida - Mensagem de erro na tela */
function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário não encontrado";
    }
    if (error.code == "auth/wrong-password") {
        return "Senha inválida";
    }
    return error.message;
}

function register() {
    window.location.href = "register.html";

}



/*Recuperação de Senha */
function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(document.getElementById('email').value).then(() => {
        hideLoading();
        alert('E-mail enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}



/* Validação Email */
function isEmailValid() {
    const email = document.getElementById('email').value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

/*Obrigatoriedade no campo e-mail */
function toggleEmailErrors() {
    const email = document.getElementById('email').value;
    if (!email) {
        document.getElementById('email-required-error').style.display = "block";
    } else {
        document.getElementById('email-required-error').style.display = "none";
    }

    if (validateEmail(email)) {
        document.getElementById('email-invalid-error').style.display = "none";
    } else {
        document.getElementById('email-invalid-error').style.display = "block";
    }
}

/*Obrigatoriedade no campo senha */
function togglePasswordErros() {
    const password = document.getElementById('password').value;
    if (!password) {
        document.getElementById('password-required-error').style.display = 'block';
    } else {
        document.getElementById('password-required-error').style.display = 'none';
    }
}

/*Desabilidando botões */
function toggleButtonsDisabled() {
    const emailValid = isEmailValid();
    document.getElementById('recover-password-botton').disabled = !emailValid;

    const passwordValid = isPassswordValid();
    document.getElementById('login-button').disabled = !emailValid || !passwordValid;
}

/* Validação Senha */
function isPassswordValid() {
    const password = document.getElementById('password').value;
    if (!password) {
        return false;
    }
    return true;
}