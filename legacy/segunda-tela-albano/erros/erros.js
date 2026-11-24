const botoesAbrirFalha = document.querySelectorAll('.seta');
const botoesRecolherFalha = document.querySelectorAll('.recolher');

function alternarCardFalha(botao) {
  const card = botao.closest('.card');
  const detalhes = card.querySelector('.detalhes');
  const estaAberto = botao.getAttribute('aria-expanded') === 'true';

  botao.setAttribute('aria-expanded', String(!estaAberto));
  botao.setAttribute('aria-label', estaAberto ? 'Expandir chamado' : 'Recolher chamado');
  detalhes.hidden = estaAberto;
  card.classList.toggle('aberto', !estaAberto);
}

botoesAbrirFalha.forEach((botao) => {
  botao.addEventListener('click', () => alternarCardFalha(botao));
});

botoesRecolherFalha.forEach((botao) => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.card');
    alternarCardFalha(card.querySelector('.seta'));
  });
});