/// <reference types="cypress" />

// Casos de teste do Quiz de Cypress.
// O Cypress acessa o jogo através de um servidor local (npm run start),
// que serve o arquivo index.html em http://localhost:8080.

describe('Quiz de Cypress', () => {

  beforeEach(() => {
    cy.visit('/');
  });


  // =====================================================
  // CT01 - CARREGAMENTO
  // =====================================================

  it('CT01 - Carregar o quiz deve exibir a primeira pergunta e 4 opções', () => {

    cy.get('#contador')
      .should('have.text', 'Pergunta 1 de 20');

    cy.get('.resposta-btn')
      .should('have.length', 4);

    cy.get('#pergunta')
      .should('not.be.empty');

  });


  // =====================================================
  // CT02 - RESPONDER CORRETAMENTE
  // =====================================================

  it('CT02 - Responder corretamente deve exibir mensagem de acerto', () => {

    // Como as perguntas são aleatórias, descobrimos
    // qual é a pergunta que foi carregada.

    cy.get('#pergunta').invoke('text').then((pergunta) => {

      let respostaCorreta;

      switch (pergunta) {

        case 'O que é o Cypress?':
          respostaCorreta = 'Um framework para testes automatizados';
          break;

        case 'Qual comando é utilizado para encontrar um elemento pelo seletor?':
          respostaCorreta = 'cy.get()';
          break;

        case 'Qual comando é utilizado para clicar em um elemento?':
          respostaCorreta = 'cy.click()';
          break;

        case 'Qual comando é utilizado para digitar texto em um campo?':
          respostaCorreta = 'cy.type()';
          break;

        case 'Qual comando é utilizado para limpar o conteúdo de um campo?':
          respostaCorreta = 'cy.clear()';
          break;

        case 'Qual comando é utilizado para selecionar uma opção de um elemento <select>?':
          respostaCorreta = 'cy.select()';
          break;

        case 'Qual assertion verifica se um elemento está visível?':
          respostaCorreta = "should('be.visible')";
          break;

        case 'Qual assertion verifica se um elemento existe no DOM?':
          respostaCorreta = "should('exist')";
          break;

        case 'Qual assertion verifica o texto de um elemento?':
          respostaCorreta = "should('have.text')";
          break;

        case 'Qual comando é utilizado para fazer uma requisição HTTP?':
          respostaCorreta = 'cy.request()';
          break;

        case 'Qual comando permite interceptar requisições HTTP?':
          respostaCorreta = 'cy.intercept()';
          break;

        case 'Para que serve o cy.fixture()?':
          respostaCorreta = 'Para carregar dados de arquivos de fixture';
          break;

        case 'Qual comando é utilizado para criar um alias no Cypress?':
          respostaCorreta = 'cy.as()';
          break;

        case 'Qual comando é utilizado para acessar um alias criado anteriormente?':
          respostaCorreta = "cy.get('@nome')";
          break;

        case 'Qual hook é executado antes de cada teste?':
          respostaCorreta = 'beforeEach()';
          break;

        case 'Qual hook é executado depois de cada teste?':
          respostaCorreta = 'afterEach()';
          break;

        case 'Qual comando é utilizado para tirar um screenshot?':
          respostaCorreta = 'cy.screenshot()';
          break;

        case 'Qual arquivo é utilizado para configurar o Cypress nas versões atuais?':
          respostaCorreta = 'cypress.config.js';
          break;

        case 'Qual comando é utilizado para abrir uma URL no Cypress?':
          respostaCorreta = 'cy.visit()';
          break;

        case 'Qual comando permite executar código JavaScript dentro do navegador?':
          respostaCorreta = 'cy.window()';
          break;

        default:
          throw new Error(`Pergunta não reconhecida: ${pergunta}`);
      }


      // Encontra a alternativa pelo texto,
      // independentemente da posição.

      cy.contains('.resposta-btn', respostaCorreta)
        .click();

    });


    cy.get('#feedback')
      .should('have.text', 'Correto!')
      .and('have.class', 'acerto');

  });


  // =====================================================
  // CT03 - RESPONDER INCORRETAMENTE
  // =====================================================

  it('CT03 - Responder incorretamente deve exibir a resposta certa', () => {

    cy.get('#pergunta').invoke('text').then((pergunta) => {

      const respostasCorretas = {

        'O que é o Cypress?':
          'Um framework para testes automatizados',

        'Qual comando é utilizado para encontrar um elemento pelo seletor?':
          'cy.get()',

        'Qual comando é utilizado para clicar em um elemento?':
          'cy.click()',

        'Qual comando é utilizado para digitar texto em um campo?':
          'cy.type()',

        'Qual comando é utilizado para limpar o conteúdo de um campo?':
          'cy.clear()',

        'Qual comando é utilizado para selecionar uma opção de um elemento <select>?':
          'cy.select()',

        'Qual assertion verifica se um elemento está visível?':
          "should('be.visible')",

        'Qual assertion verifica se um elemento existe no DOM?':
          "should('exist')",

        'Qual assertion verifica o texto de um elemento?':
          "should('have.text')",

        'Qual comando é utilizado para fazer uma requisição HTTP?':
          'cy.request()',

        'Qual comando permite interceptar requisições HTTP?':
          'cy.intercept()',

        'Para que serve o cy.fixture()?':
          'Para carregar dados de arquivos de fixture',

        'Qual comando é utilizado para criar um alias no Cypress?':
          'cy.as()',

        'Qual comando é utilizado para acessar um alias criado anteriormente?':
          "cy.get('@nome')",

        'Qual hook é executado antes de cada teste?':
          'beforeEach()',

        'Qual hook é executado depois de cada teste?':
          'afterEach()',

        'Qual comando é utilizado para tirar um screenshot?':
          'cy.screenshot()',

        'Qual arquivo é utilizado para configurar o Cypress nas versões atuais?':
          'cypress.config.js',

        'Qual comando é utilizado para abrir uma URL no Cypress?':
          'cy.visit()',

        'Qual comando permite executar código JavaScript dentro do navegador?':
          'cy.window()'
      };


      const respostaCorreta = respostasCorretas[pergunta];


      // Pega uma alternativa que NÃO seja a correta.

      cy.get('.resposta-btn')
        .not(`:contains("${respostaCorreta}")`)
        .first()
        .click();


      cy.get('#feedback')
        .should('contain.text', 'Errado')
        .and('contain.text', respostaCorreta)
        .and('have.class', 'erro');

    });

  });


  // =====================================================
  // CT04 - FINALIZAR AS 20 PERGUNTAS
  // =====================================================

  it('CT04 - Concluir todas as 20 perguntas deve exibir a tela de resultado', () => {

    for (let i = 0; i < 20; i++) {

      cy.get('.resposta-btn')
        .first()
        .click();

      cy.get('#proxima-btn')
        .click();

    }


    cy.get('#tela-resultado')
      .should('be.visible');

    cy.get('#tela-quiz')
      .should('not.be.visible');

  });


  // =====================================================
  // CT05 - ACERTAR TODAS
  // =====================================================

  // =====================================================
  // CT05 - ACERTAR TODAS
  // =====================================================

  it('CT05 - Acertar todas as perguntas deve exibir mensagem de nota máxima', () => {

    const responderTodas = (indice) => {

      if (indice >= 20) {
        return;
      }

      // Obtém a posição da resposta correta
      cy.window().then((win) => {

        const indiceCorreto = win.quizAtual.correta;

        cy.get('.resposta-btn')
          .eq(indiceCorreto)
          .should('be.visible')
          .and('be.enabled')
          .click();

      });

      // Confirma que acertou
      cy.get('#feedback')
        .should('have.text', 'Correto!')
        .and('have.class', 'acerto');

      // Vai para a próxima pergunta
      cy.get('#proxima-btn')
        .should('be.visible')
        .and('be.enabled')
        .click();

      // Aguarda a próxima pergunta ser carregada
      if (indice < 19) {

        cy.get('#contador')
          .should('have.text', `Pergunta ${indice + 2} de 20`);

        responderTodas(indice + 1);

      }

    };

    responderTodas(0);

    // Resultado final
    cy.get('#tela-resultado')
      .should('be.visible');

    cy.get('#pontuacao-final')
      .should('have.text', '20 / 20');

    cy.get('#mensagem-final')
      .should('have.text', 'Excelente! Você acertou tudo!');

  });


  // =====================================================
  // CT06 - ERRAR TODAS
  // =====================================================

  it('CT06 - Errar todas as perguntas deve exibir mensagem de incentivo', () => {

    const responderTodas = (indice) => {

      if (indice >= 20) {
        return;
      }

      // Obtém a posição da resposta correta
      cy.window().then((win) => {

        const indiceCorreto = win.quizAtual.correta;

        // Escolhe uma alternativa diferente da correta
        const indiceErrado =
          indiceCorreto === 0 ? 1 : 0;

        cy.get('.resposta-btn')
          .eq(indiceErrado)
          .should('be.visible')
          .and('be.enabled')
          .click();

      });

      // Confirma que a resposta foi considerada errada
      cy.get('#feedback')
        .should('contain.text', 'Errado')
        .and('have.class', 'erro');

      // Vai para a próxima pergunta
      cy.get('#proxima-btn')
        .should('be.visible')
        .and('be.enabled')
        .click();

      // Aguarda a próxima pergunta ser carregada
      if (indice < 19) {

        cy.get('#contador')
          .should('have.text', `Pergunta ${indice + 2} de 20`);

        responderTodas(indice + 1);

      }

    };

    responderTodas(0);

    // Resultado final
    cy.get('#tela-resultado')
      .should('be.visible');

    cy.get('#pontuacao-final')
      .should('have.text', '0 / 20');

    cy.get('#mensagem-final')
      .should('have.text', 'Continue estudando e tente novamente!');

  });


  // =====================================================
  // CT07 - REINICIAR
  // =====================================================

  it('CT07 - Botão "Jogar novamente" deve reiniciar o quiz do zero', () => {

    for (let i = 0; i < 20; i++) {

      cy.get('.resposta-btn')
        .first()
        .click();

      cy.get('#proxima-btn')
        .click();

    }


    cy.get('#tela-resultado')
      .should('be.visible');


    cy.get('#reiniciar-btn')
      .click();


    cy.get('#contador')
      .should('have.text', 'Pergunta 1 de 20');

    cy.get('#tela-quiz')
      .should('be.visible');

    cy.get('#tela-resultado')
      .should('not.be.visible');

    cy.get('.resposta-btn')
      .should('have.length', 4);

  });

});