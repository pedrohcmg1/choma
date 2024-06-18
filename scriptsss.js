let listaDeCompras = JSON.parse(localStorage.getItem('listaDeCompras')) || [];
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let indiceEdicao = -1;

function salvarLista() {
    localStorage.setItem('listaDeCompras', JSON.stringify(listaDeCompras));
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function limparForm() {
    document.getElementById('item').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('descricao').value = '';
    indiceEdicao = -1;
}

function create() {
    if (validaForm()) {
        let item = document.getElementById('item').value;
        let valor = parseFloat(document.getElementById('valor').value);
        let descricao = document.getElementById('descricao').value;

        if (indiceEdicao >= 0) {
            listaDeCompras[indiceEdicao] = { item, valor, descricao };
            indiceEdicao = -1;
        } else {
            listaDeCompras.push({ item, valor, descricao });
        }

        salvarLista();
        limparForm();
        atualizarTabela();
    }
}

function atualizarTabela() {
    let tableBody = document.getElementById('item-list');
    tableBody.innerHTML = '';

    listaDeCompras.forEach((item, indice) => {
        let tr = document.createElement('tr');
        tr.classList.toggle('editing', indice === indiceEdicao);
        tr.innerHTML = `
            <td>${item.item}</td>
            <td>R$ ${item.valor.toFixed(2)}</td>
            <td>${item.descricao}</td>
            <td><button onclick="adicionarAoCarrinho(${indice})" class="btn btn-primary me-2">Comprar</button></td>
        `;
        tableBody.appendChild(tr);
    });

    atualizarCarrinho();
}

function atualizarCarrinho() {
    let carrinhoBody = document.getElementById('carrinho-list');
    carrinhoBody.innerHTML = '';

    carrinho.forEach((item, indice) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.item}</td>
            <td>R$ ${item.valor.toFixed(2)}</td>
            <td><button onclick="removerDoCarrinho(${indice})" class="btn btn-danger">Remover</button></td>
        `;
        carrinhoBody.appendChild(tr);
    });

    atualizarValorTotal();
}

function adicionarAoCarrinho(indice) {
    let item = listaDeCompras[indice];
    carrinho.push(item);

    salvarLista();
    atualizarCarrinho();
}

function removerDoCarrinho(indice) {
    carrinho.splice(indice, 1);

    salvarLista();
    atualizarCarrinho();
}

function atualizarValorTotal() {
    let valorTotal = carrinho.reduce((total, item) => total + item.valor, 0);
    document.getElementById('valor-total').textContent = `Valor Total: R$ ${valorTotal.toFixed(2)}`;
}

function finalizarCompra() {
    window.location.href = 'checkout.html';
}

function destacarLinha(indice) {
    const rows = document.querySelectorAll('#item-list tr');
    rows.forEach((row, i) => {
        row.classList.toggle('editing', i === indice);
    });
}

// Inicialização da tabela
atualizarTabela();
