let greenButton = document.querySelector('.simon-button.green');
let redButton = document.querySelector('.simon-button.red');
let yellowButton = document.querySelector('.simon-button.yellow');
let blueButton = document.querySelector('.simon-button.blue');
let nextRoundBox = document.querySelector('#nextRoundBox');
let endRoundBox = document.querySelector('#endRoundBox');
let body = document.querySelector('body');
let headerTag = document.querySelector('#headerTag');
var currentRound;
var computer;
var disableInputs;
var sound;
var soundLength;
var down;
var poppedSequence = [];
var gameTimer;
var soundSpacingTime;
var sequence = [];
var pauseSegment;

const countdownMargin = 3000;
const roundPopUp = 3000;
const endRoundPop = 2000;
const nextRoundPrep = 3000;

function startGame(){
  sequence = [];
  soundLength = 450;
  computer = false; // try it with true
  currentRound = 0;
  down = false;
  soundSpacingTime = 1000;
  pauseSegment = 500;
  nextRound();
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
  clearInterval(gameTimer);
  let startButtonText = document.getElementById("count");
  startButtonText.innerText = "Nice!";
  headerTag.innerText = "Prepare for the next round!";
  setTimeout(function(){
    endRoundBox.style.visibility = "hidden";
  },endRoundPop);
  setTimeout(function(){
    nextRound();
  },nextRoundPrep);  
}

function gameOver(){
  disableInputs = true;
  endRoundBox.innerText = "Sorry, you lost on round: " + currentRound;
  endRoundBox.style.visibility = "visible";

  var counter = 10;
  setInterval(function() {
    counter--;
    if (counter >= 0) {
      let span = document.getElementById("countdown");
      span.innerText = "In" + counter.toString() + "Seconds, The Page Will Be Reloaded";
    }
    if (counter == 0) {
      clearInterval(counter);
      location.reload();
    }
    }, 1000);
}

function playSound(buttonName, computer, buttonStyle) {
  
  let curButton = document.querySelector('.' + buttonName);
  sound = new Audio("sound-" + buttonName + ".m4a");
 console.log(curButton)
  sound.play();

  if(computer){

    if(buttonName == "red"){
      curButton.style.backgroundColor = "#ff5e5e";
    }
    else if (buttonName == "green"){
      curButton.style.backgroundColor = "#55ff7c";
    }
    else if (buttonName == "blue"){
      curButton.style.backgroundColor = "#57b6ff";
    }
    else if(buttonName == "yellow"){
      curButton.style.backgroundColor = "#ffd557";
    }
    
    // console.log(curButton.value);
    setTimeout(function(){
      sound.pause();
      sound.currentTime = 0;
      curButton.style = buttonStyle; 
    },soundLength);  
  }
}

document.addEventListener('keydown', function(event) {

  if(!disableInputs){
    if(!down) {
      down = true;
      if(event.code == "ArrowDown"){
        let originalStyle = redButton.style;
        redButton.style.backgroundColor = "#ff5e5e";
        playSound("red", computer, originalStyle);
        checkUserInput("red");
      }
      if(event.code == "ArrowUp"){
        let originalStyle = greenButton.style;
        greenButton.style.backgroundColor = "#55ff7c";
        playSound("green", computer, originalStyle);
        checkUserInput("green");
      }
      if(event.code == "ArrowLeft"){
        let originalStyle = blueButton.style;
        blueButton.style.backgroundColor = "#57b6ff";
        playSound("blue", computer, originalStyle);
        checkUserInput("blue");
      }
      if(event.code == "ArrowRight"){
        let originalStyle = yellowButton.style;
        yellowButton.style.backgroundColor = "#ffd557";
        playSound("yellow", computer, originalStyle);
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
  let newNum = Math.floor((Math.random() * 4) + 1);
  let nextColor;
  if(newNum == 1){
    nextColor = "green";
  }
  else if(newNum == 2){
    nextColor = "red";
  }
  else if(newNum == 3){
    nextColor = "yellow";
  }
  else{
    nextColor = "blue";
  }
  return nextColor;
}


function nextRound(){
  disableInputs = true;
  currentRound++;
  nextRoundBox.innerText = "Round: " + currentRound;
  nextRoundBox.style.visibility = "visible";

  setTimeout(function(){
    nextRoundBox.style.visibility = "hidden";
  },roundPopUp);  

  let myNextColor = newColor();
  // console.log(myNextColor);
  sequence.push(myNextColor);
  poppedSequence = [...sequence];
  playSequence();
  disableInputs = false;
}

function startTopTimer(timer){

  let counter = Math.floor((timer + countdownMargin)/1000);

  setInterval(function(){
    counter--;
    if (counter == 3){
      headerTag.innerText.style="color:red; font-weight: bold;";
    }
    if (counter >= 0) {
      headerTag.innerText="You can start in: " + counter + " seconds";
    }
    if (counter == 0){
      headerTag.innerText="GO!";
        clearInterval(counter);
    }
  }, 1000);
}


function playSequence(){
  computer = true;
  calculateSoundLength();
  calculateSoundSpacingTime();
  let timerStarter = calculateStartTimer();

  setTimeout(function(){
    startTopTimer(timerStarter);
  }, roundPopUp-500);

  setTimeout(function(){
    for (let x = 1; x < (sequence.length+1); x++ ){ // add loop multiplier, that's why +1
      
      setTimeout(function(){
        let color = sequence[x-1];
        let curButton = document.querySelector('.' + color);
        let revertedStyle = curButton.style;
        playSound(color,computer,revertedStyle);
      },soundSpacingTime * x);  
    }
  }, timerStarter);

  setTimeout(function(){
    computer=false;
    startTimer();
  }, timerStarter + countdownMargin);
}

function calculateSoundLength(){
  soundLength = soundLength - (currentRound*10);
}

function calculateSoundSpacingTime(){
  pauseSegment = pauseSegment - (currentRound * 10);
  soundSpacingTime = pauseSegment + soundLength + 50;
}

function calculateStartTimer(){
  let multiplier = sequence.length;
  let timerStartTime = (multiplier * soundSpacingTime) + 1000;
  return timerStartTime;
}

function startTimer(){
  var counter = 30;
  gameTimer = setInterval(function() {
    counter--;

    if (counter == 10){
      document.getElementById("count").style="color:darkgreen; font-weight: bold;";
    }
    if (counter >= 0) {
      let span = document.getElementById("count");
      span.innerText = counter + " seconds left";
    }
    if (counter == 0) {
        gameOver();
        resetTimer();
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
