let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function atualizarCarrinho() {
    let carrinhoBody = document.getElementById('carrinho-list');
    carrinhoBody.innerHTML = '';

    carrinho.forEach((item, indice) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.item}</td>
            <td>R$ ${item.valor.toFixed(2)}</td>
        `;
        carrinhoBody.appendChild(tr);
    });

    atualizarValorTotal();
}

function atualizarValorTotal() {
    let valorTotal = carrinho.reduce((total, item) => total + item.valor, 0);
    document.getElementById('valor-total').textContent = `Valor Total: R$ ${valorTotal.toFixed(2)}`;
}

function finalizarPedido() {
    // Aqui você pode implementar a lógica para finalizar o pedido,
    // como enviar os dados do pedido para um servidor ou exibir uma mensagem de confirmação.
    alert("Pedido finalizado com sucesso!");

    // Limpar o carrinho após finalizar o pedido
    localStorage.removeItem('carrinho');
    window.location.href = 'index.html'; // Redirecionar de volta para a página inicial
}

// Inicialização da página de finalização
document.addEventListener('DOMContentLoaded', atualizarCarrinho);
