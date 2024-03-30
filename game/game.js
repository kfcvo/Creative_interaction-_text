var colors = ['pink', 'lightgreen', 'lightblue', 'yellow', 'orange','purple'];
var score = 0;
var gameOver = false;

function startGame() {
  var gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = '';//清空元素

  var scoreColorIndex = Math.floor(Math.random() * colors.length);  // 显示得分的颜色
  var scoreColor = colors[scoreColorIndex];//获取颜色
  var scoreColorDisplay = document.getElementById('scoreText');
  scoreColorDisplay.innerText = '点击 ' + scoreColor + ' 颜色的方块来得分！';
  scoreColorDisplay.style.color = scoreColor;

  // 开始掉落方块
  function createBlock() {
    var gameContainer = document.getElementById('gameContainer');
    var blocks = document.querySelectorAll('.block');

    // 判断当前方块数量
    if (blocks.length >= 15) {
      return;
    }

    var block = document.createElement('div');
    var randomColorIndex = Math.floor(Math.random() * colors.length);
    block.className = 'block';
    block.style.backgroundColor = colors[randomColorIndex];
    block.style.left = Math.random() * (gameContainer.offsetWidth - block.offsetWidth) + 'px';
    block.style.top = '0px';
    block.onclick = function() {
      if (!gameOver) {
        var targetColorIndex = colors.indexOf(scoreColor);
        var blockColorIndex = colors.indexOf(block.style.backgroundColor);
        if (blockColorIndex === targetColorIndex) {
          score++;
          document.getElementById('score').innerText = '得分：' + score;
          if (score >= 7) {
            endGame(); // 判断得分
          }
        } else {
          if (score > 0) {
            score--;
            document.getElementById('score').innerText = '得分：' + score;
          }
        }
        block.parentNode.removeChild(block);
      }
    };
    gameContainer.appendChild(block);
    var speed = Math.random() * 10 + 5; // 随机速度
    var interval = setInterval(function() {
      if (!gameOver) {
        var currentTop = parseInt(block.style.top);
        if (currentTop < gameContainer.offsetHeight - block.offsetHeight) {
          block.style.top = (currentTop + speed) + 'px';
        } else {
          clearInterval(interval);
          if (!gameOver) {
            block.parentNode.removeChild(block);
            createBlock();
          }
        }
      }
    }, 50);//每隔 50 毫秒执行一次函数
  }

  // 持续创建方块
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
