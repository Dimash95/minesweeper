import "./index.html";
import "./index.scss";

const body = document.body;

const header = document.createElement("header");
header.classList.add("header");
body.appendChild(header);

const title = document.createElement("h1");
title.classList.add("title");
header.appendChild(title);
title.textContent = "Minesweeper";

const main = document.createElement("main");
main.classList.add("main");
body.appendChild(main);

const desk = document.createElement("div");
desk.classList.add("desk");
main.appendChild(desk);

const mins = document.createElement("div");
mins.classList.add("mins");
mins.textContent = "10 💣";
desk.appendChild(mins);

const reset = document.createElement("div");
reset.classList.add("reset");
desk.appendChild(reset);
// reset.textContent = "😎";
const smile = document.createElement("a");
smile.classList.add("smile");
reset.appendChild(smile);
smile.textContent = "😎";
smile.href = "#";
smile.addEventListener("click", () => {
  location.reload();
  return false;
});

const timer = document.createElement("div");
timer.classList.add("timer");
desk.appendChild(timer);
timer.textContent = "10:00";

const minesweeper = document.createElement("div");
minesweeper.classList.add("minesweeper");
main.appendChild(minesweeper);

// const cell = document.createElement("button");
// cell.classList.add("btn");
// minesweeper.appendChild(cell);

const field = document.createElement("div");
field.classList.add("field");
minesweeper.appendChild(field);

const click = document.createElement("div");
click.classList.add("click");
minesweeper.appendChild(click);

const WIDTH = 10;
const HEIGHT = 10;
let bombsCount = 10;
let flagsCount = 10;
let clickCount = 0;
let minutes = 10;
let seconds = 0;
let resultSecond = 0;

const cellsCount = WIDTH * HEIGHT;
field.innerHTML = '<button class="button"></button>'.repeat(cellsCount);
const cells = [...field.children];
let cell = document.querySelectorAll(".button");
let closedCount = cellsCount;
let bombs = [];

field.addEventListener(
  "click",
  function once(event) {
    const index = cells.indexOf(event.target);
    createBombs(index);
    if (timer.textContent === "10:00") {
      startTimer();
    }
  },
  { once: true }
);

const createBombs = (index) => {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(`${i}`);
  }
  arr.splice(index, 1);
  for (let i = 0; i < 10; i++) {
    let num = Math.floor(Math.random() * 100);
    if (arr[num]) {
      bombs.push(arr[num]);
      arr.splice(num, 1);
    } else {
      i--;
    }
  }
  bombs = Array.from(bombs, Number);
};

field.addEventListener("click", function handleMouseClick(event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  const index = cells.indexOf(event.target);
  const column = index % WIDTH;
  const row = Math.floor(index / WIDTH);

  open(row, column);
  showClick();
});

field.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  if (event.target.classList.contains("opened")) {
    return;
  }
  if (event.target.textContent === "" && flagsCount > 0) {
    event.target.textContent = "🚩";
    flagsCount -= 1;
  } else if (event.target.textContent === "🚩") {
    event.target.textContent = "";
    flagsCount += 1;
  }

  showFlags();
});

function isValid(row, column) {
  return row >= 0 && row < HEIGHT && column >= 0 && column < WIDTH;
}

function getCount(row, column) {
  let count = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (isBomb(row + y, column + x)) {
        count++;
      }
    }
  }
  return count;
}

function open(row, column) {
  if (!isValid(row, column)) return;

  const index = row * WIDTH + column;
  const cell = cells[index];

  if (cell.disabled === true) return;
  cell.classList.add("opened");
  cell.disabled = true;
  if (isBomb(row, column)) {
    cell.innerHTML = "💣";
    alert("Game over. Try again");
    return;
  }

  closedCount--;

  if (closedCount <= bombsCount) {
    alert(
      `Hooray! You found all mines in ${resultSecond} seconds and ${clickCount} moves!`
    );
    return;
  }
  const count = getCount(row, column);

  if (count !== 0) {
    cell.innerHTML = count;
    if (count === 1) {
      cell.classList.add("one");
    } else if (count === 2) {
      cell.classList.add("two");
    } else if (count === 3) {
      cell.classList.add("three");
    } else if (count === 4) {
      cell.classList.add("four");
    }
    return;
  }

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      open(row + y, column + x);
    }
  }
}

function isBomb(row, column) {
  if (!isValid(row, column)) return false;

  const index = row * WIDTH + column;
  return bombs.includes(index);
}

const showFlags = () => {
  mins.textContent = `${flagsCount} 💣`;
};

const showClick = () => {
  clickCount += 1;
  click.textContent = `Click - ${clickCount}`;
};

function startTimer() {
  const id = setInterval(function () {
    if (reset.clicked == true) {
      clearInterval(id);
      console.log(5);
    }

    let res = "";

    if (seconds === 0) {
      minutes = minutes - 1;
      seconds = 60;
    }

    seconds--;

    if (seconds < 10) {
      res = `0${minutes}:0${seconds}`;
    } else {
      res = `0${minutes}:${seconds}`;
    }

    resultSecond = minutes * 60 + seconds;
    timer.textContent = res;

    if (minutes === 0 && seconds === 0) {
      clearInterval(id);
      alert("Game over. Try again");
    }

    if (minutes === 0 && seconds === 0) {
      clearInterval(id);
    }
  }, 1000);
}
