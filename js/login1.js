let campoEmail = document.getElementById("email");
let btnLogin = document.getElementById("btn-avançar");

btnLogin.addEventListener("click", () => {
    let emailDigitado = campoEmail.value.toLowerCase();

    if (!emailDigitado || emailDigitado === "") {
        alert("Email inválido! Por favor, digite um e-mail válido.");
        return;
    } 

    localStorage.setItem("email", emailDigitado);
    window.open('login2.html', '_self');
})
