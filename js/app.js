const mainStartBtnEl = document.getElementById('main-start-btn');
const mainPageEl     = document.getElementById('main-page')
const gamePageEl     = document.getElementById('game-page');

mainStartBtnEl.addEventListener('click', () => 
{
  mainPageEl.style.display = 'none';
  gamePageEl.style.display = 'flex'
})

const foodTypes = 
[
  {name: "Sambosa" , moves: ["UP", "ADD", "LEFT", "RIGHT"]},
  {name: "Springrolls" , moves: ["UP", "LEFT", "RIGHT", "ADD", "UP", "UP "]}
];

let gameDiff = "easy";

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

function game_process ()
{

}

function  game_render()
{

}

function game_init()
{

}