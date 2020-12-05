const BODY_NODE = document.querySelector('main');
const AREA_WIDTH = 25;
const AREA_HEIGHT = 25;
let LAST_STATE;
let CURRENT_STATE;

BODY_NODE.setAttribute("style", "line-height:0.65rem;max-width:200px");

initState();

function initState () {
//  g = 2D game array
//  h = head position
//  t = tail position
//  f = food position
//  d = direction array
  const initialState = {
      g: [],
      h: {
          x: Math.floor(AREA_WIDTH/2),
          y: Math.floor(AREA_HEIGHT/2),
      },
      t: {
          x: Math.floor(AREA_WIDTH/2),
          y: Math.floor(AREA_HEIGHT/2),
      },
      f: {
          x: Math.floor(AREA_WIDTH/2),
          y: Math.floor(AREA_HEIGHT/2) + 5,
      },
      d: ["D"], // D - down U - up L - left R - right
    };

    for (let i = 0; i < AREA_HEIGHT; i++) {
        initialState.g[i] = [];
        for (let j = 0; j < AREA_WIDTH; j++) {
            if (initialState.h.x === j && initialState.h.y === i ||
                initialState.t.x === j && initialState.t.y === i) {
                initialState.g[i][j] = 2;
            } else if (initialState.f.x === j && initialState.f.y === i) {
                initialState.g[i][j] = 3;
            } else {
                initialState.g[i][j] = 1;
            }
        }
    }

    LAST_STATE = initialState;
    CURRENT_STATE = initialState;
    renderView(LAST_STATE);
    setTimeout(() => {
        move()
    }, 1000);
    document.addEventListener("keydown", (e)=>{changeDir(e)}, false)
}

function move () {
    let atef = false;
    const moveDict = {
        "D": {x:0, y:1},
        "L": {x:-1, y:0},
        "R": {x:1, y:0},
        "U": {x:0, y:-1},
    };
    const nextX = LAST_STATE.h.x + moveDict[LAST_STATE.d[LAST_STATE.d.length - 1]].x;
    const nextY = LAST_STATE.h.y + moveDict[LAST_STATE.d[LAST_STATE.d.length - 1]].y;

    if (!LAST_STATE.g[nextY] || !LAST_STATE.g[nextY][nextX]) {window.alert("you lost");return};
    if (LAST_STATE.g[nextY][nextX] === 2) {window.alert("you lost");return};
    if (LAST_STATE.g[nextY][nextX] === 3) atef = true;

    LAST_STATE = {...CURRENT_STATE};

    CURRENT_STATE.g[nextY][nextX] = 2;
    CURRENT_STATE.d.push(CURRENT_STATE.d[CURRENT_STATE.d.length - 1]);
    CURRENT_STATE.h.x = nextX;
    CURRENT_STATE.h.y = nextY;
    if (!atef) {
        const dir = CURRENT_STATE.d.shift();
        const tailNextX = CURRENT_STATE.t.x + moveDict[dir].x;
        const tailNextY = CURRENT_STATE.t.y + moveDict[dir].y;
        CURRENT_STATE.g[CURRENT_STATE.t.y][CURRENT_STATE.t.x] = 1;
        CURRENT_STATE.t.x = tailNextX;
        CURRENT_STATE.t.y = tailNextY;
    } else {
        const coord = getNewfSpace(LAST_STATE);
        CURRENT_STATE.g[coord.y][coord.x] = 3;
    }

    renderView(CURRENT_STATE);
    setTimeout(() => {
        move()
    }, 200);
}

function getNewfSpace (state) {
    let emptySpaceNotFound = true;
    while (emptySpaceNotFound) {
        const x = Math.floor(Math.random() * 25)
        const y = Math.floor(Math.random() * 25)
        if (state.g[y][x] === 1) {
            emptySpaceNotFound = false;
            return {
                x:x,
                y:y
            }
        }

    }
}

function changeDir (event) {
    if (!event) return;
    const keyDir = {
        37:"L",
        38: "U",
        39: "R",
        40: "D"
    }

    CURRENT_STATE.d[CURRENT_STATE.d.length - 1] = keyDir[event.keyCode];

}

function renderView (state) {
  const dict = {
      1:"□",
      2:"■",
      3:"■"
  };
  let renderString = "";

  for (let i = 0; i < state.g.length; i++) {
     renderString += "\n\n"
     for (let j = 0; j < state.g[i].length; j++) {
       if (state.g[i][j]) {
         renderString += dict[state.g[i][j]]
       }
     }
  }

  BODY_NODE.textContent = renderString;
}