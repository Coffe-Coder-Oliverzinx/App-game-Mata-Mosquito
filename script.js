let largura;
let altura;
let elementoCriado;
let dificuldade = document.getElementById('escolher_dificuldade');
let areaVida = document.getElementById('area_de_vida');
let vidaId = 3;
let vida;
let idx = 0;
let tempo = 1500;
let tempo2 = 3000;

fixResize();

function fixResize() {
    largura = window.innerWidth;
    altura = window.innerHeight;

    console.log("Largura: " + largura + " || Altura " + altura);

};

function startGame() {
    //DEFINIR A DIFICULDADE
    console.log(dificuldade.value);
    switch (dificuldade.value) {
        case '1':
            console.log('dificuldade FACIL escolhida');
            alert('dificuldade FACIL escolhida')
            tempo /= 1;
            tempo2 /= 1;

            console.log(tempo2);
            console.log(tempo);

            break;

        case '2':
            console.log('dificuldade DIFICIL escolhida');
            alert('dificuldade DIFICIL escolhida')
            tempo = Math.floor(tempo / 1.75);
            tempo2 /= 1.5;

            console.log(tempo2);
            console.log(tempo);

            break;

        case '3':
            console.log('dificuldade LUNÁTICA escolhida');
            alert('dificuldade LUNÁTICA escolhida')
            tempo = Math.floor(tempo / 2.25);
            tempo2 /= 2;

            console.log(tempo2);
            console.log(tempo);

            break;

        default:
            alert('ESCOLHA UM NIVEL DE DIFICULDADE!');
            location.reload();

            break;
    }

    //INICOU O JOGO
    document.getElementById('HTML').style.cursor = "url('img/mata_mosca.png') 30 30, auto"

    document.getElementById('container_inicial').style.display = 'none';
    document.getElementById('container_jogo').style.display = 'block';
    areaVida.style.top = (altura - 80) + 'px';

    console.log('O jogo iniciou');

    //DEFINIR A VIDA
    for (let i = 0; i < 3; i++) {
        vida = document.createElement('img');
        vida.src = "img/coracao_cheio.png";
        vida.id = vidaId;
        vida.style.marginLeft = 3 + 'px'

        areaVida.appendChild(vida);

        vidaId--;
    }
    vidaId = 3;

    //DEFINIR O TEMPORIZADOR DE VITÓRIA
    let timeInterval_cooldown = 59;

    let timing = document.createElement('span');
    timing.className = "tempo_restante"
    areaVida.appendChild(timing);

    let timeInterval = setInterval(function () {
        timing.innerHTML = "<br> Sobreviva: " + timeInterval_cooldown + " Segundos!";

        if (timeInterval_cooldown <= 0) {
            clearInterval(timeInterval);
            clearInterval(temporizadorInimigo);

            location.assign('vitoria.html');

        }

        timeInterval_cooldown--;
    }, 1000);

    //DEFINIR O SPAWN DE INIMIGOS
    let temporizadorInimigo = setInterval(function () {
        createEnemy();
    }, tempo);

};

function createEnemy() {
    //CRIAR ELEMENTO
    elementoCriado = document.createElement("img");
    elementoCriado.className = "mosquito";
    elementoCriado.src = "img/mosca.png";
    elementoCriado.id = idx++

    document.getElementById('container_jogo').appendChild(elementoCriado);

    //DEFINIR TAMANHO
    let size = Math.random();

    if (size < 0.5) {
        size = 0.5;
    }
    size = Math.floor(size * 100);

    console.log(size);

    //DEFINIR POSIÇÕES
    let positionX = Math.floor(Math.random() * largura - size);
    let positionY = Math.floor(Math.random() * altura - size);

    if (positionX <= 0) {
        positionX = 1;
    }

    if (positionY <= 0) {
        positionY = 1;
    }

    console.log(positionX + ' ' + positionY);

    //DEFINIR ORIENTAÇÃO
    let orientation = Math.floor(Math.random() * 2)
    switch (orientation) {
        case 0:
            elementoCriado.className += " destro";
            break;

        case 1:
            elementoCriado.className += " canhoto";
            break;

    }

    //REDEFINIR CSS
    elementoCriado.style.width = size + 'px';
    elementoCriado.style.height = size + 'px';
    elementoCriado.style.left = positionX + 'px';
    elementoCriado.style.top = positionY + 'px';
    elementoCriado.style.position = 'absolute';

    //MATAR O INIMIGO AO CLICAR
    elementoCriado.onclick = function () {
        this.remove();
        clearTimeout(temporizadorDano);

    };

    //REMOVER O MOSQUITO DA TELA E DAR DANO NO JOGADOR
    let temporizadorDano = setTimeout(function () {
        document.getElementById(vidaId).src = 'img/coracao_vazio.png';

        vidaId--;
        console.log("vidas: " + vidaId);

        if (vidaId <= 0) {
            location.assign('fimDeJogo.html');

        }

    }, tempo2);
};