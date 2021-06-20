let greenButton = document.querySelector('.simon-button.green');
let redButton = document.querySelector('.simon-button.red');
let yellowButton = document.querySelector('.simon-button.yellow');
let blueButton = document.querySelector('.simon-button.blue');
let nextRoundBox = document.querySelector('#nextRoundBox');
let endRoundBox = document.querySelector('#endRoundBox');
let body = document.querySelector('body');
let headerTag = document.querySelector('#headerTag');
var currentRound = 0;
var computer = false;
var disableInputs;
var sound;
var soundLength = 1000;
var down = false;
var disableInputs;
var poppedSequence = [];
var gameTimer;
var soundSpacingTime;

const countdownMargin = 3000;
const roundPopUp = 3000;

function startGame(){
  var sequence = [];
  soundLength = 700;
  computer = false;
  currentRound = 0;
  down = false;
  soundSpacingTime = 1000;
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
  // console.log(curButton.style);
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
  },roundPopUp);  
  colorSequence.push(newColor());
  poppedSequence = colorSequence;
  playSequence(colorSequence);
  disableInputs = false;
  
}

function startTopTimer(timer){

  let counter = Math.floor((timer + countdownMargin)/1000);

  setInterval(function(){
    counter--;
    if (counter == 3)
    {
      headerTag.innerText.style="color:red; font-weight: bold;";

    }
    if (counter >= 0) {
      headerTag.innerText="You can start in: " + counter + " seconds";
    }
    if (counter == 0) {
      headerTag.innerText="GO!";
        clearInterval(counter);
    }
  }, 1000);
}


function playSequence(colorSequences){
  computer = true;
  calculateSoundLength();
  calculateSoundSpacingTime();
  let timerStarter = calculateStartTimer();
  startTopTimer(timerStarter);


  // console.log("playseq: " + computer);
  setTimeout(function(){
    for (let x = 0; x < colorSequences.length; x++ ){
      let color = colorSequences[x];
      setTimeout(function(){
        let curButton = document.querySelector('.' + color);
        let revertedStyle = curButton.style;
        playSound(color,computer,revertedStyle);
      },soundSpacingTime);  
    }
  }, timerStarter);

  setTimeout(function(){
    computer=false;
    gameTimer = startTimer();
  }, timerStarter + countdownMargin);
}

function calculateSoundLength(){
  soundLength = soundLength - (currentRound*10);
}

function calculateSoundSpacingTime(){
  soundSpacingTime = soundSpacingTime - (currentRound*10);
}

function calculateStartTimer(){
  let multiplier = poppedSequence.length;
  let timerStartTime = (multiplier * soundLength) + soundSpacingTime + 1000;
  return timerStartTime;
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
