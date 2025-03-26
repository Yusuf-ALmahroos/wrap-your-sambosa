const mainStartBtnEl = document.getElementById('main-start-btn');
const mainPageEl     = document.getElementById('main-page')
const gamePageEl     = document.getElementById('game-page');

mainStartBtnEl.addEventListener('click', () => 
{
  mainPageEl.style.display = 'none';
  gamePageEl.style.display = 'flex'
})