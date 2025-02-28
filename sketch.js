const gridSize = 10;
const ranLength = [0.5, 1, 2];
const marginPercentage = 0.9;
const opacity = 210;
let bigGap, gap, shunt, minDim;

function setup() {
  minDim = min(windowWidth, windowHeight) * marginPercentage;
  createCanvas(minDim, minDim);
  setSizes();
  blendMode(MULTIPLY);
}

function setSizes() {
  bigGap = (width / gridSize) * 2;
  gap = width / gridSize;
  shunt = gap / 2;
}

function draw() {
  background(255);

  // makeGrids();

  randomFineShape(22, gap * 1.6, [255, 0, 255, opacity]);
  randomHorizLine(5, bigGap * 1.3, [255, 255, 0], opacity);
  randomVertLine(8, bigGap * 1.1, [0, 255, 255, opacity]);

  noLoop();
}

function randomFineShape(no, size, fillColour) {
  noStroke();
  fill(fillColour);
  for (let i = 0; i < no; i++) {
    const x = floor(random(gridSize));
    const y = floor(random(gridSize));
    circle(x * gap + shunt, y * gap + shunt, size);
  }
}

function randomHorizLine(no, weight, fillColour) {
  noFill();
  stroke(fillColour);
  strokeWeight(weight);
  for (let i = 0; i < no; i++) {
    const x = floor(random((gridSize + 1) / 2));
    const y = floor(random((gridSize + 1) / 2));
    const length = weight * random(ranLength);
    // circle(x * gap + shunt, y * gap + shunt, size);
    line(
      x * bigGap - length / 2,
      y * bigGap,
      x * bigGap + length / 2,
      y * bigGap
    );
  }
}

function randomVertLine(no, weight, fillColour) {
  noFill();
  stroke(fillColour);
  strokeWeight(weight);
  for (let i = 0; i < no; i++) {
    const x = floor(random((gridSize + 1) / 2));
    const y = floor(random((gridSize + 1) / 2));
    const length = weight * random(ranLength);
    line(
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
  stroke(255, 180, 220);
  strokeWeight(4);
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
  minDim = min(windowWidth, windowHeight) * marginPercentage;
  setSizes();
  resizeCanvas(minDim, minDim);
}
