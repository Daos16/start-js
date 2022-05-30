const fieldSize = { width: 11, height: 11 };
const playerMark = "\u263A"; // \u263A = ☺
const playerDrawingMark = "\u263B"; // \u263B = ☻
const drawMark = "\u25CF"; // \u25CF = ●

var field;
var playerPos = { x: 5, y: 5 };
var drawMode = false;

window.onload = init;

function init(e) {
  initMarkup();
  initControl();
  initScene();
  showHelp();
}

function initMarkup() {
  field = createTable(fieldSize.width, fieldSize.height);
  document.body.appendChild(field);
}

function initControl() {
  document.onkeydown = onKeyDown;
}

function initScene() {
  updatePlayerPos(playerPos);
}

function showHelp() {
  const div = document.createElement('div');
  const span = document.createElement('span');
  span.innerText = 'Use arrows and space bar for control.';
  div.appendChild(span);
  document.body.appendChild(div);
}

function updatePlayerPos(pos) {
  setCell(playerPos.x, playerPos.y, drawMode ? drawMark : "");

  playerPos = pos;

  setCell(pos.x, pos.y, drawMode ? playerDrawingMark : playerMark);
}

function setCell(column, row, value) {
  field.rows[row].cells[column].innerText = value;
}

function createTable(columnsCount, rowsCount) {
  const table = document.createElement("table");

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const row = table.insertRow();

    for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
      const cell = row.insertCell("td");
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  return table;
}

function onKeyDown(e) {
  switch (e.key) {
    case "ArrowLeft":
      tryMove(() => playerPos.x > 0, {
        x: playerPos.x - 1,
        y: playerPos.y,
      });
      break;
    case "ArrowRight":
      tryMove(() => playerPos.x < fieldSize.width - 1, {
        x: playerPos.x + 1,
        y: playerPos.y,
      });
      break;
    case "ArrowUp":
      tryMove(() => playerPos.y > 0, {
        x: playerPos.x,
        y: playerPos.y - 1,
      });
      break;
    case "ArrowDown":
      tryMove(() => playerPos.y < fieldSize.height - 1, {
        x: playerPos.x,
        y: playerPos.y + 1,
      });
      break;
    case " ":
      drawMode = !drawMode;
      updatePlayerPos(playerPos);
      break;
  }
}

function tryMove(predicate, newPosition) {
  if (predicate()) {
    updatePlayerPos(newPosition);
  }
}
