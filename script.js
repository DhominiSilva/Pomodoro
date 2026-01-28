const html = document.querySelector('html'); // estou selecionando a tag html inteira
const focoBt = document.querySelector('.app__card-button--foco'); // estou selecionando o botão de foco
const curtoBt = document.querySelector('.app__card-button--curto'); // estou selecionando o botão de curto
const longoBt = document.querySelector('.app__card-button--longo'); // estou selecionando o botão de longo
const banner = document.querySelector('.app__image'); // estou selecionando o banner
const titulo = document.querySelector('.app__title'); // estou selecionando o título
const botoes = document.querySelectorAll('.app__card-button'); // estou selecionando todos os botões
const startPauseBt = document.querySelector('#start-pause'); // estou selecionando o botão de start/pause
const musicaFocoInput = document.querySelector('#alternar-musica'); // estou selecionando o input de música
const iniciarOuPausarBt = document.querySelector('#start-pause span'); // estou selecionando o texto do botão de start/pause
const audioPlay = new Audio('./sons/play.wav'); // estou selecionando o som de play
const tempoNaTela = document.querySelector('#timer');
const audioPause = new Audio('./sons/pause.mp3'); // estou selecionando o som de pause
const audioFim = new Audio('./sons/beep.mp3'); // estou selecionando o som de fim
const imagemBotao = document.querySelector('.app__card-primary-butto-icon');
const musica = new Audio('./sons/luna-rise-part-one.mp3'); // estou selecionando a música

let tempoDecorridoSegundos = 1500; // estou criando uma variável para o tempo decorrido em segundos
let intervaloId = null; // estou criando uma variável para o intervalo

musica.loop = true; // faz a música repetir infinitamente
musicaFocoInput.addEventListener('change', () => { // quando o input de música for alterado, faça:
  if (musica.paused) { // se a música estiver pausada, faça:
    musica.play(); // reproduza a música
  } else { // se a música estiver tocando, faça:
    musica.pause(); // pare a música
  }
});

focoBt.addEventListener('click', () => { // quando o botão de foco for clicado, faça:
  tempoDecorridoSegundos = 1500;
  alterarContexto('foco'); // chame a função alterarContexto
  focoBt.classList.add('active'); // adiciona a classe active ao botão de foco
});

curtoBt.addEventListener('click', () => { 
  tempoDecorridoSegundos = 300;
  alterarContexto('descanso-curto'); 
  curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
  tempoDecorridoSegundos = 900;
  alterarContexto('descanso-longo'); 
  longoBt.classList.add('active'); 
});

function alterarContexto(contexto) { // função que altera o contexto
  mostrarTempo();
  botoes.forEach(function(contexto){ // para cada botão, faça: remove a classe active
    contexto.classList.remove('active');
  });
  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `./imagens/${contexto}.png`);
  switch (contexto) {
    case 'foco': 
      titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`; // altere o título do html
      break;
    case 'descanso-curto':
      titulo.innerHTML = `Que tal uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
      case 'descanso-longo':
      titulo.innerHTML = `Hora de voltar à superficie.<br><strong class="app__title-strong">faça uma pausa longo.</strong>`;
      default:
      break;
  }
}

const contagemRegressiva = () => { // função que realiza a contagem regressiva
  if(tempoDecorridoSegundos <= 0){ 
    audioFim.play(); // reproduz o som de fim
    alert("Tempo esgotado!"); // exibe uma mensagem de tempo esgotado
    zerar(); // chama a função zerar
    return; // retorna a função
  };
  tempoDecorridoSegundos -=1; // decrementa o tempo decorrido
  mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar); // adiciona um evento de clique ao botão de start/pause

function iniciarOuPausar(){ // função que inicia ou pausa o timer
  if(intervaloId){ // se o intervalo estiver definido, faça:
    audioPause.play(); // reproduz o som de pause
    zerar();
    return; // retorna a função
  }
  audioPlay.play(); // reproduz o som de play
  intervaloId = setInterval(contagemRegressiva, 1000); // define o intervalo como a função contagemRegressiva
  iniciarOuPausarBt.textContent = 'Pausar'; // altera o texto do botão de Começar para Pausar
  imagemBotao.setAttribute('src', './imagens/pause.png');
}

function zerar(){ // função que zera o timer 
  clearInterval(intervaloId); // limpa o intervalo
  iniciarOuPausarBt.textContent = 'Começar'; // altera o texto do botão de Pausar para Começar
  intervaloId = null; // define o intervalo como null 
  imagemBotao.setAttribute('src', './imagens/play_arrow.png');
}

function mostrarTempo(){ // função que mostra o tempo na tela
  const tempo = new Date(tempoDecorridoSegundos * 1000); // cria um objeto Date convertendo os segundos (tempoDecorridoSegundos) para milissegundos (multiplicando por 1000), já que o construtor Date trabalha com milissegundos
  const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'}); 
  tempoNaTela.innerHTML = `${tempoFormatado}`; // mostra o tempo na tela
}

mostrarTempo(); // chama a função mostrarTempo