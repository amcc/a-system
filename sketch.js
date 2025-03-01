const gridSize = 10;
const ranLength = [0, 1, 2];
const marginPercentage = 0.9;
const opacity = 210;
const mg = [255, 0, 255, opacity];
const cy = [0, 255, 255, opacity];
const yl = [255, 255, 0, opacity];
const colours = [mg, cy, yl];
let bigGap, gap, shunt, minDim, cnv, bottomCnv, topCnv, sc;

let showGrid = false;
let showGridInput, redrawButton;

// input controls
showGridInput = document.getElementById("grid");
showGridInput.addEventListener("click", function () {
  showGrid = !showGrid;
  showGridInput.classList.toggle("selected");
});

redrawButton = document.getElementById("redraw");
redrawButton.addEventListener("click", function () {
  makeShapes();
});

function setup() {
  minDim = min(windowWidth, windowHeight) * marginPercentage;
  createCanvas(minDim, minDim);
  bottomCnv = createGraphics(minDim, minDim);
  topCnv = createGraphics(minDim, minDim);

  bottomCnv.blendMode(MULTIPLY);
  topCnv.blendMode(BLEND);

  makeShapes();
}

function setSizes() {
  bigGap = (width / gridSize) * 2;
  gap = width / gridSize;
  shunt = gap / 2;
  sc = shuffle(colours);
}

function makeShapes() {
  setSizes();
  topCnv.clear();
  bottomCnv.clear();
  randomFineShape(21, gap * 1.92, sc[0], bottomCnv);
  randomHorizLine(5, bigGap * 1.3, sc[1], bottomCnv);
  randomVertLine(8, bigGap * 1.1, sc[2], bottomCnv);

  randomFineShape(3, gap * 0.3, [255], topCnv);
}

function draw() {
  background(255);

  image(bottomCnv, 0, 0);
  image(topCnv, 0, 0);

  showGrid && makeGrids();
  // noLoop();
}

function randomFineShape(no, size, fillColour, cnv = null) {
  cnv.noStroke();
  cnv.fill(fillColour);
  for (let i = 0; i < no; i++) {
    const x = floor(random(gridSize)) * gap + shunt;
    const y = floor(random(gridSize)) * gap + shunt;

    cnv.circle(x, y, size);
  }
}

function randomHorizLine(no, weight, fillColour, cnv) {
  cnv.noFill();
  cnv.stroke(fillColour);
  cnv.strokeWeight(weight);
  for (let i = 0; i < no; i++) {
    const x = floor(random((gridSize + 1) / 2));
    const y = floor(random((gridSize + 1) / 2));
    const length = weight * random(ranLength);
    // circle(x * gap + shunt, y * gap + shunt, size);
    cnv.line(
      x * bigGap - length / 2,
      y * bigGap,
      x * bigGap + length / 2,
      y * bigGap
    );
  }
}

function randomVertLine(no, weight, fillColour, cnv = null) {
  cnv.noFill();
  cnv.stroke(fillColour);
  cnv.strokeWeight(weight);
  for (let i = 0; i < no; i++) {
    const x = floor(random((gridSize + 1) / 2));
    const y = floor(random((gridSize + 1) / 2));
    const length = weight * random(ranLength);
    cnv.line(
      x * bigGap,
      y * bigGap - length / 2,
      x * bigGap,
      y * bigGap + length / 2
    );
  }
}

function fineShape() {
  const gap = width / gridSize;
  noStroke();
  fill(255, 255, 0, 50);
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize + 1; x++) {
      circle(x * gap + shunt, y * gap + shunt, bigGap);
    }
  }
}

function makeGrids() {
  // coarse grid pattern
  stroke(50, 50, 50);
  strokeWeight(2);
  for (let x = 0; x < (gridSize + 1) / 2; x++) {
    line(0, bigGap * x, width, bigGap * x);
    line(bigGap * x, 0, bigGap * x, height);
  }

  // fine grid pattern
  stroke(100, 255, 255);
  strokeWeight(1);

  for (let x = 0; x < gridSize; x++) {
    line(0, gap * x + shunt, width, gap * x + shunt);
    line(gap * x + shunt, 0, gap * x + shunt, height);
  }
}

function windowResized() {
  topCnv.clear();
  bottomCnv.clear();
  minDim = min(windowWidth, windowHeight) * marginPercentage;
  setSizes();
  resizeCanvas(minDim, minDim);
  makeShapes();
}
