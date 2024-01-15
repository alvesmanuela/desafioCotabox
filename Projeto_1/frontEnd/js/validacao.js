/* Função que ajudará na validação campo de e-mail */
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}