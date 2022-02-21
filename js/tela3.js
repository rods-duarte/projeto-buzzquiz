//? nota: function Quiz(title, image, questions) -> str, str, arr[Pergunta]

//? nota: function Pergunta(title, color, answers) -> str, str, arr[Resposta]

//? nota: function Resposta(text, image, isCorrectAnswer) -> str, str, bool

var quiz = {
  title: ``,
  image: ``,
  questions: [],
  levels: [],
};
var numeroPerguntas, numeroNiveis;

function botaoParteUm() {
  let titulo = document.querySelector(`#quiz-titulo`).value;
  let img = document.querySelector(`#quiz-img`).value;
  numeroPerguntas = document.querySelector(`#quiz-numero-perguntas`).value;
  numeroNiveis = document.querySelector(`#quiz-numero-niveis`).value;

  if (!validarDadosParteUm(titulo, img, numeroPerguntas, numeroNiveis)) {
    alert(`DADOS INVALIDOS !`);
  } else {
    quiz.title = titulo;
    quiz.image = img;
    criarFormularioParteDois(numeroPerguntas);
    document.querySelector(`#tela-3-1`).style.display = "none";
    document.querySelector(`#tela-3-2`).style.display = "block";
    //reset de variavel
    dadosValidos = false; //TODO Refazer essa parte
  }
}

function validarDadosParteUm(titulo, img, numeroPerguntas, numeroNiveis) {
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
            <!-- Texto da pergunta -->
            <input
              type="text"
              class="pergunta pergunta-texto"
              placeholder="Texto da pergunta ${i}"
            />
            <!-- Cor do texto da pergunta -->
            <input
              type="text"
              class="pergunta pergunta-cor"
              placeholder="Cor de fundo da pergunta ${i}"
            />
          </div>
          <h2>Resposta correta</h2>
          <div>
            <!-- Resposta certa -->
            <input
              type="text"
              class="resposta resposta-certa"
              placeholder="Resposta correta"
            />
            <!-- Imagem da resposta certa -->
            <input type="text" class="resposta-img resposta-certa-img" placeholder="URL da imagem" />
          </div>
          <h2>Respostas incorretas</h2>
          <div>
            <!-- Resposta errada 1 -->
            <input
              type="text"
              class="resposta resposta-errada-1"
              placeholder="Resposta incorreta 1"
            />
            <!-- Imagem da resposta errada 1 -->
            <input type="text" class="resposta-img resposta-errada-1-img" placeholder="URL da imagem 1" />
          </div>
          <div>
            <!-- Resposta errada 2 -->
            <input
              type="text"
              class="resposta resposta-errada-2"
              placeholder="Resposta incorreta 2"
            />
            <!-- Imagem da resposta errada 2 -->
            <input type="text" class="resposta-img resposta-errada-2-img" placeholder="URL da imagem 2" />
          </div>
          <div>
            <!-- Resposta errada 3 -->
            <input
              type="text"
              class="resposta resposta-errada-3"
              placeholder="Resposta incorreta 3"
            />
            <!-- Imagem da resposta errada 3 -->
            <input type="text" class="resposta-img resposta-errada-3-img" placeholder="URL da imagem 3" />
          </div>
        </div>
      </div>
      `;
  }
}

function abrirCaixa(elemento) {
  elemento.style.display = "none";
  elemento.parentNode.querySelector(`.caixa-aberta`).style.display = "flex";
}

function botaoParteDois() {
  let perguntas = document.querySelectorAll(`#tela-3-2 .caixa .caixa-aberta`);

  for (let i = 0; i < perguntas.length; i++) {
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
      let pergunta = new Pergunta(
        texto,
        cor,
        criarListaRespostas(perguntas[i])
      );
      quiz.questions.push(pergunta);
    }
  }
  criarFormularioParteTres(numeroNiveis);
  document.querySelector(`#tela-3-2`).style.display = `none`;
  document.querySelector(`#tela-3-3`).style.display = `block`;
}

function validarPergunta( //TODO reescrever essa parte como feito na validaNivel
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
  const regexCor = /^#([a-fA-F0-9]{6})$/g;
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
  } else {
    return true;
  }
}

function criarListaRespostas(pergunta) {
  let respostas = [];
  let respostasTexto = pergunta.querySelectorAll(`.resposta`);
  let respostasImg = pergunta.querySelectorAll(`.resposta-img`);

  for (let i = 0; i < respostasTexto.length; i++) {
    let resposta;
    if (!respostasTexto[i].value) {
      resposta = null;
    } else if (i === 0) {
      resposta = new Resposta(
        respostasTexto[0].value,
        respostasImg[0].value,
        true
      );
    } else {
      resposta = new Resposta(
        respostasTexto[i].value,
        respostasImg[i].value,
        false
      );
    }

    if (resposta !== null) {
      respostas.push(resposta);
    }
  }
  return respostas;
}

function criarFormularioParteTres(numeroNiveis) {
  let formulario = document.querySelector(`#tela-3-3 .formulario`);
  for (let i = 2; i <= numeroNiveis; i++) {
    formulario.innerHTML += `
          <!-- Nivel -->
          <div class="caixa">
            <div class="caixa-fechada">
              <h2>Nivel ${i}</h2>
              <ion-icon
                name="create-outline"
                onclick="abrirCaixa(this.parentNode)"
              ></ion-icon>
            </div>
            <div class="caixa-aberta">
              <h2>Nivel ${i}</h2>
              <div>
                <!-- Titulo do nivel -->
                <input
                  type="text"
                  class="nivel nivel-titulo"
                  placeholder="Titulo do nivel"
                />
                <!-- Porcentagem de acerto minima do nivel -->
                <input
                  type="number"
                  class="nivel nivel-porcentagem"
                  placeholder="% de acerto minima"
                />
                <!-- Imagem do nivel -->
                <input
                  type="text"
                  class="nivel nivel-img"
                  placeholder="URL da imagem do nivel"
                />
                <!-- Descricao do nivel -->
                <textarea 
                  type="text" 
                  class="nivel nivel-descricao" 
                  placeholder="Descricao do nivel"></textarea>
                
              </div>
            </div>
          </div>
          `;
  }
}

function botaoParteTres() {
  let niveis = document.querySelectorAll(`#tela-3-3 .caixa .caixa-aberta`);
  for (let i = 0; i < niveis.length; i++) {
    if (!validarNivel(niveis[i])) {
      quiz.levels = []; // reset
      alert(`Dados invalidos ! ! !`);
      return;
    }
  }
  if (!validaPorcentagemNiveis()) {
    quiz.levels = [];
    alert(`Um dos niveis precisa ter a porcentagem minima de 0% !`);
    return;
  } else {
    axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quiz);
    document.querySelector(
      `#tela-3-4 item-quiz`
    ).innerHTML.style.backgroundImage = `url("${quiz.image}")`;
    document.querySelector(
      `#tela-3-4 item-quiz h3`
    ).innerHTML = `${quiz.title}`;
    document.querySelector(`#tela-3-3`).style.display = `none`;
    document.querySelector(`#tela-3-4`).style.display = `block`;
  }
}

function validarNivel(nivel) {
  let titulo = nivel.querySelector(`.nivel-titulo`).value;
  let porcentagemAcerto = nivel.querySelector(`.nivel-porcentagem`).value;
  let img = nivel.querySelector(`.nivel-img`).value;
  let descricao = nivel.querySelector(`.nivel-descricao`).value;

  let regexUrl = /(https:\/\/).+/g;
  let validaImg = regexUrl.test(img);

  if (titulo.length < 10) {
    return false;
  } else if (porcentagemAcerto < 0 || porcentagemAcerto > 100) {
    return false;
  } else if (!validaImg) {
    return false;
  } else if (descricao.length < 30) {
    return false;
  } else {
    let novoNivel = new Nivel(
      titulo,
      img,
      descricao,
      Number(porcentagemAcerto)
    );
    quiz.levels.push(novoNivel);
    return true;
  }
}

function validaPorcentagemNiveis() {
  //TODO validar se existem dois niveis com mesma %
  for (let i = 0; i < quiz.levels.length; i++) {
    if (quiz.levels[i].minValue === 0) {
      return true;
    }
  }
  return false;
}

function Resposta(text, image, isCorrectAnswer) {
  this.text = text;
  this.image = image;
  this.isCorrectAnswer = isCorrectAnswer;
}

function Pergunta(title, color, answers) {
  this.title = title;
  this.color = color;
  this.answers = answers;
}

function Nivel(title, image, text, minValue) {
  this.title = title;
  this.image = image;
  this.text = text;
  this.minValue = minValue;
}
