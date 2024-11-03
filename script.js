let entradas = 0.00;
let saidas = 0.00;
let total = 0.00;

function atualizarResumo() {
    document.getElementById('entradas').innerText = entradas.toFixed(2);
    document.getElementById('saidas').innerText = saidas.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
}

function adicionarRegistro() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;

    if (!descricao || isNaN(valor)) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const tabela = document.getElementById('tabelaRegistros');
    const novaLinha = document.createElement('tr');

    const colunaDescricao = document.createElement('td');
    colunaDescricao.textContent = descricao;
    novaLinha.appendChild(colunaDescricao);

    const colunaValor = document.createElement('td');
    colunaValor.textContent = `R$ ${valor.toFixed(2)}`;
    novaLinha.appendChild(colunaValor);

    const colunaTipo = document.createElement('td');
    const icon = document.createElement('span');
    icon.classList.add('icon');
    icon.classList.add(tipo === 'Entrada' ? 'up' : 'down');
    icon.textContent = tipo === 'Entrada' ? '⬆️' : '⬇️';
    colunaTipo.appendChild(icon);
    novaLinha.appendChild(colunaTipo);

    const colunaAcoes = document.createElement('td');
    const btnExcluir = document.createElement('span');
    btnExcluir.classList.add('icon');
    btnExcluir.textContent = '🗑️';
    btnExcluir.onclick = function () {
        removerRegistro(novaLinha, valor, tipo);
    };
    colunaAcoes.appendChild(btnExcluir);
    novaLinha.appendChild(colunaAcoes);

    tabela.appendChild(novaLinha);

    if (tipo === 'Entrada') {
        entradas += valor;
    } else {
        saidas += valor;
    }
    total = entradas - saidas;

    atualizarResumo();
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
}

function removerRegistro(linha, valor, tipo) {
    if (tipo === 'Entrada') {
        entradas -= valor;
    } else {
        saidas -= valor;
    }
    total = entradas - saidas;

    linha.remove();
    atualizarResumo();
}

function filtrarRegistros() {
    const filtro = document.getElementById('filtro').value;
    const tabela = document.getElementById('tabelaRegistros');
    const linhas = tabela.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        const tipoRegistro = linhas[i].getElementsByTagName('td')[2]?.innerText;
        if (filtro === 'todos' || tipoRegistro === filtro) {
            linhas[i].style.display = '';
        } else {
            linhas[i].style.display = 'none';
        }
    }
}

atualizarResumo();

