let greenButton = document.querySelector('.simon-button.green');
let redButton = document.querySelector('.simon-button.red');
let yellowButton = document.querySelector('.simon-button.yellow');
let blueButton = document.querySelector('.simon-button.blue');
let nextRoundBox = document.querySelector('#nextRoundBox');
let body = document.querySelector('body');
var currentRound = 0;

function disableButtons(){
  greenButton.disabled = true;
  redButton.disabled = true;
  yellowButton.disabled = true;
  blueButton.disabled = true;
}

function enableButtons(){
  greenButton.disabled = false;
  redButton.disabled = false;
  yellowButton.disabled = false;
  blueButton.disabled = false;
}


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
  disableButtons();
  currentRound++;
  nextRoundBox.innerText = "Round: " + currentRound;
  nextRoundBox.style.visibility = "visible";
  setTimeout(function(){
    nextRoundBox.style.visibility = "hidden";
  },4000);  
  colorSequence.push(newColor());
  playSequence(colorSequence);
  enableButtons();
}

function playSequence(colorSequences){
  setTimeout(function(){
    for (let x = 0; x < colorSequences.length; x++ ){
      let color = colorSequences[x];
      setTimeout(function(){
        let curButton = document.querySelector('.' + color);
        let revertedStyle = curButton.style;
        playSound(color,time,player,revertedStyle);
      },1000);  
    }
  }, 6500);

}

function startGame(){
  
  if (currentRound == 0)
  {
    let sequence = [];
    let titleGone = document.querySelector('h1');
    titleGone.innerHTML="";
    nextRound(sequence);
  }
  nextRound(sequence);

}


var sound;
var time = 500;
var player = true;

function playSound(buttonName, time, player, buttonStyle) {
  let curButton = document.querySelector('.' + buttonName);
  sound = new Audio("sound-" + buttonName + ".m4a");
  sound.play();

  if(player){
    setTimeout(function(){
      sound.pause();
      sound.currentTime = 0;
      curButton.style = buttonStyle; 
    },time);  
  }else{

  }
  
}

document.addEventListener('keydown', function(event) {
  if(event.code == "ArrowDown"){
    let sequence = [];
    nextRound(sequence);
    let originalStyle = redButton.style;
    redButton.style.backgroundColor = "#ff5e5e";
    playSound("red", time, player, originalStyle);
  }
  if(event.code == "ArrowUp"){
    let originalStyle = greenButton.style;
    greenButton.style.backgroundColor = "#55ff7c";
    playSound("green", time, player);
  }
  if(event.code == "ArrowLeft"){
    let originalStyle = blueButton.style;
    blueButton.style.backgroundColor = "#57b6ff";
    playSound("blue", time, player);
  }
  if(event.code == "ArrowRight"){
    let originalStyle = yellowButton.style;
    yellowButton.style.backgroundColor = "#ffd557";
    playSound("yellow", time, player);
  }
});

/* document.addEventListener('onkeyup', function(event) {
  if(event.code == "ArrowDown"){
    redButton.style.backgroundColor = "#ff0505";
    sound.pause();
  }
  if(event.code == "ArrowUp"){
    greenButton.style.backgroundColor = "#ff0505";
    playSound("green");
  }
  if(event.code == "ArrowLeft"){
    blueButton.style.backgroundColor = "#ff0505";
    playSound("green");
  }
  if(event.code == "ArrowRight"){
    yellowButton.style.backgroundColor = "#ff0505";
    playSound("green");
  }
}); */



function startTimer(){
    var counter = 15;
    setInterval(function() {
      counter--;
      if (counter >= 0) {
        span = document.getElementById("count");
        span.innerHTML = counter;
      }
      if (counter == 0) {
          alert('sorry, out of time');
          clearInterval(counter);
      }
    }, 1000);
  }
  function start()
  {
      document.getElementById("count").style="color:green;";
      startTimer();
      startGame();
  };