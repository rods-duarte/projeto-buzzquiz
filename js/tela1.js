listarQuizzes();
listarQuizzesUsuario();

function listarQuizzes(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(gerarQuizzDinamicamente);
}

function gerarQuizzDinamicamente(resposta){
    const lstQuizz = document.querySelector(".lista-quiz.todos");
    // Para criar gerar a lista com os "Seus Quizzes", basta acessar com o 'querySelector' e povoar a lista usando o 'for'

    const quizzes = resposta.data;

    lstQuizz.innerHTML = "";
    lstQuizz.innerHTML = `<h2>Todos os quizzes</h2>`;
    for(let i = 0; i < quizzes.length; i++){
        lstQuizz.innerHTML += `
            <div id="${quizzes[i].id}" class="item-quiz"
            style="background-image: linear-gradient(to top, black, transparent), url('${quizzes[i].image}');"
            onclick="irParaPaginaDoQuizzSelecionado(this)">
                    <h3>${quizzes[i].title}</h3>
            </div>
        `;
    }
}

function irParaPaginaDoQuizzSelecionado(elemento){
    document.querySelector(`#tela-1`).style.display = `none`;

    document.querySelector(`#tela-2`).style.display = `block`;

    // Monta a tela 2 
    const promiseQuiz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elemento.id}`);

    promiseQuiz.then((resposta) => {
        
        const quiz = resposta.data;
        const perguntas = quiz.questions;

        document.querySelector(`.quiz-titulo`).style.backgroundImage = `url("${quiz.image}")`;
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
                <div class="quiz-pergunta-resposta" onclick="selecionarResposta()">
                  <img>
                  <span></span>
                </div>
                <!-- resposta 2 -->
                <div class="quiz-pergunta-resposta" onclick="selecionarResposta()">
                  <img>
                  <span></span>
                </div>
                <!-- resposta 3 -->
                <div class="quiz-pergunta-resposta" onclick="selecionarResposta()">
                  <img>
                  <span></span>
                </div>
                <!-- resposta 4 -->
                <div class="quiz-pergunta-resposta" onclick="selecionarResposta()">
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

function listarQuizzesUsuario() {  //TODO Remover os quizzes do usuario da lista de quizzes geral
  const lstQuizz = document.querySelector(`#tela-1 .lista-quiz`);
  let quizzesUsuarioId = localStorage.getItem(`listaQuizzesUsuario`);

  // reset pra nao duplicar quando atualizar a lista
  lstQuizz.innerHTML = `
        <div class="topo-usuario">
          <h2>Seus Quizzes</h2>
          <button><ion-icon name="add-circle"></ion-icon></button>
        </div>
  `

  if(quizzesUsuarioId === null) {
      lstQuizz.style.display = `none`;
      return;
  } else {
      document.querySelector(`.criar-quiz`).style.display = `none`;
  }

  quizzesUsuarioId = JSON.parse(quizzesUsuarioId);
  quizzesUsuarioId.forEach((id) => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`
    );

    promise.then((resposta) => {
      lstQuizz.innerHTML += `
            <!-- Quiz -->
            <div id="${resposta.data.id}" class="item-quiz" style="background-image: linear-gradient(to top, black, transparent), url('${resposta.data.image}');"
            onclick="irParaPaginaDoQuizzSelecionado()">
                <h3>${resposta.data.title} </h3>
            </div>
            `;
    });
  });
}

function criarQuiz(id) {
    document.querySelector(`${id}`).style.display = `none`;
    document.querySelector(`#tela-3-1`).style.display = `block`;
}
