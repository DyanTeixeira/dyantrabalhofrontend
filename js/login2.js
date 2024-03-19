
var verSenha = document.getElementById('checkbox');
    var vermail = document.getElementById('senha');

    verSenha.addEventListener('click', () => {
        if (verSenha.checked) {
            vermail.type = "text";
        } else {
            vermail.type = "password";
        }
    });


let veremail = document.querySelector('.emailver'); 



const emailDigitado= localStorage.getItem('email');
console.log(emailDigitado)

veremail.textContent=  emailDigitado;


// ------------------------------------------------------------------------------------
function enviarForm(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obter os valores do formulário
    var email = localStorage.getItem('email');
    var senha = document.getElementById('senha').value;

    // Construir o objeto de dados para enviar na requisição POST
    var data = {
        email: email,
        senha: senha
    };

    // Enviar a requisição POST para o endpoint /login
    fetch('http://localhost:3400/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);

        if (!!response.mensagem) {
            alert(response.mensagem);
            return;
        }

       console.log('deu boa')

        // Redireciona para a página inicial após o login bem-sucedido
      
            window.location.href = 'home.html';
     
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}