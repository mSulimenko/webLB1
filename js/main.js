let usernamePlaceholder = document.getElementById("usernamePlaceholder");
let savedUsername = localStorage.getItem("tetris.username");
if (savedUsername) {
    usernamePlaceholder.textContent = `Игрок: ${savedUsername}`;
}


import {Tetris} from "./tetris.js";
import {View} from "./view.js";

let requestId;
let timeoutId;
let speed = 700;
const tetris = new Tetris();
const view = new View(320, 640, 20, 10);

initKeydown();
moveDown();

function initKeydown(){
    document.addEventListener('keydown', onKeydown);
}

function onKeydown(event){
    switch(event.key){
        case 'ArrowUp':
            rotate();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        default:
            break;
    }
}

function rotate(){
    tetris.rotate();
    view.draw(tetris.playfield, tetris.tetromino);
}

function moveDown(){
    tetris.moveDown();
    view.draw(tetris.playfield, tetris.tetromino);
    view.drawNext(tetris);
    view.drawScore(tetris.score);
    view.drawLevel(tetris.level);
    stopLoop();
    startLoop();

    if(tetris.gameOver){
        GameOver();
    }
}

export function increaseSpeed(level) {
    speed = 700 - (level - 1) * 200;
    timeoutId = setTimeout(() => requestAnimationFrame(moveDown), speed);
}

function GameOver(){
    stopLoop();
    document.removeEventListener('keydown', onKeydown);
}

function moveLeft(){
    tetris.moveLeft();
    view.draw(tetris.playfield, tetris.tetromino);
}

function moveRight(){
    tetris.moveRight();
    view.draw(tetris.playfield, tetris.tetromino);
}

function startLoop(){
    timeoutId = setTimeout(()=> requestAnimationFrame(moveDown), speed);
}

function stopLoop(){
    cancelAnimationFrame(requestId);
    clearTimeout(timeoutId);
}