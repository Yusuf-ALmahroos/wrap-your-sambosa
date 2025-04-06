const foodTypes = 
[
  {name: "Sambosa" , moves: ["UP", "ADD", "LEFT", "RIGHT"]},
  {name: "Springrolls" , moves: ["UP", "LEFT", "RIGHT", "ADD", "UP", "UP "]}
];

const foodQueue = [];

let gameDiff = "easy";

const mainStartBtnEl   = document.getElementById('main-start-btn');
const mainPageEl       = document.getElementById('main-page')
const gamePageEl       = document.getElementById('game-page');
const difficultyBtnEls = document.querySelectorAll('.difficulty-btn');


function game_start()
{
  switch(gameDiff)
  {
    case "easy":
      foodQueue.length = 0;
      foodQueue.push(foodTypes[0], foodTypes[1], foodTypes[0]);
      break;
    
    case "mid":
      foodQueue.length = 0;
      foodQueue.push(foodTypes[1], foodTypes[1], foodTypes[0], foodTypes[0]);
      break;
    
    case "hard":
      foodQueue.length = 0;
      foodQueue.push(foodTypes[0], foodTypes[1], foodTypes[1], foodTypes[0],  foodTypes[1],);
      break;
  }
  mainPageEl.style.display = 'none';
  gamePageEl.style.display = 'flex';
}

function game_setMainBtnsListeners()
{
  mainStartBtnEl.addEventListener('click', () => 
  {
    game_start();
  })
      
  difficultyBtnEls.forEach(btn => 
  {
    btn.addEventListener('click', () => 
    {
      difficultyBtnEls.forEach(button => button.classList.remove('active'))
      btn.classList.add('active');
      gameDiff = btn.dataset.level;
    })
  })
}

const resetBtnEL   = document.getElementById("reset-btn");
const keypadBtnEls = document.querySelectorAll('.keypad-btn');

function game_resetRound ()
{

}

function game_processClicked (clicked)
{
  
}

function game_setGameBtnsListeners()
{
  resetBtnEL.addEventListener('click', () => game_resetRound())

  keypadBtnEls.forEach(btn => 
  {
    btn.addEventListener('click', () => 
    {
      game_processClicked(btn.dataset.type)
    })
  })
}

function game_changeShape ()
{

}

function game_progressBar()
{
}


function game_updateQueue ()
{

}

function game_timer ()
{

}

function  game_render()
{

}

function game_init()
{
  game_setMainBtnsListeners();
  game_setGameBtnsListeners();
}

game_init();