// Variables =========================================================

// array of all moles.................................................
const moles = [
  {
    state: "sad",
    timeToNext: getSadTime(),
    king: false,
    node: document.querySelector("#hole-0")
  },
  {
    state: "sad",
    timeToNext: getSadTime(),
    king: false,
    node: document.querySelector("#hole-1")
  },
  {
    state: "sad",
    timeToNext: getSadTime(),
    king: false,
    node: document.querySelector("#hole-2")
  },
  {
    state: "sad",
    timeToNext: getSadTime(),
    king: false,
    node: document.querySelector("#hole-3")
  },
  {
    state: "sad",
    timeToNext: getSadTime(),
    king: false,
    node: document.querySelector("#hole-4")
  },
  {
    state: "sad",
    timeToNext: getSadTime(),
    king: false,
    node: document.querySelector("#hole-5")
  },
  {
    state: "sad",
    timeToNext: getSadTime(),
    king: false,
    node: document.querySelector("#hole-6")
  },
  {
    state: "sad",
    timeToNext: getSadTime(),
    king: false,
    node: document.querySelector("#hole-7")
  },
  {
    state: "sad",
    timeToNext: getSadTime(),
    king: false,
    node: document.querySelector("#hole-8")
  },
  {
    state: "sad",
    timeToNext: getSadTime(),
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
      mole.state = "leaving";
      mole.timeToNext = getLeavingTime();
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
      break;
    case "leaving":
      mole.state = "gone";
      mole.timeToNext = getGoneTime();
      mole.king = false;
      mole.node.firstElementChild.classList.add("gone");
      break;
    case "gone":
      mole.state = "hungry";
      mole.timeToNext = getHungryTime();
      mole.king = getKing();
      if(mole.king) {
        mole.node.firstElementChild.src = "images/king-mole-hungry.png";  
      } else {
        mole.node.firstElementChild.src = "images/mole-hungry.png";
      }
      mole.node.firstElementChild.classList.remove("gone");
      mole.node.firstElementChild.classList.add("hungry");
      break;
    case "hungry":
      mole.state = "sad";
      mole.timeToNext = getSadTime();
      if(mole.king) {
        mole.node.firstElementChild.src = "images/king-mole-sad.png";  
      } else {
        mole.node.firstElementChild.src = "images/mole-sad.png";
      }
      mole.node.firstElementChild.classList.remove("hungry");
      break;
  }
}

// get interval for leaving mole .....................................
function getLeavingTime () {
  return Date.now() + 500;
}

// get empty hole interval ...........................................
function getGoneTime () {
  // between 2 and 18 sec
  return Date.now() + (Math.floor(Math.random() * 18000) + 2000);
}

// get interval for hungry mole ......................................
function getHungryTime () {
  return Date.now() + 2000;
}

// get interval for sad mole .........................................
function getSadTime () {
  return Date.now() + 2000;
}

// get interval for fed...............................................
function getFedTime () {
  return Date.now() + 500;
}

// get king ..........................................................
function getKing(){
  return Math.random() >= 0.9;
}

// Event Listener ====================================================
bgGame.addEventListener("click", function(event){
  if (event.target.classList.value.includes("hungry")) {
    let index = event.target.dataset.index;
    moles[index].state = "fed";
    moles[index].timeToNext = getFedTime();
    if(moles[index].king) {
      moles[index].node.firstElementChild.src = "images/king-mole-fed.png";
      game.score +=2;  
    } else {
      game.score +=1;
      moles[index].node.firstElementChild.src = "images/mole-fed.png";
    }
    document.querySelector(".worm-container").style.width = `${(game.score/game.WIN_SCORE) * 100}%`;
  };
});

nextFrame();
