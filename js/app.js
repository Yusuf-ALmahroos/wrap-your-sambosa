const mainStartBtnEl = document.getElementById('main-start-btn');
const mainPageEl     = document.getElementById('main-page')

mainStartBtnEl.addEventListener('click', () => 
{
  mainPageEl.style.display = 'none';
})