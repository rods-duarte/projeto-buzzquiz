listarQuizzes();

function listarQuizzes(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(gerarQuizzDinamicamente);
}

function gerarQuizzDinamicamente(resposta){
    // console.log(resposta.data)

    const lstQuizz = document.querySelector(".lista-quiz.todos");
    // Para criar gerar a lista com os "Seus Quizzes", basta acessar com o 'querySelector' e povoar a lista usando o 'for'

    const quizzes = resposta.data;
    // console.log(quizzes[0].title)

    lstQuizz.innerHTML = "";
    lstQuizz.innerHTML = `<h2>Todos os quizzes</h2>`;
    for(let i = 0; i < quizzes.length; i++){
        lstQuizz.innerHTML += `
            <div class="item-quiz"
            style="background-image: linear-gradient(to top, black, transparent), url('${quizzes[i].image}');"
            onclick="irParaPaginaDoQuizzSelecionado()">
                    <h3>${quizzes[i].title}</h3>
            </div>
        `;
    }
}

function irParaPaginaDoQuizzSelecionado(){
    const esconderTela1 = document.getElementById("tela-1");
    esconderTela1.classList.add("escondido");

    const mostrarTela2 = document.getElementById("tela-2");

    //Essa parte fica pra quando a tela 2 tiver pronta
    if(mostrarTela2.classList.contains("escondido")){
        mostrarTela2.classList.remove("escondido");
    }
}