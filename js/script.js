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
  frameRate: 300
};


// Functions =========================================================

// get interval for sadnes ...........................................
function getSadTime () {
  return Date.now() + 2000;
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

// get interval for leaving mole ......................................
function getLeavingTime () {
  return Date.now() + 500;
}





function nextFrame () {
  const now = Date.now();
  if (myGame.nextRender <= now){
    
    for (let i = 0; i < moles.length; i++) {
      // TODO izlistava redom moles i poziva funkciju koja proverava states

      // console.log(moles[i].timeToNext, now);

      if (moles[i].timeToNext <= now) {
        // console.log("its time to next status");
        getNextStatus(moles[i]);
      }
      
    }

    myGame.nextRender = now + myGame.frameRate;
  }
  requestAnimationFrame(nextFrame);
}

function getNextStatus (mole) {
  
  let state = mole.state;
  
  switch (state) {
    
    case "sad":
      mole.state = "leaving";
      mole.timeToNext = getLeavingTime();
      mole.node.firstElementChild.src = "images/mole-leaving.png";
      break;

    case "leaving":
      mole.state = "gone";
      mole.timeToNext = getGoneTime();
      mole.node.firstElementChild.classList.add("gone");
      break;
    
    case "gone":
      mole.state = "hungry";
      mole.timeToNext = getHungryTime();
      mole.node.firstElementChild.src = "images/mole-hungry.png";
      mole.node.firstElementChild.classList.remove("gone");
      break;

    case "hungry":
      mole.state = "sad";
      mole.timeToNext = getSadTime();
      mole.node.firstElementChild.src = "images/mole-sad.png";
      break;

  }

}


nextFrame();


