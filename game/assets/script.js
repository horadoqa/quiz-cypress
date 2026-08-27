const perguntas = [
  {
    pergunta: "O que é o Cypress?",
    opcoes: [
      "Uma linguagem de programação",
      "Um framework para testes automatizados",
      "Um banco de dados",
      "Um sistema operacional"
    ],
    correta: 1
  },

  {
    pergunta: "Qual comando é utilizado para encontrar um elemento pelo seletor?",
    opcoes: [
      "cy.find()",
      "cy.element()",
      "cy.get()",
      "cy.select()"
    ],
    correta: 2
  },

  {
    pergunta: "Qual comando é utilizado para clicar em um elemento?",
    opcoes: [
      "cy.click()",
      "cy.press()",
      "cy.button()",
      "cy.tap()"
    ],
    correta: 0
  },

  {
    pergunta: "Qual comando é utilizado para digitar texto em um campo?",
    opcoes: [
      "cy.write()",
      "cy.type()",
      "cy.input()",
      "cy.fill()"
    ],
    correta: 1
  },

  {
    pergunta: "Qual comando é utilizado para limpar o conteúdo de um campo?",
    opcoes: [
      "cy.clear()",
      "cy.delete()",
      "cy.remove()",
      "cy.reset()"
    ],
    correta: 0
  },

  {
    pergunta: "Qual comando é utilizado para selecionar uma opção de um elemento <select>?",
    opcoes: [
      "cy.option()",
      "cy.choose()",
      "cy.select()",
      "cy.pick()"
    ],
    correta: 2
  },

  {
    pergunta: "Qual assertion verifica se um elemento está visível?",
    opcoes: [
      "should('be.visible')",
      "should('be.display')",
      "should('visible')",
      "should('exist.visible')"
    ],
    correta: 0
  },

  {
    pergunta: "Qual assertion verifica se um elemento existe no DOM?",
    opcoes: [
      "should('be.exist')",
      "should('exist')",
      "should('have.element')",
      "should('be.present')"
    ],
    correta: 1
  },

  {
    pergunta: "Qual assertion verifica o texto de um elemento?",
    opcoes: [
      "should('have.text')",
      "should('text')",
      "should('contain')",
      "should('be.text')"
    ],
    correta: 0
  },

  {
    pergunta: "Qual comando é utilizado para fazer uma requisição HTTP?",
    opcoes: [
      "cy.http()",
      "cy.fetch()",
      "cy.request()",
      "cy.api()"
    ],
    correta: 2
  },

  {
    pergunta: "Qual comando permite interceptar requisições HTTP?",
    opcoes: [
      "cy.intercept()",
      "cy.requestIntercept()",
      "cy.spyRequest()",
      "cy.network()"
    ],
    correta: 0
  },

  {
    pergunta: "Para que serve o cy.fixture()?",
    opcoes: [
      "Para criar screenshots",
      "Para carregar dados de arquivos de fixture",
      "Para executar comandos do terminal",
      "Para abrir uma nova aba"
    ],
    correta: 1
  },

  {
    pergunta: "Qual comando é utilizado para criar um alias no Cypress?",
    opcoes: [
      "cy.alias()",
      "cy.as()",
      "cy.name()",
      "cy.reference()"
    ],
    correta: 1
  },

  {
    pergunta: "Qual comando é utilizado para acessar um alias criado anteriormente?",
    opcoes: [
      "cy.alias()",
      "cy.get('@nome')",
      "cy.reference('@nome')",
      "cy.use('@nome')"
    ],
    correta: 1
  },

  {
    pergunta: "Qual hook é executado antes de cada teste?",
    opcoes: [
      "before()",
      "beforeEach()",
      "beforeTest()",
      "setup()"
    ],
    correta: 1
  },

  {
    pergunta: "Qual hook é executado depois de cada teste?",
    opcoes: [
      "afterEach()",
      "afterTest()",
      "after()",
      "cleanupEach()"
    ],
    correta: 0
  },

  {
    pergunta: "Qual comando é utilizado para tirar um screenshot?",
    opcoes: [
      "cy.capture()",
      "cy.image()",
      "cy.screenshot()",
      "cy.screen()"
    ],
    correta: 2
  },

  {
    pergunta: "Qual arquivo é utilizado para configurar o Cypress nas versões atuais?",
    opcoes: [
      "cypress.settings.js",
      "cypress.config.js",
      "config.cypress.js",
      "cypress.setup.js"
    ],
    correta: 1
  },

  {
    pergunta: "Qual comando é utilizado para abrir uma URL no Cypress?",
    opcoes: [
      "cy.open()",
      "cy.url()",
      "cy.visit()",
      "cy.navigate()"
    ],
    correta: 2
  },

  {
    pergunta: "Qual comando permite acessar o contexto JavaScript da aplicação?",
    opcoes: [
      "cy.execute()",
      "cy.browser()",
      "cy.window()",
      "cy.js()"
    ],
    correta: 2
  }
];


/* =====================================================
   EMBARALHAR ARRAY
   ===================================================== */

function embaralhar(array) {
  const copia = [...array];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}


/* =====================================================
   CRIAR NOVA PARTIDA
   ===================================================== */

function criarPerguntasDaPartida() {

  return embaralhar(perguntas).map(pergunta => {

    // Guarda a resposta correta original
    const respostaCorreta = pergunta.opcoes[pergunta.correta];

    // Embaralha as alternativas
    const opcoesEmbaralhadas = embaralhar(pergunta.opcoes);

    // Descobre a nova posição da resposta correta
    const novaPosicaoCorreta =
      opcoesEmbaralhadas.indexOf(respostaCorreta);

    return {
      pergunta: pergunta.pergunta,
      opcoes: opcoesEmbaralhadas,
      correta: novaPosicaoCorreta
    };

  });

}


/* =====================================================
   VARIÁVEIS DO QUIZ
   ===================================================== */

let indiceAtual = 0;
let pontuacao = 0;

let perguntasDaPartida = criarPerguntasDaPartida();


/* =====================================================
   ELEMENTOS HTML
   ===================================================== */

const elPergunta = document.getElementById('pergunta');
const elOpcoes = document.getElementById('opcoes');
const elContador = document.getElementById('contador');
const elFeedback = document.getElementById('feedback');
const elProximaBtn = document.getElementById('proxima-btn');

const elTelaQuiz = document.getElementById('tela-quiz');
const elTelaResultado = document.getElementById('tela-resultado');

const elPontuacaoFinal = document.getElementById('pontuacao-final');
const elMensagemFinal = document.getElementById('mensagem-final');

const elReiniciarBtn = document.getElementById('reiniciar-btn');


/* =====================================================
   CARREGAR PERGUNTA
   ===================================================== */

function carregarPergunta() {

  const atual = perguntasDaPartida[indiceAtual];

  // Disponibiliza informações da pergunta atual para os testes
  window.quizAtual = {
    pergunta: atual.pergunta,
    correta: atual.correta,
    respostaCorreta: atual.opcoes[atual.correta]
  };

  elContador.textContent =
    `Pergunta ${indiceAtual + 1} de ${perguntasDaPartida.length}`;

  elPergunta.textContent = atual.pergunta;

  elFeedback.textContent = '';
  elFeedback.className = '';

  elProximaBtn.style.display = 'none';

  elOpcoes.innerHTML = '';


  /* =====================================================
     CRIAR BOTÕES DAS ALTERNATIVAS
     ===================================================== */

  atual.opcoes.forEach((opcao, i) => {

    const btn = document.createElement('button');

    btn.className = 'resposta-btn';

    btn.textContent = opcao;

    btn.setAttribute('data-index', i);

    btn.addEventListener('click', () => responder(i));

    elOpcoes.appendChild(btn);

  });

}


/* =====================================================
   RESPONDER PERGUNTA
   ===================================================== */

function responder(indiceEscolhido) {

  const atual = perguntasDaPartida[indiceAtual];

  console.log("================================");
  console.log("Pergunta:", atual.pergunta);
  console.log("Alternativas:", atual.opcoes);
  console.log("Índice escolhido:", indiceEscolhido);
  console.log("Índice correto:", atual.correta);
  console.log("Resposta correta:", atual.opcoes[atual.correta]);

  const botoes =
    document.querySelectorAll('.resposta-btn');


  /* Desabilita todas as alternativas */

  botoes.forEach(btn => {
    btn.disabled = true;
  });


  /* =====================================================
     RESPOSTA CORRETA
     ===================================================== */

  if (indiceEscolhido === atual.correta) {

    pontuacao++;

    elFeedback.textContent = 'Correto!';

    elFeedback.className = 'acerto';

    botoes[indiceEscolhido]
      .classList.add('correta');

  }


  /* =====================================================
     RESPOSTA ERRADA
     ===================================================== */

  else {

    elFeedback.textContent =
      `Errado! A resposta certa era: ${atual.opcoes[atual.correta]}`;

    elFeedback.className = 'erro';

    botoes[indiceEscolhido]
      .classList.add('errada');

    botoes[atual.correta]
      .classList.add('correta');

  }


  /* Mostra botão próxima pergunta */

  elProximaBtn.style.display = 'block';

}


/* =====================================================
   PRÓXIMA PERGUNTA
   ===================================================== */

elProximaBtn.addEventListener('click', () => {

  indiceAtual++;

  if (indiceAtual < perguntasDaPartida.length) {

    carregarPergunta();

  } else {

    mostrarResultado();

  }

});


/* =====================================================
   MOSTRAR RESULTADO
   ===================================================== */

function mostrarResultado() {

  elTelaQuiz.style.display = 'none';

  elTelaResultado.style.display = 'block';


  elPontuacaoFinal.textContent =
    `${pontuacao} / ${perguntasDaPartida.length}`;


  let mensagem;


  if (pontuacao === perguntasDaPartida.length) {

    mensagem = 'Excelente! Você acertou tudo!';

  }

  else if (pontuacao >= perguntasDaPartida.length / 2) {

    mensagem = 'Muito bom! Continue assim.';

  }

  else {

    mensagem = 'Continue estudando e tente novamente!';

  }


  elMensagemFinal.textContent = mensagem;

  elReiniciarBtn.style.display = 'block';

}


/* =====================================================
   REINICIAR QUIZ
   ===================================================== */

elReiniciarBtn.addEventListener('click', () => {

  indiceAtual = 0;

  pontuacao = 0;


  /* =====================================================
     GERA UMA NOVA ORDEM DE PERGUNTAS E ALTERNATIVAS
     ===================================================== */

  perguntasDaPartida = criarPerguntasDaPartida();


  elTelaResultado.style.display = 'none';

  elTelaQuiz.style.display = 'block';


  carregarPergunta();

});


/* =====================================================
   INICIAR QUIZ
   ===================================================== */

carregarPergunta();