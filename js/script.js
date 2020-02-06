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
const myGame = {
  lastRender: 0,
  nextRender: Date.now(),
  isFinish: false, 
  frameRate: 100
};

const bg = document.querySelector(".bg");
let score = 0;

// Functions =========================================================

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

// call the next frame ...............................................
function nextFrame () {

  const now = Date.now();
  // check if time to next frame
  if (myGame.nextRender <= now){
    for (let i = 0; i < moles.length; i++) {
      //check if time to next status of moles[i]
      if (moles[i].timeToNext <= now) {
        getNextStatus(moles[i]);
      }
    }
    myGame.nextRender = now + myGame.frameRate;
  }
  requestAnimationFrame(nextFrame);
}

// get next status of mole ...........................................
function getNextStatus (mole) {
  let state = mole.state;
  switch (state) {
    case "sad":
    case "fed":  
      mole.state = "leaving";
      mole.timeToNext = getLeavingTime();
      if(mole.king) {
        mole.node.firstElementChild.src = "images/king-mole-leaving.png";  
      } else {
        mole.node.firstElementChild.src = "images/mole-leaving.png";
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

nextFrame();

// Event Listener
bg.addEventListener("click", function(event){
  if (event.target.classList.value.includes("hungry")) {
    
    let index = event.target.dataset.index;
    moles[index].state = "fed";
    moles[index].timeToNext = getFedTime();
    if(moles[index].king) {
      moles[index].node.firstElementChild.src = "images/king-mole-fed.png";
      score +=2;  
    } else {
      score +=1;
      moles[index].node.firstElementChild.src = "images/mole-fed.png";
    }
  };
});
