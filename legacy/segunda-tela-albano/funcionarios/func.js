const botoesAbrirFuncionario = document.querySelectorAll('.seta');
const botoesRecolherFuncionario = document.querySelectorAll('.recolher');

function alternarCardFuncionario(botao) {
  const card = botao.closest('.card');
  const detalhes = card.querySelector('.detalhes');
  const estaAberto = botao.getAttribute('aria-expanded') === 'true';

  botao.setAttribute('aria-expanded', String(!estaAberto));
  botao.setAttribute('aria-label', estaAberto ? 'Expandir funcionário' : 'Recolher funcionário');
  detalhes.hidden = estaAberto;
  card.classList.toggle('aberto', !estaAberto);
}

botoesAbrirFuncionario.forEach((botao) => {
  botao.addEventListener('click', () => alternarCardFuncionario(botao));
});

botoesRecolherFuncionario.forEach((botao) => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.card');
    alternarCardFuncionario(card.querySelector('.seta'));
  });
});