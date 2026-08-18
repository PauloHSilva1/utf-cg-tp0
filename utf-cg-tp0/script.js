const bolas = [];
let animacaoIniciada = false;

function gerarImagens() {
    const img = document.createElement('img');

    // aqui eu coloco o caminho da minha imagem da bola
    img.src = './images/bola.png';
    img.style.position = 'fixed';

    // definindo o tamanho da minha bola
    const size = 60;
    img.style.width = size + 'px';
    img.style.height = size + 'px';

    // deixei redonda e tirei os eventos de clique pra não bugar nada
    img.style.borderRadius = '50%';
    img.style.pointerEvents = 'none';
    img.style.zIndex = '9999';

    // sorteando uma posição inicial lá no topo da tela
    const x = Math.random() * (window.innerWidth - size);
    const y = 0;

    img.style.left = x + 'px';
    img.style.top = y + 'px';

    document.body.appendChild(img);

    // aqui eu crio o objeto com as propriedades da bola que vai quicar
    const bola = {
        el: img,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 15, // velocidade aleatória pros lados
        vy: Math.random() * 5,          // caindo devagar no começo
        size: size,
        restituicao: 0.8 + Math.random() * 0.15 // o quanto ela vai quicar de volta
    };

    bolas.push(bola);

    // dou o play na animação só se já não estiver rodando
    if (!animacaoIniciada) {
        animacaoIniciada = true;
        requestAnimationFrame(animarBolas);
    }
}

function animarBolas() {
    const gravidade = 0.5;
    const atritoRolamento = 0.99; // atrito do chão pra bola ir parando aos poucos

    for (let bola of bolas) {
        // aplicando a gravidade pra bola cair
        bola.vy += gravidade;

        // atualizo onde a bola tá agora
        bola.x += bola.vx;
        bola.y += bola.vy;

        // checando se bateu nas paredes dos lados
        if (bola.x <= 0) {
            bola.x = 0;
            bola.vx *= -bola.restituicao;
        } else if (bola.x + bola.size >= window.innerWidth) {
            bola.x = window.innerWidth - bola.size;
            bola.vx *= -bola.restituicao;
        }

        // checando se bateu no chão
        if (bola.y + bola.size >= window.innerHeight) {
            bola.y = window.innerHeight - bola.size;
            bola.vy *= -bola.restituicao; // inverte a direção e perde um pouco de força no quique
            bola.vx *= atritoRolamento;   // o atrito vai freando ela

            // quando o quique for muito fraquinho, eu paro a bola de vez
            if (Math.abs(bola.vy) < 1) {
                bola.vy = 0;
            }
        }
        // checando se bateu no teto (vai que, né?)
        else if (bola.y <= 0) {
            bola.y = 0;
            bola.vy *= -bola.restituicao;
        }

        // por fim, movo a imagem na tela de verdade
        bola.el.style.left = bola.x + 'px';
        bola.el.style.top = bola.y + 'px';
    }

    // chamo a função de novo pro loop continuar
    requestAnimationFrame(animarBolas);
}
