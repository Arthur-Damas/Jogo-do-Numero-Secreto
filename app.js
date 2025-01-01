// Região no HTML escrito "onclick" - Lá temos 'verificarChute()'
// Criando a função - Faz uma ação -> Por default, funções e 
// vars devem ser autoexplicativas

// Funções

function alterarTextoTag(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == resposta){
        alterarTextoTag('h1', "Acertou!");
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        alterarTextoTag('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if(chute < resposta){
            correçao = "maior";
        }
        else {
            correçao = "menor";
        }
        tentativas++;
        alterarTextoTag('h1', "Errou!");
        alterarTextoTag('p', `Tente um valor ${correçao}`);
        limparCampo();
    }
}
function randInt(valmin, valmax){
   let num = parseInt(Math.random()*valmax + valmin);
   let tamanLista = listaDeNumSort.length;

   if (tamanLista == valmax){
        listaDeNumSort = [];
   }

   if (listaDeNumSort.includes(num)){
        return randInt(valmin, valmax);
   }
   else{
    listaDeNumSort.push(num);
    return num;
   }
   return num;
}
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    console.log('Clicado')
    resposta = randInt(vmin, vmax);
    limparCampo();
    tentativas = 1
    exibirTextoPadrao();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
function exibirTextoPadrao(){
    alterarTextoTag('h1', "Jogo do Número Secreto!");
    alterarTextoTag('p',`Escolha um número entre ${vmin} e ${vmax}`);
}

// Variáveis
let listaDeNumSort = [];
let vmax = 10, vmin = 1, resposta = randInt(vmin, vmax), tentativas = 1; 
//randInt(vmin, vmax);

exibirTextoPadrao();


