const foodTypes = 
[
  {name: "Sambosa" , moves: ["LEFT", "UP", "RIGHT", "NEXT"]},
  {name: "Springrolls" , moves: ["UP", "LEFT", "RIGHT", "UP", "UP", "NEXT"]}
];

const foodQueue = [];

let gameDiff   = "easy";
let gameState  = "playing";
let currentSet = [];

const easyTimoutMs  = 27 * 1000;
const midTimoutMs   = 25 * 1000;
const hardTimeoutMs = 20 * 1000; 
let timerHandle    = null;
let timoutMs       = easyTimoutMs;
let interval       = null;
let queueIdx       = 0;
let currentItem    = "";
let completedItems = 0;
let timerBoxSec    = 0;

const mainStartBtnEl   = document.getElementById('main-start-btn');
const mainPageEl       = document.getElementById('main-page')
const gamePageEl       = document.getElementById('game-page');
const difficultyBtnEls = document.querySelectorAll('.difficulty-btn');
const gameStateEl      = document.getElementById('game-state');
const gameProgress     = document.getElementById('progress');
const gameItemBoxEl    = document.getElementById('item-box');
const gameSolutionEl   = document.getElementById('game-solution-id');
const gameNextMove     = document.getElementById('next-move');
const gameTimerBoxEl   = document.getElementById('timer-box');

function game_render()
{
  if(gameState === "failed")
  {
    gameStateEl.innerHTML = "Timeout Its Midnight, I want Shawarma"
    clearInterval(interval);
    clearTimeout(timerHandle);
    timerBoxSec = 0;
  }
  else if (gameState === "won")
  {
    if(gameDiff === "easy")
    {
      gameStateEl.innerHTML = "Good well done!"
    } else if (gameDiff === "mid")
    {
      gameStateEl.innerHTML = "* Amazing *"
    }
    else
    {
      gameStateEl.innerHTML = "Get A life!"
    }
    clearInterval(interval);
    clearTimeout(timerHandle);
  }
  if(timerBoxSec !== 0) timerBoxSec -= 100;
  gameTimerBoxEl.innerHTML = timerBoxSec / 1000;
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
  gameSolutionEl.classList.remove('springroll-5')
  gameSolutionEl.classList.remove('samosa-3')
  queueIdx++;
}

function game_resetRound ()
{
  gameState      = "playing";
  currentSet     = [];
  queueIdx       = 0;
  currentItem    = "";
  completedItems = 0;
  gameStateEl.innerHTML = "Playing..."
  clearInterval(interval);
  clearTimeout(timerHandle);
  game_start();

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
    switch(currentSet.length)
    {
      case 3:
        gameSolutionEl.classList.add('samosa-1');
        break;

      case 2:
        gameSolutionEl.classList.remove('samosa-1');
        gameSolutionEl.classList.add('samosa-2');
        break;

      case 1:
        gameSolutionEl.classList.remove('samosa-2');
        gameSolutionEl.classList.add('samosa-3');
        break;
    }
  }
  else
  {
    switch(currentSet.length)
    {
      case 5:
        gameSolutionEl.classList.add('springroll-1');
        break;

      case 4:
        gameSolutionEl.classList.remove('springroll-1');
        gameSolutionEl.classList.add('springroll-2');
        break;

      case 3:
        gameSolutionEl.classList.remove('springroll-2');
        gameSolutionEl.classList.add('springroll-3');
        break;

      case 2:
        gameSolutionEl.classList.remove('springroll-3');
        gameSolutionEl.classList.add('springroll-4');
        break;

      case 1:
        gameSolutionEl.classList.remove('springroll-4');
        gameSolutionEl.classList.add('springroll-5');
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
  timerHandle = setTimeout(() => 
  {
    gameState = "failed";
  }, timoutMs)
  timerBoxSec = timoutMs;
  interval = setInterval(game_render, 100);
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
}

game_init();