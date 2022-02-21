listarQuizzes();

function listarQuizzes(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(gerarQuizzDinamicamente);
}

function gerarQuizzDinamicamente(resposta){
    const lstQuizz = document.querySelector(".lista-quiz.todos");
    // Para criar gerar a lista com os "Seus Quizzes", basta acessar com o 'querySelector' e povoar a lista usando o 'for'

    const quizzes = resposta.data;
    console.log(quizzes)

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
    const esconderTela1 = document.getElementById("tela-1");
    esconderTela1.classList.add("escondido");

    const mostrarPaginaDeQuizz = document.getElementById("tela-2");

    //Essa parte fica pra quando a tela 2 tiver pronta
    if(mostrarPaginaDeQuizz.classList.contains("escondido")){
        mostrarPaginaDeQuizz.classList.remove("escondido");
    }

    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elemento.id}`);
    promise.then(paginaDeUmQuizz);
}

function paginaDeUmQuizz(resposta){
    const quizz = resposta.data;
    const perguntas = quizz.questions;
    const construirQuizz = document.getElementById("tela-2");

    construirQuizz.innerHTML = "";

    construirQuizz.innerHTML += `
        <div style="background-image: linear-gradient(to top, rgba(0,0,0,0.6) 100%, transparent), url('${quizz.image}');">
            <p>${quizz.title}</p>
        </div>
    `;

    for(let i = 0; i < perguntas.length; i++){
        let alternativas = perguntas[i].answers;
        for(let j = 0; j < alternativas.length; j++){
            construirQuizz.innerHTML += `
                <div class="caixa-pergunta">
                    <div class="conteudo">
                        <div class="pergunta" style="background-color: ${perguntas[i].color};">
                            <span>${perguntas[i].title}</span>
                        </div>
        
                        <div class="alternativas">
                            <div class="resposta">
                                <img src="${alternativas[j].image}">
                                <p>${alternativas[j].text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

    }
}

function criarQuizz(){
    const esconderTela1 = document.getElementById("tela-1");
    esconderTela1.classList.add("escondido");

    const mostrarTelaCriacaoDeQuizz = document.getElementById("tela-3.1");

    if(mostrarTelaCriacaoDeQuizz.classList.contains("escondido")){
        mostrarTelaCriacaoDeQuizz.classList.remove("escondido");
    }
}