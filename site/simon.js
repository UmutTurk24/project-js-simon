let greenButton = document.querySelector('.simon-button.green');
let redButton = document.querySelector('.simon-button.red');
let yellowButton = document.querySelector('.simon-button.yellow');
let blueButton = document.querySelector('.simon-button.blue');
let nextRoundBox = document.querySelector('#nextRoundBox');
let endRoundBox = document.querySelector('#endRoundBox');
let body = document.querySelector('body');
var currentRound = 0;
var computer = false;
var disableInputs;
var sound;
var time = 500;
var down = false;
var disableInputs;
var poppedSequence = [];
var gameTimer;

function startGame(){
  var sequence = [];
  let titleGone = document.querySelector('h1');
  titleGone.innerHTML="";
  nextRound(sequence);
}

function checkUserInput(currentColor){
  poppedColor = poppedSequence.pop();
  if (currentColor != poppedColor){
    setTimeout(function(){
      gameOver();
    },500);  
  }
  if(poppedSequence.length == 0){
    setTimeout(function(){
      endRound();
      resetTimer();
    },2000);  
  }
}



function endRound(){
  endRoundBox.innerText = " Congratulations on completing round: " + currentRound;
  endRoundBox.style.visibility = "visible";
  setTimeout(function(){
    endRoundBox.style.visibility = "hidden";
  },4000);
  setTimeout(function(){
    nextRound();
  },5000);  
}

function gameOver(){
  disableInputs = true;
  endRoundBox.innerText = "Sorry, you lost on round: " + currentRound;
  endRoundBox.style.visibility = "visible";



  var counter = 10;
  setInterval(function() {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("countdown");
      span.innerText = "In" + counter.toString(base) + "Seconds, The Page Will Be Reloaded";
    }
    if (counter == 0) {
      clearInterval(counter);
      location.reload();
    }
    }, 1000);
  
}


function playSound(buttonName, time, computer, buttonStyle) {
  let curButton = document.querySelector('.' + buttonName);
  sound = new Audio("sound-" + buttonName + ".m4a");
  sound.play();

  if(computer){
    setTimeout(function(){
      sound.pause();
      sound.currentTime = 0;
      curButton.style = buttonStyle; 
    },time);  
  }
}

document.addEventListener('keydown', function(event) {

  if(!disableInputs){
    if(!down) {
      down = true;
      if(event.code == "ArrowDown"){
        let originalStyle = redButton.style;
        redButton.style.backgroundColor = "#ff5e5e";
        playSound("red", time, computer, originalStyle);
        checkUserInput("red");
      }
      if(event.code == "ArrowUp"){
        let originalStyle = greenButton.style;
        greenButton.style.backgroundColor = "#55ff7c";
        playSound("green", time, computer, originalStyle);
        checkUserInput("green");
      }
      if(event.code == "ArrowLeft"){
        let originalStyle = blueButton.style;
        blueButton.style.backgroundColor = "#57b6ff";
        playSound("blue", time, computer, originalStyle);
        checkUserInput("blue");
      }
      if(event.code == "ArrowRight"){
        let originalStyle = yellowButton.style;
        yellowButton.style.backgroundColor = "#ffd557";
        playSound("yellow", time, computer, originalStyle);
        checkUserInput("yellow");
      } 
    }
  }
  
}, false);

document.addEventListener('keyup', function (event) {
  if(!disableInputs){
    sound.pause();
      sound.currentTime = 0;
      if(event.code == "ArrowDown"){
        redButton.style.backgroundColor = "#DB2828";
      }
      if(event.code == "ArrowUp"){
        greenButton.style.backgroundColor = "#21BA45";
      }
      if(event.code == "ArrowLeft"){
        blueButton.style.backgroundColor = "#2185D0";
      }
      if(event.code == "ArrowRight"){
        yellowButton.style.backgroundColor = "#FBBD08";
      }
      down = false;
  }
}, false);

function newColor(){
  let newNum = Math.floor(Math.random() * 4) + 1;
  let nextColor;
  if(newNum = 1){
    nextColor = "green";
  }
  else if(newNum = 2){
    nextColor = "red";
  }
  else if(newNum = 3){
    nextColor = "yellow";
  }
  else{
    nextColor = "blue";
  }
  return nextColor;
}

function nextRound(colorSequence){
  disableInputs = true;
  currentRound++;
  nextRoundBox.innerText = "Round: " + currentRound;
  nextRoundBox.style.visibility = "visible";
  setTimeout(function(){
    nextRoundBox.style.visibility = "hidden";
  },4000);  
  colorSequence.push(newColor());
  poppedSequence = sequence;
  playSequence(colorSequence);
  disableInputs = false;
  gameTimer = startTimer();
}

function playSequence(colorSequences){
  computer = true;
  setTimeout(function(){
    for (let x = 0; x < colorSequences.length; x++ ){
      let color = colorSequences[x];
      setTimeout(function(){
        let curButton = document.querySelector('.' + color);
        let revertedStyle = curButton.style;
        playSound(color,time,computer,revertedStyle);
      },1000);  
    }
  }, 6500);
  computer=false;
}

function startTimer(){
  var counter = 30;
  setInterval(function() {
    counter--;
    if (counter == 10)
    {
      document.getElementById("count").style="color:darkgreen; font-weight: bold;";

    }
    if (counter >= 0) {
      span = document.getElementById("count");
      span.innerHTML = counter;
    }
    if (counter == 0) {
        gameOver();
        clearInterval(counter);
    }
  }, 1000);
}

function resetTimer(){
  clearInterval(gameTimer);
  gameTimer = 0;
}

function start()
{
    document.getElementById("count").style="color:green;";
    startGame();
}
