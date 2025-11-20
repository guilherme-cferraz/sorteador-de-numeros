//iniciando as variaveis
let quantidadeDeNumeros = 0;
let numeroMinimo = 0;
let numeroMaximo = 0;
let listaDeNumerosSorteados = [];

//habilitando o botão sortear ao carregar a página
document.getElementById('btn-sortear').removeAttribute('disabled');

//função para exibir texto na tela
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

//iniciando o campo de resultado
exibirTextoNaTela('#resultado label', 'Números sorteados:  nenhum até agora');

//função para sortear os números
function sortear() {
    quantidadeDeNumeros = document.getElementById('quantidade').value;
    numeroMinimo = document.getElementById('de').value;
    numeroMaximo = document.getElementById('ate').value;

    //validações dos campos
    if (quantidadeDeNumeros <= 0 || numeroMinimo >= numeroMaximo) {
        alert("Por favor, insira valores válidos.");
        return;
    } else {
        //verificando se o intervalo é suficiente para a quantidade de números solicitada
        if (numeroMaximo - numeroMinimo + 1 < quantidadeDeNumeros) {
            alert("Intervalo insuficiente para a quantidade solicitada de números.");
            return;
        } else {
            //sorteando os números
            while (quantidadeDeNumeros > 0) {
                let numeroSorteado = gerarNumeroAleatorio();
                quantidadeDeNumeros--;
            }
            //desabilitar botão de sortear, ordenando os números sorteados, exibindo os números sorteados na tela, habilitar botão de limpar
            document.getElementById('btn-sortear').setAttribute('disabled', true);
            listaDeNumerosSorteados.sort((a, b) => a - b);
            exibirTextoNaTela('#resultado label', 'Números sorteados:  ' + listaDeNumerosSorteados.join(', '));
            document.getElementById('btn-limpar').removeAttribute('disabled');
        }        
    }
}

//função para gerar número aleatório dentro do intervalo definido
function gerarNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * (numeroMaximo - numeroMinimo + 1)) + parseInt(numeroMinimo);
    //verificando se o número já foi sorteado
    if (listaDeNumerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroAleatorio);
        return numeroAleatorio;
    }
}

//função para limpar os campos e reiniciar o jogo
function limpar() {
    exibirTextoNaTela('#resultado label', 'Números sorteados:  nenhum até agora');
    listaDeNumerosSorteados = [];
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('btn-limpar').setAttribute('disabled', true);
    document.getElementById('btn-sortear').removeAttribute('disabled');
}