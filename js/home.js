document.getElementById('openModalBtn').addEventListener('click', function() {
    document.querySelector('.modal-contentAdicionar').style.display = 'block';
    
});
  
  document.getElementsByClassName('uniqueClose')[0].addEventListener('click', function() {
    document.querySelector('.modal-contentAdicionar').style.display = 'none';
  });
  
  document.getElementById('uniqueProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
    const jsonObject = {};
  
    formData.forEach(function(value, key) {
      jsonObject[key] = value;
    });
  
    const jsonBody = JSON.stringify(jsonObject);
  
    fetch('http://localhost:3400/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '8846b88fa80d2e6f03637d20c01fc33a'
      },
      body: jsonBody
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json();
    })
    .then(data => {
      console.log('Produto adicionado com sucesso:', data);
      document.querySelector('.modal-contentAdicionar').style.display = 'none';
      location.reload();
      // Aqui você pode adicionar qualquer lógica adicional após adicionar o produto
    })
    .catch(error => {
      console.error('Erro:', error);
      // Aqui você pode lidar com o erro de forma adequada
    });
  });
  

document.addEventListener("DOMContentLoaded", function() {
    const url = 'http://localhost:3400/produtos';
    const modal = document.querySelector('.modal-contentEdit');
    const formEditarProduto = document.getElementById('formEditarProduto');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const produtosBody = document.getElementById('produtosBody');

            data.forEach(produto => {
                const row = document.createElement('td');
                row.innerHTML = `
                    <td><h3 class="idproduto"> ID: <div Id:"idprodutoo">${produto.id}.</div></td>
                    <td><h3 class="nome">Nome: <div id="nomee">${produto.nome}.</div></td>
                    <td><h3 class="valor" >Valor: <div id="valorr">${produto.valor}R$.</div></td>
                    <td><h3 class="quantE">Estoque: <div id="quatEE">${produto.quantidadeEstoque}.</div></td>
                    <td><h3 class="obs">Observacao: <div id="obss">${produto.observacao}.</div></td>
                    <td><h3 class="dtCtr">Cadastro: <div id="dtCtrr">${produto.dataCadastro}.</div></td>
                    <td><button class="editar" data-id="${produto.id}"><i class="fa-solid fa-pen-to-square fa-2xs" style="color: #ffffff;"></i></button></td>
                    <td><button class="excluir" data-id="${produto.id}"><i class="fa-solid fa-trash" style="color: #ffffff;"></i></button></td>
                `;

                // Adicionando evento de clique para o botão de editar
                const editarButton = row.querySelector('.editar');
                editarButton.addEventListener('click', () => abrirModalEditar(produto));

                // Adicionando evento de clique para o botão de excluir
                const excluirButton = row.querySelector('.excluir');
                excluirButton.addEventListener('click', () => excluirProduto(produto.id));

                produtosBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os produtos:', error);
        });

    // Função para abrir modal de edição
    function abrirModalEditar(produto) {
        // Exibe o modal
        modal.style.display = 'block';

        // Preenche os campos do modal com os dados do produto
        document.getElementById('nome').value = produto.nome;
        document.getElementById('valor').value = produto.valor;
        document.getElementById('quantidade').value = produto.quantidadeEstoque;
        document.getElementById('observacao').value = produto.observacao;
        document.getElementById('data').value= produto.dataCadastro;

        // Adiciona evento de submit para o formulário
        formEditarProduto.addEventListener('submit', event => {
            event.preventDefault();
            enviarDadosEditados(produto.id);
        });
    }
// Adiciona evento de clique para fechar o modal de edição
document.querySelector('.modalEditarClose').addEventListener('click', function () {
    fecharModalEditar();
});

// Função para fechar modal de edição
function fecharModalEditar() {
    // Esconde o modal
    modal.style.display = 'none';
}


    // Função para enviar os dados editados
    function enviarDadosEditados(produtoId) {
        const nome = document.getElementById('nome').value;
        const valor = document.getElementById('valor').value;
        const quantidade = document.getElementById('quantidade').value;
        const observacao = document.getElementById('observacao').value;
        const datinha= document.getElementById('data').value;
        const tudo = {
            nome: nome,
            valor : valor,
            quantidadeEstoque: quantidade,
            observacao: observacao,
            dataCadastro: datinha,
        };

        fetch(`${url}/${produtoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tudo)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar o produto.');
            }
            // Realizar ações adicionais se necessário após a atualização do produto
            console.log('Produto atualizado com sucesso.');
            // Fechar o modal após a atualização bem-sucedida
            fecharModalEditar();
            
            location.reload(); 
        })
        .catch(error => {
            console.error('Erro ao atualizar o produto:', error);
            // Tratar erros e fornecer feedback ao usuário se necessário
        });
    }

    // Função para excluir o produto
    function excluirProduto(produtoId) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            fetch(`${url}/${produtoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir o produto.');
                }
                console.log('Produto excluído com sucesso.');
                location.reload(); // Recarrega a página após a exclusão bem-sucedida
            })
            .catch(error => {
                console.error('Erro ao excluir o produto:', error);
                // Tratar erros e fornecer feedback ao usuário se necessário
            });
        }
    }
});

// Get the modal
var modal = document.querySelector('.modal-contentLogout');

// Get the button that opens the modal
var btn = document.getElementById("logoutButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Logout function
function logout() {
    // Perform logout actions here
    alert("Logout successful!");
    // For example, redirect to login page:
    window.location.href = "login1.html";
}

// Confirm logout
document.getElementById("confirmLogout").addEventListener("click", logout);

// Definir os modais como fechados quando a página carregar
window.onload = function() {
    fecharModal();
    fecharModalEdit();
  };
  document.addEventListener('DOMContentLoaded', (event) => {
    const numberInput = document.querySelector('input[type="number"]');
  
    numberInput.addEventListener('wheel', (e) => {
      e.preventDefault(); // Impede o scroll da página
      const { deltaY } = e;
      const step = numberInput.getAttribute('step') || 1;
      let value = Number(numberInput.value);
  
      if (deltaY < 0) value += Number(step); // Scroll para cima aumenta o valor
      if (deltaY > 0) value -= Number(step); // Scroll para baixo diminui o valor
  
      numberInput.value = value; // Atualiza o valor do input
    });
  });