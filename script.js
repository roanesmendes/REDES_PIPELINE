// Funções para verificar respostas (já implementadas)
function verificarResposta1() {
    const resposta = document.getElementById("respostaDesafio1").value;
    const respostaCorreta = "::ffff:c0a8:0164"; // Exemplo de resposta correta

    if (resposta === respostaCorreta) {
        alert("Resposta correta! Parabéns!");
        recompensas[0].conquistar();
    } else {
        alert("Resposta incorreta. Tente novamente.");
    }
}

function verificarResposta2() {
    const resposta = document.getElementById("respostaDesafio2").value;
    const respostaCorreta = "cabo-par-trançado";

    if (resposta === respostaCorreta) {
        alert("Resposta correta! Parabéns!");
        recompensas[1].conquistar();
    } else {
        alert("Resposta incorreta. Tente novamente.");
    }
}

function verificarResposta3() {
    const resposta = document.getElementById("respostaDesafio3").value;
    const respostaCorreta = "tcp";

    if (resposta === respostaCorreta) {
        alert("Resposta correta! Parabéns!");
        recompensas[2].conquistar();
    } else {
        alert("Resposta incorreta. Tente novamente.");
    }
}

// Classe para representar uma recompensa
class Recompensa {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
        this.conquistada = false;
    }

    conquistar() {
        this.conquistada = true;
        atualizarRecompensas();
    }
}

// Lista de recompensas
const recompensas = [
    new Recompensa("Mestre do IPv6", "Complete o desafio IPv6"),
    new Recompensa("Especialista em Ethernet", "Responda corretamente ao desafio Ethernet"),
    new Recompensa("Guru do TCP/UDP", "Acerte o desafio TCP/UDP"),
    new Recompensa("Explorador da Rede", "Complete todos os desafios"),
];

// Função para atualizar a lista de recompensas
function atualizarRecompensas() {
    const listaRecompensas = document.getElementById("recompensas");
    listaRecompensas.innerHTML = "";

    recompensas.forEach(recompensa => {
        const liRecompensa = document.createElement("li");

        const spanNome = document.createElement("span");
        spanNome.classList.add("recompensa-nome");
        spanNome.textContent = recompensa.nome;

        const spanDescricao = document.createElement("span");
        spanDescricao.classList.add("recompensa-descricao");
        spanDescricao.textContent = recompensa.conquistada ? "(Conquistada)" : "";

        liRecompensa.appendChild(spanNome);
        liRecompensa.appendChild(spanDescricao);

        if (recompensa.conquistada) {
            liRecompensa.classList.add("recompensa-conquistada");

            const estrela = document.createElement("span");
            estrela.classList.add("estrela");
            estrela.textContent = "★";
            liRecompensa.appendChild(estrela);
        }

        listaRecompensas.appendChild(liRecompensa);
    });
}

// Função para verificar se todos os desafios foram concluídos
function desafiosConcluidos() {
    return recompensas.every(recompensa => recompensa.conquistada);
}

// Função para desbloquear a recompensa "Explorador da Rede"
function desbloquearExploradorDaRede() {
    if (desafiosConcluidos()) {
        const recompensaExplorador = recompensas.find(recompensa => recompensa.nome === "Explorador da Rede");
        recompensaExplorador.conquistar();
    }
}

// Inicialização das recompensas
atualizarRecompensas();

// Implementar o código do jogo (exemplo)
const jogo = document.querySelector(".jogo");

const perguntas = [
    {
        pergunta: "Qual o endereço IPv6 equivalente ao endereço IPv4 192.168.1.100?",
        respostaCorreta: "::ffff:c0a8:0164",
        opcoes: [
            "::ffff:c0a8:0164",
            "::ffff:c0a8:0163",
            "::ffff:c0a8:0162",
            "::ffff:c0a8:0161",
        ],
    },
    {
        pergunta: "Qual o tipo de cabo Ethernet mais comum usado em residências?",
        respostaCorreta: "cabo-par-trançado",
        opcoes: [
            "cabo-coaxial",
            "cabo-óptico",
            "fio-de-cobre",
            "cabo-par-trançado",
        ],
    },
    {
        pergunta: "Qual protocolo é mais adequado para um aplicativo de chat online?",
        respostaCorreta: "tcp",
        opcoes: [
            "udp",
            "http",
            "ftp",
            "tcp",
        ],
    },
];

let perguntaAtual = 0;
let score = 0;

function exibirPergunta() {
    if (perguntaAtual >= perguntas.length) {
        jogo.innerHTML = `<h2>Parabéns! Você completou o jogo! Pontuação Final: ${score} de ${perguntas.length}</h2>`;
        desbloquearExploradorDaRede();
        return;
    }

    const pergunta = perguntas[perguntaAtual];

    jogo.innerHTML = `
        <h3>Pergunta ${perguntaAtual + 1} de ${perguntas.length}</h3>
        <p>${pergunta.pergunta}</p>
        <ul>`;

    pergunta.opcoes.forEach(opcao => {
        jogo.innerHTML += `<li><button onclick="verificarRespostaJogo('${opcao}')">${opcao}</button></li>`;
    });

    jogo.innerHTML += `</ul>`;
}

function verificarRespostaJogo(resposta) {
    const pergunta = perguntas[perguntaAtual];

    if (resposta === pergunta.respostaCorreta) {
        score++;
        alert("Parabéns, você acertou!");
    } else {
        alert("Resposta incorreta. Tente novamente!");
    }

    perguntaAtual++;
    exibirPergunta();
}

exibirPergunta(); // Exibe a primeira pergunta
