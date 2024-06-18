let listaDeCompras = JSON.parse(localStorage.getItem('listaDeCompras')) || [];
let indiceEdicao = -1;

function salvarLista() {
    localStorage.setItem('listaDeCompras', JSON.stringify(listaDeCompras));
}

function limparForm() {
    document.getElementById('item').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('descricao').value ='';
    indiceEdicao = -1;
    document.getElementById('salvar').style.display = 'none';
    document.getElementById('adicionar').style.display = 'inline-block';
}

function validaForm() {
    let item = document.getElementById('item').value;
    let valor = parseFloat(document.getElementById('valor').value);
    if (!item || isNaN(valor)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return false;
    } else {
        return true;
    }
}

function create() {
    if (validaForm()) {
        let item = document.getElementById('item').value;
        let valor = parseFloat(document.getElementById('valor').value);
        let descricao = document.getElementById('descricao').value;

        if (indiceEdicao >= 0) {
            listaDeCompras[indiceEdicao] = { item, valor, descricao};
            indiceEdicao = -1;
        } else {
            listaDeCompras.push({ item, valor, descricao});
        }

        salvarLista();
        limparForm();
        atualizarTabela();
    }
}

function editarItem(indice) {
    let obj = listaDeCompras[indice];
    document.getElementById('item').value = obj.item;
    document.getElementById('valor').value = obj.valor;
    document.getElementById('descricao').value = obj.descricao;
    indiceEdicao = indice;
    document.getElementById('salvar').style.display = 'inline-block';
    document.getElementById('adicionar').style.display = 'none';
    destacarLinha(indice);
}

function excluirItem(indice) {
    if (confirm(`Tem certeza que deseja excluir o item ${listaDeCompras[indice].item}?`)) {
        listaDeCompras.splice(indice, 1);
        salvarLista();
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
            <td>
                <button onclick="editarItem(${indice})" class="btn btn-primary me-2">Editar</button>
                <button onclick="excluirItem(${indice})" class="btn btn-secondary">Excluir</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    atualizarValorTotal();
}

function atualizarValorTotal() {
    let valorTotal = listaDeCompras.reduce((total, item) => total + item.valor, 0);
    document.getElementById('valor-total').textContent = `Valor Total: R$ ${valorTotal.toFixed(2)}`;
}

function destacarLinha(indice) {
    const rows = document.querySelectorAll('#item-list tr');
    rows.forEach((row, i) => {
        row.classList.toggle('editing', i === indice);
    });
}

// Inicialização da tabela
atualizarTabela();
