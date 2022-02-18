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

// Funcionamento do botao no primeiro formulario (Tela 3-1)
function botaoParteUm() {
  // informacoes de input
  let titulo = document.querySelector(`#quiz-titulo`).value;
  let img = document.querySelector(`#quiz-img`).value;
  numeroPerguntas = document.querySelector(`#quiz-numero-perguntas`).value;
  numeroNiveis = document.querySelector(`#quiz-numero-niveis`).value;

  // validacao dos dados

  if (!validarDadosParteUm(titulo, img, numeroPerguntas, numeroNiveis)) {
    alert(`DADOS INVALIDOS !`);
  } else {
    // entra se os dados sao validos
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

// cria o formulario da parte dois
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
      let pergunta = new Pergunta(
        texto,
        cor,
        criarListaRespostas(perguntas[i])
      );
      quiz.questions.push(pergunta);
    }
  }
  alert(`DEU BOM ! ! !`); //! REMOVER
  // Troca de tela
  criarFormularioParteTres(numeroNiveis);
  document.querySelector(`#tela-3-2`).style.display = `none`;
  document.querySelector(`#tela-3-3`).style.display = `block`;
}

// cria o formulario da parte tres
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
                <textarea type="text" class="nivel nivel-descricao" placeholder="Descricao do nivel"></textarea>
                
              </div>
            </div>
          </div>
          `;
    }
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
  } else {
    return true;
  }
}

// retorna um array das respostas de uma pergunta
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

// construtor obj resposta
function Resposta(text, image, isCorrectAnswer) {
  this.text = text;
  this.image = image;
  this.isCorrectAnswer = isCorrectAnswer;
}

// construtor obj pergunta
function Pergunta(title, color, answers) {
  (this.title = title), (this.color = color);
  this.answers = answers;
}
