let numeroAleatorio, palpites, ultimoResultado, baixoOuAlto;
let envioPalpite, campoPalpite, contagemPalpites, botaoReinicio;
let divContainer;

numeroAleatorio = Math.floor(Math.random() * 101);

divContainer = document.getElementById('container')

palpites = document.querySelector('.palpites');
ultimoResultado = document.querySelector('.ultimoResultado');
baixoOuAlto = document.querySelector('.baixoOuAlto');

envioPalpite = document.querySelector('.envioPalpite');
campoPalpite = document.querySelector('.campoPalpite');

contagemPalpites = 1;

function conferirPalpite() {
   let palpiteUsuario = Number(campoPalpite.value);
   if (contagemPalpites === 1) {
      palpites.textContent = 'Palpites anteriores: ';
   }
   palpites.textContent += palpiteUsuario + ' ';

   // Verificar o palpite do usuario
   if (palpiteUsuario === numeroAleatorio) {
      //caso acertou o numero
      ultimoResultado.textContent = 'Parabéns! Você acertou!';
      ultimoResultado.style.backgroundColor = 'green';
      baixoOuAlto.textContent = `O número certo era: ${numeroAleatorio}`;
      configFimDeJogo();

   } else if (contagemPalpites === 5) {
      //caso tenha acabado as tentativas
      ultimoResultado.textContent = '!!! GAME OVER !!!';
      baixoOuAlto.textContent = `O número certo era: ${numeroAleatorio}`;
      configFimDeJogo();

   } else {
      //caso errou o numero
      ultimoResultado.textContent = 'Errado!';
      ultimoResultado.style.backgroundColor = 'red';

      //dica de proximidade
      if (palpiteUsuario < numeroAleatorio) {
         baixoOuAlto.textContent = 'Seu palpite está muito BAIXO!';
      } else if (palpiteUsuario > numeroAleatorio) {
         baixoOuAlto.textContent = 'Seu palpite está muito ALTO!';
      }
   }

   contagemPalpites++;
   campoPalpite.value = '';
   campoPalpite.focus(); //focar no campo de palpite
}
envioPalpite.addEventListener('click', conferirPalpite);

function configFimDeJogo() {
   //desabilitar usuabilidade
   campoPalpite.disabled = true;
   envioPalpite.disabled = true;

   //criar elemento(botao)
   botaoReinicio = document.createElement('button');
   botaoReinicio.textContent = 'Iniciar novo jogo';
   botaoReinicio.setAttribute('class', 'botaoR')
   botaoReinicio.addEventListener('click', reiniciarJogo);

   //add botao dentro da <div#container>
   divContainer.appendChild(botaoReinicio);
}

function reiniciarJogo() {
   contagemPalpites = 1;

   //limpar todos os paragrafos informativos
   let reiniciarPgfos = document.querySelectorAll('.resultadoPgfos p');
   for (var i = 0; i < reiniciarPgfos.length; i++ ) {
      reiniciarPgfos[i].textContent = '';
   }

   //remover o botao reset do codigo
   botaoReinicio.parentNode.removeChild(botaoReinicio);

   //habilita os elementos do formulario, esvazia e direciona o foco ao campo
   campoPalpite.disabled = false;
   envioPalpite.disabled = false;
   campoPalpite.value = '';
   campoPalpite.focus();

   ultimoResultado.style.backgroundColor = 'white';

   numeroAleatorio = Math.floor(Math.random() * 100) + 1;
}
