
let acertos;
let niveis, perguntas, idQuiz;

function responderQuiz(id) {
    // Monta a tela 2 
    const promiseQuiz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);

    promiseQuiz.then((resposta) => {
        
        const quiz = resposta.data;
        perguntas = quiz.questions;
        niveis = quiz.levels;
        idQuiz = id;
        acertos = 0;

        
        document.querySelector(`.quiz-titulo`).style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url("${quiz.image}")`;
        document.querySelector(`.quiz-titulo h3`).innerHTML = quiz.title;

        for(let i = 0; i < perguntas.length; i++) {

            const respostas = perguntas[i].answers;
            const numeroRespostas = respostas.length;
            
            document.querySelector(`#tela-2`).innerHTML += `
            <!-- Pergunta -->
            <div class="quiz-pergunta" id="pergunta-${i}">
              <div class="quiz-pergunta-titulo" style=background-color:${perguntas[i].color}>
                <h3>${perguntas[i].title}</h3>
              </div>
              <!-- Respostas -->
              <div class="quiz-pergunta-respostas">
                <!-- resposta 1 -->
                <div class="quiz-pergunta-resposta" onclick="selecionarResposta(this)" data-resposta="certa">
                  <img>
                  <span></span>
                </div>
                <!-- resposta 2 -->
                <div class="quiz-pergunta-resposta" onclick="selecionarResposta(this)" data-resposta="errada">
                  <img>
                  <span></span>
                </div>
                <!-- resposta 3 -->
                <div class="quiz-pergunta-resposta" onclick="selecionarResposta(this)" data-resposta="errada">
                  <img>
                  <span></span>
                </div>
                <!-- resposta 4 -->
                <div class="quiz-pergunta-resposta" onclick="selecionarResposta(this)" data-resposta="errada">
                  <img>
                  <span></span>
                </div>
              </div>
            </div>
            `
            

            let elementosResposta = document.querySelectorAll(`#pergunta-${i} .quiz-pergunta-resposta`);

            for(let j = 0; j < numeroRespostas; j++) {
                elementosResposta[j].querySelector(`span`).innerHTML = respostas[j].text;
                elementosResposta[j].querySelector(`img`).setAttribute(`src`, `${respostas[j].image}`);
                elementosResposta[j].classList.add(`resposta-ativa`);

                // Embaralha as respostas
                let posicaoAleatoria = Math.floor(Math.random() * (elementosResposta.length));
                elementosResposta[j].style.order = posicaoAleatoria;
            }
        }
        
    })
}

function selecionarResposta(elemento) {
    elemento.classList.add(`selecionado`);
    const respostas = elemento.parentNode.querySelectorAll(`.quiz-pergunta-resposta`);
    
    
    const perguntaId = elemento.parentNode.parentNode.id;
    
    if(elemento.getAttribute(`data-resposta`) === `certa`) {acertos++};

    respostas.forEach((resposta) => {
        if(resposta.getAttribute(`data-resposta`) === `certa`) {
            resposta.querySelector(`span`).classList.add(`certa`);
        } else {
            resposta.querySelector(`span`).classList.add(`errada`);
        }

        if(!resposta.classList.contains(`selecionado`)) {
            resposta.classList.add(`nao-selecionado`);
        }
        
        resposta.setAttribute(`onclick`, ``);
    }) 
    
    setTimeout(() => {
        scrollarParaProximaPergunta(perguntaId)
    }, 2000);
}

function scrollarParaProximaPergunta(id) {
    let indice = id[id.length - 1]; // pega a ultima letra do id 
    indice++;
    const proximaPergunta = document.querySelector(`#pergunta-${indice}`);

    if(proximaPergunta === null) { // quando for a ultima pergunta 
        let pontuacao = Math.round((acertos/perguntas.length)*100);
        let nivelCorrespondente;

        niveis.sort((nivelUm, nivelDois) => { // organiza array em Ordem crescente do minValue
            if(nivelUm.minValue < nivelDois.minValue) {
                return -1;
            } 
            if(nivelUm.minValue > nivelDois.minValue) {
                return 1;
            }
            return 0;
        });
        
        niveis.forEach((nivel) => {
            if(pontuacao >= nivel.minValue) {
                nivelCorrespondente = nivel;
                return
            }
        })
        
        document.querySelector(`#tela-2`).innerHTML += `
        <div class="quiz-resultado escondido">
        <div
          class="quiz-resultado-titulo"
        >
          <h3>${pontuacao}% de acerto: ${nivelCorrespondente.title}</h3>
        </div>
        <img src="${nivelCorrespondente.image}" alt="">
        <p class="nivel-descricao">${nivelCorrespondente.text}</p>
      </div>
      <button onclick="irParaPaginaDoQuizzSelecionado(${idQuiz})">Reiniciar Quizz</button>
      <button onclick="botaoEnviarHome()">Voltar para Home</button>
        `
        document.querySelector(`.quiz-resultado`).scrollIntoView({
            behavior: 'smooth',  
            block: 'center',
        });
        return;
    };

    proximaPergunta.querySelector(`.quiz-pergunta-titulo`).scrollIntoView({
        behavior: 'smooth',  
        block: 'center',
    });
}

