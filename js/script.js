// document.querySelector(`quiz`).style.backgroundImage = "url('../img/simpsons.png')";

//! function Quiz(title, image, questions) -> str, str, arr[Pergunta]

//! function Pergunta(title, color, answers) -> str, str, arr[Resposta]

//! function Resposta(text, image, isCorrectAnswer) -> str, str, bool

var dadosValidos = false;
var quiz = {
  title: ``,
  image: ``,
  questions: [],
};
var numeroPerguntas, numeroNiveis;

// Funcionamento da primeira etapa na criacao do quiz
function botaoParteUm() {
  // informacoes de input
  let titulo = document.querySelector(`#quiz-titulo`).value;
  let img = document.querySelector(`#quiz-img`).value;
  numeroPerguntas = document.querySelector(`#quiz-numero-perguntas`).value;
  numeroNiveis = document.querySelector(`#quiz-numero-niveis`).value;

  // validacao dos dados
  dadosValidos = validarDadosParteUm(
    titulo,
    img,
    numeroPerguntas,
    numeroNiveis
  );
  if (!dadosValidos) {
    alert(`DADOS INVALIDOS !`);
  } else {
    quiz.title = titulo;
    quiz.image = img;
    criarFormularioParteDois(numeroPerguntas);
    document.querySelector(`#tela-3-1`).style.display = "none";
    document.querySelector(`#tela-3-2`).style.display = "block";
    //reset de variavel
    dadosValidos = false;
  }
}

// validacao dos dados da primeira etapa de criacao de quiz
function validarDadosParteUm(titulo, img, numeroPerguntas, numeroNiveis) {
  //TODO Implementar validacao do URL imagem
  const regexUrl = /(https:\/\/).+/g;
  let validaImg = regexUrl.test(img);

  if (!titulo || !numeroPerguntas || !numeroNiveis || !img) {
    return false;
  }

  if (titulo.length < 20 || titulo.length > 65) {
    return false;
  } else if (!validaImg) {
    return false;
  } else if (numeroPerguntas < 3) {
    return false;
  } else if (numeroNiveis < 2) {
    return false;
  } else {
    return true;
  }
}

// botao que confirma os dados do formulario e constroi a proxima etapa
function criarFormularioParteDois(numeroPerguntas) {
  let formulario = document.querySelector(`#tela-3-2 .formulario`);
  for (let i = 2; i <= numeroPerguntas; i++) {
    formulario.innerHTML += `
        <!-- Pergunta -->
      <div class="caixa">
        <div class="caixa-fechada">
          <h2>Pergunta ${i}</h2>
          <ion-icon name="create-outline" onclick="abrirCaixa(this.parentNode)"></ion-icon>
        </div>
        <div class="caixa-aberta">
          <h2>Pergunta ${i}</h2>
          <div>
            <input
              type="text"
              class="pergunta pergunta-texto"
              placeholder="Texto da pergunta ${i}"
            />
            <input
              type="text"
              class="pergunta pergunta-cor"
              placeholder="Cor de fundo da pergunta ${i}"
            />
          </div>
          <h2>Resposta correta</h2>
          <div>
            <input
              type="text"
              class="resposta resposta-certa"
              placeholder="Resposta correta"
            />
            <input type="text" class="resposta-img resposta-certa-img" placeholder="URL da imagem" />
          </div>
          <h2>Respostas incorretas</h2>
          <div>
            <input
              type="text"
              class="resposta resposta-errada-1"
              placeholder="Resposta incorreta 1"
            />
            <input type="text" class="resposta-img resposta-errada-1-img" placeholder="URL da imagem 1" />
          </div>
          <div>
            <input
              type="text"
              class="resposta resposta-errada-2"
              placeholder="Resposta incorreta 2"
            />
            <input type="text" class="resposta-img resposta-errada-2-img" placeholder="URL da imagem 2" />
          </div>
          <div>
            <input
              type="text"
              class="resposta resposta-errada-3"
              placeholder="Resposta incorreta 3"
            />
            <input type="text" class="resposta-img resposta-errada-3-img" placeholder="URL da imagem 3" />
          </div>
        </div>
      </div>
      `;
  }
}

// abre o formulario de cada pergunta/nivel
function abrirCaixa(elemento) {
  elemento.style.display = "none";
  elemento.parentNode.querySelector(`.caixa-aberta`).style.display = "flex";
}

// botao que confirma os dados do formulario e constroi a proxima etapa
function botaoParteDois() {
  let perguntas = document.querySelectorAll(`#tela-3-2 .caixa .caixa-aberta`);

  for (let i = 0; i < perguntas.length; i++) {

    // informacoes a serem validadas
    let texto = perguntas[i].querySelector(`.pergunta-texto`).value;
    let cor = perguntas[i].querySelector(`.pergunta-cor`).value;
    let respostaCerta = perguntas[i].querySelector(`.resposta-certa`).value;
    let respostaCertaImg =
      perguntas[i].querySelector(`.resposta-certa-img`).value;
    let respostaErrada = perguntas[i].querySelector(`.resposta-errada-1`).value;
    let respostaErradaImg = perguntas[i].querySelector(
      `.resposta-errada-1-img`
    ).value;
    let respostaErradaDois =
      perguntas[i].querySelector(`.resposta-errada-2`).value;
    let respostaErradaDoisImg = perguntas[i].querySelector(
      `.resposta-errada-2-img`
    ).value;
    let respostaErradaTres =
      perguntas[i].querySelector(`.resposta-errada-3`).value;
    let respostaErradaTresImg = perguntas[i].querySelector(
      `.resposta-errada-3-img`
    ).value;

    if (
      !validarPergunta(
        texto,
        cor,
        respostaCerta,
        respostaCertaImg,
        respostaErrada,
        respostaErradaImg,
        respostaErradaDois,
        respostaErradaDoisImg,
        respostaErradaTres,
        respostaErradaTresImg
      )
    ) {
      alert(`Dados Invalidos !`);
      quiz.questions = []; // reset
      return;
    } else { 
        // construcao do obj que sera enviado ao servidor
        let pergunta = new Pergunta(texto, cor, criarListaRespostas(perguntas[i]));
        quiz.questions.push(pergunta);
        console.log(quiz);
    }
  }
  alert(`DEU BOM CARAIO ! ! !`);
}

// Valida formulario das perguntas
function validarPergunta(
  texto,
  cor,
  respostaCerta,
  respostaCertaImg,
  respostaErrada,
  respostaErradaImg,
  respostaErradaDois,
  respostaErradaDoisImg,
  respostaErradaTres,
  respostaErradaTresImg
) {
  const regexCor = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g;
  const regexUrl = /(https:\/\/).+/;
  let validaCor = regexCor.test(cor);
  let validaRespostaErradaImg = regexUrl.test(respostaErradaImg);
  let validaRespostaCertaImg = regexUrl.test(respostaCertaImg);

  if (
    !texto ||
    !cor ||
    !respostaCerta ||
    !respostaCertaImg ||
    !respostaErrada ||
    !respostaErradaImg
  ) {
    return false;
  }

  // garante que, se existir mais de duas respostas, existam tanto o texto quanto a imagem
  if (
    ((respostaErradaDois || respostaErradaDoisImg) &&
      !(respostaErradaDois && respostaErradaDoisImg)) ||
    ((respostaErradaTres || respostaErradaTresImg) &&
      !(respostaErradaTres && respostaErradaTresImg))
  ) {
    return false;
  }

  if (texto.length < 20) {
    return false;
  } else if (!validaCor) {
    return false;
  } else if (!validaRespostaCertaImg) {
    return false;
  } else if (!validaRespostaErradaImg) {
    return false;
  } else {return true;
  }
}

// construtor obj resposta
function Resposta(text, image, isCorrectAnswer) {
    this.text = text;
    this.image = image;
    this.isCorrectAnswer = isCorrectAnswer;
}

// construtor obj pergunta
function Pergunta(title, color, answers) {
    this.title = title,
    this.color = color;
    this.answers = answers;
}

// retorna um array das respostas de uma pergunta
function criarListaRespostas(pergunta) {
    let respostas = [];
    let respostasTexto = pergunta.querySelectorAll(`.resposta`);
    let respostasImg = pergunta.querySelectorAll(`.resposta-img`);

    for(let i = 0; i < respostasTexto.length; i++) {
        let resposta;
        if(!respostasTexto[i].value) {resposta = null;} 
        else if(i === 0) {resposta = new Resposta(respostasTexto[0].value, respostasImg[0].value, true);
        } else { resposta = new Resposta(respostasTexto[i].value, respostasImg[i].value, false) }

        if(resposta !== null) {
            respostas.push(resposta);}
    }

    return respostas;
}

/*
OBJ PERGUNTA

{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}


*/
