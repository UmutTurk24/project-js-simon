function newColor(){
  let newNum = Math.floor(Math.random() * 4) + 1;
  return newNum;
}

function nextRound(){

}

function playSequence(){

}

function playGame(){
  let sequence = [];

}





let greenButton = document.querySelector('.simon-button.green');
greenButton.addEventListener('click', function() {
  alert('You clicked the green button');
});

let redButton = document.querySelector('.simon-button.red');
redButton.addEventListener('click', function() {
  alert('You clicked the red button');
});

let yellowButton = document.querySelector('.simon-button.yellow');
yellowButton.addEventListener('click', function() {
  alert('You clicked the yellow button');
});

let blueButton = document.querySelector('.simon-button.blue');
blueButton.addEventListener('click', function() {
  alert('You clicked the blue button');
});


function PlaySound() {
  alert("hello");
  var sound = new audio();
  bflat.src = "bflat.mp3";
  document.getElementById(bflat);
  bflat.Play();
}

document.addEventListener('keydown', function(event) {
  if(event.code == "ArrowDown"){
    document.querySelector(`#colorText`).style.color = "brown";
  }
  if(event.code == "ArrowUp"){
    document.querySelector(`#colorText`).style.color = "brown";
  }
  if(event.code == "ArrowLeft"){
    document.querySelector(`#colorText`).style.color = "brown";
  }
  if(event.code == "ArrowRight"){
    document.querySelector(`#colorText`).style.color = "brown";
  }

});



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
  };