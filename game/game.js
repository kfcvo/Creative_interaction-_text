var chosenColor = '';
var colors = ['pink', 'lightgreen', 'lightblue', 'yellow', 'orange', 'purple'];
var score = 0;
var gameOver = false;
//开始
function startGame() {
  chosenColor = document.getElementById('colorPicker').value;
  var game = document.getElementById('gameContainer');
  game.innerHTML = '';

  var scoreColor = chosenColor || colors[Math.floor(Math.random() * colors.length)];
//显示文本颜色
  var scoreDisplay = document.getElementById('scoreText');
  scoreDisplay.innerText = '点击 ' + scoreColor + ' 颜色的方块来得到7分！';
  scoreDisplay.style.color = scoreColor;
//界面中可同时存在方块的最大数
  function createBlock() {
    var game = document.getElementById('gameContainer');
    var blocks = document.querySelectorAll('.block');

    if (blocks.length >= 15) {
      return;
    }
//创建方块
    var block = document.createElement('div');
    var blockColor = (chosenColor && Math.random() < 0.5) ? chosenColor : colors[Math.floor(Math.random() * colors.length)];

    block.className = 'block';
    block.style.backgroundColor = blockColor;
    block.style.left = Math.random() * (game.offsetWidth - block.offsetWidth) + 'px';
    block.style.top = '0px';
    block.onclick = (function(chosenColor) {
      return function() {
        if (!gameOver) {
          var blockColor = block.style.backgroundColor;
          if (blockColor === chosenColor) {
            score++;
            document.getElementById('score').innerText = '得分：' + score;
            if (score >= 7) {
              endGame();
            }
          } else {
            if (score > 0) {
              score--;
              document.getElementById('score').innerText = '得分：' + score;
            }
          }
          if (block.parentNode) { // 检查父节点是否存在
            block.parentNode.removeChild(block);
          }
        }
      };
    })(chosenColor);

    game.appendChild(block);

    var speed = Math.random() * 10 + 5;
    var interval = setInterval(function() {
      if (!gameOver) {
        var currentTop = parseInt(block.style.top);
        if (currentTop < game.offsetHeight - block.offsetHeight) {
          block.style.top = (currentTop + speed) + 'px';
        } else {
          clearInterval(interval);
          if (!gameOver && block.parentNode) {
            block.parentNode.removeChild(block);
            createBlock();
          }
        }
      }
    }, 50);
  }

  setInterval(function() {
    if (!gameOver) {
      createBlock();
    }
  }, 1000);
}

function endGame() {
  if (!gameOver) {
    gameOver = true;
    var winMessage = document.getElementById('win');
    winMessage.style.display = 'block';
    document.getElementById('finalScore').innerText = score;
  }
}

function resetGame() {
  gameOver = false;
  score = 0;
  document.getElementById('score').innerText = '得分：' + score;
  var winMessage = document.getElementById('win');
  winMessage.style.display = 'none';
  startGame();
}
