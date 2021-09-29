let snakeSpeed = 20;
let foodPosition = {
    x: 0,
    y: 0
}
updateFood();
let snakeBody = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const snakeBoard = document.querySelector(".board");
timeSinceLastRender = 0;
let x = 0,
  y = 0;


function main(timeStamp) {
  window.requestAnimationFrame(main);
  //    console.log(timeStamp);
  if (timeStamp > timeSinceLastRender + 1000 / snakeSpeed) {
    timeSinceLastRender = timeStamp;
    updataSnakePosition();
    drawSnake();
    return;
  }
}
window.requestAnimationFrame(main);

function drawSnake() {
  snakeBody.forEach((cell) => {
    const element = document.createElement("div");
    element.style.gridRowStart = cell.y;
    element.style.gridColumnStart = cell.x;
    element.classList.add("cell");
    snakeBoard.appendChild(element);
  });
}
function updataSnakePosition() {
    if (x || y) {
        snakeBoard.innerHTML = "";
        drawFood()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
      //   console.log(snakeBody[i+1]);
      snakeBody[i + 1] = { ...snakeBody[i] };
      //   console.log(snakeBody[i+1]);
    }
    snakeBody[0].x += x;
    snakeBody[0].y += y;
  }
  if(snakeBody[0].x === foodPosition.x && snakeBody[0].y === foodPosition.y)
  {
      snakeBody.push({...snakeBody[snakeBody.length - 1]})
      updateFood();
  }
}
window.addEventListener("keydown", (e) => {
  console.log(e.key);
  switch (e.key) {
    case "ArrowUp":
      if (!y) {
        x = 0;
        y = -1;
      }
      break;
    case "ArrowDown":
      if (!y) {
        x = 0;
        y = 1;
      }
      break;
    case "ArrowRight":
      if (!x) {
        x = 1;
        y = 0;
      }
      break;
    case "ArrowLeft":
      if (!x) {
        x = -1;
        y = 0;
      }
      break;
    case " ":
      x = 0;
      y = 0;
  }
});



function drawFood()
{
    const food = document.createElement("div");
    food.style.gridColumnStart = foodPosition.x;
    food.style.gridRowStart = foodPosition.y;
    food.classList.add("food")
    snakeBoard.appendChild(food);
}
function updateFood()
{
    foodPosition.x = parseInt(Math.random()*20 +1)
    foodPosition.y = parseInt(Math.random()*21 +1)

}