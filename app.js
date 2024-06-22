let listaDeNumerosSorteados = [];
const limite = 10;

function exibirTexto(tag, txt) {
    let campo = document.querySelector(tag);
    campo.innerHTML = txt;
    responsiveVoice.speak(txt, "Brazilian Portuguese Female", { rate: 1.2 });
}

function gerarNumeroPAleatorio() {
    if (listaDeNumerosSorteados.length === limite) {
        listaDeNumerosSorteados = []; // Limpa a lista se atingir o limite
    }

    let numeroEscolhido = Math.floor(Math.random() * limite) + 1;

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        organizar();
        return gerarNumeroPAleatorio(); // Tenta novamente se o número já foi escolhido
    } else {
        organizar();
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log("Lista de números sorteados:", listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function mensagemInicial() {
    exibirTexto("h1", "Jogo número secreto");
    exibirTexto("p", `Escolha um número entre 1 e ${limite}`);
}

let numeroSecreto = gerarNumeroPAleatorio();
let tentativas = 0;

function verificarChute() {
    let chute = parseInt(document.querySelector("input").value);

    if (chute === numeroSecreto) {
        exibirTexto("h1", "Acertou");
        if (tentativas === 0) { tentativas = 1; }
        exibirTexto("p", `Você descobriu o número secreto em ${tentativas} tentativas`);
        console.log(`Número secreto: ${numeroSecreto}, Chute: ${chute}`);
        tentativas = 0;
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        tentativas++;
        if (chute > numeroSecreto) {
            exibirTexto("p", `Errou, o número secreto é menor que ${chute}. Tentativas: ${tentativas}`);
        } else {
            exibirTexto("p", `Errou, o número secreto é maior que ${chute}. Tentativas: ${tentativas}`);
        }
        console.log(`Número secreto: ${numeroSecreto}, Chute: ${chute}`);
        limparCampo();
    }
}

function organizar() {
    listaDeNumerosSorteados.sort((a, b) => a - b);
    console.log("Lista organizada:", listaDeNumerosSorteados);
}

function limparCampo() {
    let chute = document.querySelector(".container__input");
    chute.value = "";
}

function reiniciarjogo() {
    limparCampo();
    numeroSecreto = gerarNumeroPAleatorio();
    tentativas = 0;
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

// Chamada inicial
mensagemInicial();
