// Variables =========================================================

// array of all moles.................................................
const moles = [
  {
    state: "sad",
    timeToNext: getTimeToNext("sad"),
    king: false,
    node: document.querySelector("#hole-0")
  },
  {
    state: "sad",
    timeToNext: getTimeToNext("sad"),
    king: false,
    node: document.querySelector("#hole-1")
  },
  {
    state: "sad",
    timeToNext: getTimeToNext("sad"),
    king: false,
    node: document.querySelector("#hole-2")
  },
  {
    state: "sad",
    timeToNext: getTimeToNext("sad"),
    king: false,
    node: document.querySelector("#hole-3")
  },
  {
    state: "sad",
    timeToNext: getTimeToNext("sad"),
    king: false,
    node: document.querySelector("#hole-4")
  },
  {
    state: "sad",
    timeToNext: getTimeToNext("sad"),
    king: false,
    node: document.querySelector("#hole-5")
  },
  {
    state: "sad",
    timeToNext: getTimeToNext("sad"),
    king: false,
    node: document.querySelector("#hole-6")
  },
  {
    state: "sad",
    timeToNext: getTimeToNext("sad"),
    king: false,
    node: document.querySelector("#hole-7")
  },
  {
    state: "sad",
    timeToNext: getTimeToNext("sad"),
    king: false,
    node: document.querySelector("#hole-8")
  },
  {
    state: "sad",
    timeToNext: getTimeToNext("sad"),
    king: false,
    node: document.querySelector("#hole-9")
  }
];

// Game properties ...................................................
const game = {
  lastRender: 0,
  nextRender: Date.now(),
  isFinish: false, 
  FRAME_RATE: 100,
  WIN_SCORE: 10,
  score: 0
};

// game node .........................................................
const bgGame = document.querySelector(".bg-game");

// game over node ....................................................
const bgGameOver = document.querySelector(".bg-game-over");


// Functions =========================================================

// call the next frame ...............................................
function nextFrame () {
  
  // check if game finish
  if(game.isFinish) return;

  const now = Date.now();
  // check if time to next frame
  if (game.nextRender <= now){
    for (let i = 0; i < moles.length; i++) {
      //check if time to next status of moles[i]
      if (moles[i].timeToNext <= now) {
        getNextStatus(moles[i]);
      }
    }
    game.nextRender = now + game.FRAME_RATE;
  }
  requestAnimationFrame(nextFrame);
}

// get next status of mole ...........................................
function getNextStatus (mole) {
  switch (mole.state) {
    case "sad":
    case "fed":
      getLeavingState(mole);
      break;
    case "leaving":
      getGoneState(mole);
      break;
    case "gone":
      getHungryState(mole);
      break;
    case "hungry":
      getSadState(mole);
      break;
  }
}

// get mole with state leaving .......................................
function getLeavingState (mole) {
  mole.state = "leaving";
  mole.timeToNext = getTimeToNext(mole.state);
  if(mole.king) {
    mole.node.firstElementChild.src = "images/king-mole-leaving.png";  
  } else {
    mole.node.firstElementChild.src = "images/mole-leaving.png";
  } 
  if (game.score >= game.WIN_SCORE) {
    bgGame.classList.add("hiden");
    bgGameOver.classList.remove("hiden");
    game.isFinish = true;
  }
}

// get mole with state gone ..........................................
function getGoneState (mole) {
  mole.state = "gone";
  mole.timeToNext = getTimeToNext(mole.state);
  mole.king = false;
  mole.node.firstElementChild.classList.add("gone");
}

// get mole with state hungry ........................................
function getHungryState (mole) {
  mole.state = "hungry";
  mole.timeToNext = getTimeToNext(mole.state);
  mole.king = getKing();
  if(mole.king) {
    mole.node.firstElementChild.src = "images/king-mole-hungry.png";  
  } else {
    mole.node.firstElementChild.src = "images/mole-hungry.png";
  }
  mole.node.firstElementChild.classList.remove("gone");
  mole.node.firstElementChild.classList.add("hungry");
}

// get mole with state sad ...........................................
function getSadState(mole) {
  mole.state = "sad";
  mole.timeToNext = getTimeToNext(mole.state);
  if(mole.king) {
    mole.node.firstElementChild.src = "images/king-mole-sad.png";  
  } else {
    mole.node.firstElementChild.src = "images/mole-sad.png";
  }
  mole.node.firstElementChild.classList.remove("hungry");
}

// get time to next state ...........................................
function getTimeToNext (state) {
  switch(state){
    case "leaving":
    case "fed":
      return Date.now() + 500;
      break;
    case "gone":
      return Date.now() + (Math.floor(Math.random() * 18000) + 2000);
      break;
    case "hungry":
    case "sad":
      return Date.now() + 2000;
      break;
  }
}

// get king ..........................................................
function getKing(){
  return Math.random() >= 0.9;
} 

// Event Listener ====================================================
bgGame.addEventListener("click", function(event){
  if (event.target.classList.value.includes("hungry")) {
    let mole = moles[event.target.dataset.index];
    mole.state = "fed";
    mole.timeToNext = getTimeToNext(mole.state);
    if(mole.king) {
      mole.node.firstElementChild.src = "images/king-mole-fed.png";
      game.score +=2;  
    } else {
      game.score +=1;
      mole.node.firstElementChild.src = "images/mole-fed.png";
    }
    document.querySelector(".worm-container").style.width = `${(game.score/game.WIN_SCORE) * 100}%`;
  };
});

nextFrame();
