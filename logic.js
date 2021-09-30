let snakeSpeed = 10;
let foodPosition = {
    x: 0,
    y: 0
}
const snakeBoard = document.querySelector(".board");
timeSinceLastRender = 0;
let x = 0,
  y = 0;
let snakeBody = [
  { x: 10, y: 10},
  {x: 10, y:11}
];
updateFood();
drawFood()


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
  let border_radius = 1;
  snakeBody.forEach((cell,idx) => {
    const element = document.createElement("div");
    element.style.gridRowStart = cell.y;
    element.style.gridColumnStart = cell.x;
    element.classList.add("cell");
    element.style.width = String( Math.max((5*(snakeBody.length - idx)/snakeBody.length), 3)  ) + "vmin";
    element.style.height = String( Math.max((5*(snakeBody.length - idx)/snakeBody.length), 3) ) + "vmin";
    // element.style.height = '2vmin';
    border_radius += 1;

    snakeBoard.appendChild(element);
  });
  for(let i =1; i<snakeBody.length; i++)
  {
    if(JSON.stringify(snakeBody[0]) === JSON.stringify(snakeBody[i]))
    {
      alert("game is over refresh the page to restart");
      x = 0;
      y =0;
    }
  }
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
    // console.log(snakeBody[0]);
    if(snakeBody[0].x === 0 || snakeBody[0].x === 21 || snakeBody[0].y=== 0 || snakeBody[0].y ===21 )
    {
        alert("game is over refresh to restart :)");
        x = 0;
        y = 0;

    }
  }
  if(snakeBody[0].x === foodPosition.x && snakeBody[0].y === foodPosition.y)
  {
      snakeBody.push({...snakeBody[snakeBody.length - 1]})
      updateFood();
  }
}



window.addEventListener("keydown", (e) => {
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
  let isFoodInSnakeBody = false;

  do
    {
      let isFoodInSnakeBody = false;
      for(let i=0; i<snakeBody.length; i++)
      {
        if( JSON.stringify(foodPosition) === JSON.stringify(snakeBody[i]))
        {
          isFoodInSnakeBody = true;
        }
       if(isFoodInSnakeBody)
       {
         updateFood();
       }
      }
    }
    while(isFoodInSnakeBody);

    const food = document.createElement("div");
    food.style.gridColumnStart = foodPosition.x;
    food.style.gridRowStart = foodPosition.y;
    food.classList.add("food")
    snakeBoard.appendChild(food);
}
function updateFood()
{
    foodPosition.x = parseInt(Math.random()*19 + 1);
    foodPosition.y = parseInt(Math.random()*19 + 1);
   

}
