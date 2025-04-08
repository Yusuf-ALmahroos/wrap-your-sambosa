const foodTypes = 
[
  {name: "Sambosa" , moves: ["UP", "LEFT", "RIGHT", "ADD"]},
  {name: "Springrolls" , moves: ["UP", "LEFT", "RIGHT", "ADD", "UP", "UP"]}
];

const foodQueue = [];

let gameDiff   = "easy";
let gameState  = "playing";
let currentSet = [];

const easyTimoutMs  = 30 * 1000;
const midTimoutMs   = 25 * 1000;
const hardTimeoutMs = 20 * 1000; 
let timerHandle = null;
let timoutMs    = easyTimoutMs;
let interval    = null;
let queueIdx    = 0;
let currentItem = "";
let completedItems = 0;

const mainStartBtnEl   = document.getElementById('main-start-btn');
const mainPageEl       = document.getElementById('main-page')
const gamePageEl       = document.getElementById('game-page');
const difficultyBtnEls = document.querySelectorAll('.difficulty-btn');
const gameStateEl      = document.getElementById('game-state');
const gameProgress     = document.getElementById('progress');
const gameItemBoxEl    = document.getElementById('item-box');
const gameSolutionEl   = document.getElementById('game-solution-id');
const gameNextMove     = document.getElementById('next-move');

function game_render()
{
  if(gameState === "failed")
  {
    gameStateEl.innerHTML = "Timeout You lost!"
    clearInterval(interval);
    clearTimeout(timerHandle);
  }
  else if (gameState === "won")
  {
    gameStateEl.innerHTML = "Good you won!"
    clearTimeout(timerHandle);
  }
  else
  {

  }
  game_progressBar();
}

function game_updateQueue ()
{
  if(queueIdx >= foodQueue.length)
  {
    clearTimeout(timerHandle);
    gameState = "won";
    return 
  }

  gameItemBoxEl.innerHTML = foodQueue[queueIdx].name;
  currentSet              = [...foodQueue[queueIdx].moves];

  gameNextMove.innerHTML = currentSet[0];

  currentItem = foodQueue[queueIdx].name;
  if(currentItem === foodTypes[0].name)
  {
    //gameSolutionEl.style.clipPath = "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"
  }
  else
  {
    gameSolutionEl.classList.remove('diamond')
    gameSolutionEl.classList.add('h-rectangle')
  }
  queueIdx++;
}

function game_resetRound ()
{

}

function game_processClicked (clicked)
{
  if(gameState !== "playing") return;

  if(currentSet[0] === clicked)
  {
    currentSet.shift();
    game_changeShape();
  }
 
  if(currentSet.length === 0)
  {
    game_updateQueue();
    completedItems++;
  }
  else
  {
    gameNextMove.innerHTML = currentSet[0];
  }
}

function game_changeShape ()
{
  if(currentItem === foodTypes[0].name)
  {
    console.log(currentSet.length)
    switch(currentSet.length)
    {
      case 3:
        gameSolutionEl.style.clipPath = "polygon(50% 0%, 100% 50%, 50% 150%, 0% 50%)"
        break;

      case 2:
        gameSolutionEl.style.clipPath = "polygon(50% 10%, 100% 50%, 50% 150%, 0% 50%)"
        break;

      case 1:
        gameSolutionEl.style.clipPath = "polygon(50% 0%, 100% 75%, 50% 75%, 0% 75%)"
        break;
    }
  }
  else
  {
    switch(currentSet.length)
    {
      case 3:
        break;

      case 2:
        break;

      case 1:
        break;

      case 0:
        break;
    }
  }
}

function game_progressBar()
{
  let progressPercent = 0;
  switch(gameDiff)
  {
    case "easy":
      progressPercent = (completedItems / 3) * 100 
      break;
    
    case "mid":
      progressPercent = (completedItems / 4) * 100 
      break;
    
    case "hard":
      progressPercent = (completedItems / 5) * 100 
      break;
  }
  gameProgress.style.width = `${progressPercent}%`;
}


function game_start()
{
  switch(gameDiff)
  {
    case "easy":
      foodQueue.length = 0;
      foodQueue.push(foodTypes[0], foodTypes[1], foodTypes[0]);
      timoutMs = easyTimoutMs;
      break;
    
    case "mid":
      foodQueue.length = 0;
      foodQueue.push(foodTypes[1], foodTypes[1], foodTypes[0], foodTypes[0]);
      timoutMs = midTimoutMs;
      break;
    
    case "hard":
      foodQueue.length = 0;
      foodQueue.push(foodTypes[0], foodTypes[1], foodTypes[1], foodTypes[0],  foodTypes[1]);
      timoutMs = hardTimeoutMs;
      break;
  }
  mainPageEl.style.display = 'none';
  gamePageEl.style.display = 'flex';
  game_updateQueue(); 
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


function game_init()
{
  game_setMainBtnsListeners();
  game_setGameBtnsListeners();
  timerHandle = setTimeout(() => 
  {
    gameState = "failed";
  }, timoutMs)
  interval = setInterval(game_render, 100);
}

game_init();