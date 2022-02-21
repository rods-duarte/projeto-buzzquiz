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
            onclick="irParaPaginaDoQuizzSelecionado(this.id)">
                    <h3>${quizzes[i].title}</h3>
            </div>
        `;
    }
}

function irParaPaginaDoQuizzSelecionado(id){
    document.querySelector(`#tela-1`).style.display = `none`;
    document.querySelector(`#tela-3-4`).style.display = `none`;
    document.querySelector(`#tela-2`).style.display = `block`;
    document.querySelector(`#tela-2`).innerHTML = `
    <!-- Titulo do quizz -->
      <div class="quiz-titulo">
        <h3></h3>
      </div>
    `

    responderQuiz(id);
}

function listarQuizzesUsuario() {  //TODO Remover os quizzes do usuario da lista de quizzes geral
  const lstQuizz = document.querySelector(`#tela-1 .lista-quiz`);
  let quizzesUsuarioId = localStorage.getItem(`listaQuizzesUsuario`);

  // reset pra nao duplicar quando atualizar a lista
  lstQuizz.innerHTML = `
        <div class="topo-usuario">
          <h2>Seus Quizzes</h2>
          <button><ion-icon onclick="criarQuiz('#tela-1')" name="add-circle"></ion-icon></button>
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
            onclick="irParaPaginaDoQuizzSelecionado(this.id)">
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

