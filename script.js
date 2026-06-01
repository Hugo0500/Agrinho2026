const canvas = document.getElementById("forestCanvas");
const ctx = canvas.getContext("2d");

const size = 20; // grade 20x20
let forest = [];

// inicializa floresta
function initForest() {
  forest = [];
  for (let x = 0; x < size; x++) {
    forest[x] = [];
    for (let y = 0; y < size; y++) {
      forest[x][y] = Math.random() < 0.7 ? 1 : 0; // 70% chance de árvore
    }
  }
  drawForest();
}

function drawForest() {
  const cellSize = canvas.width / size;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let treeCount = 0;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (forest[x][y] === 1) {
        ctx.fillStyle = "green";
        treeCount++;
      } else {
        ctx.fillStyle = "brown";
      }
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  document.getElementById("status").innerText = `Árvores restantes: ${treeCount}`;
}

function simulateStep() {
  let trees = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (forest[x][y] === 1) trees.push([x, y]);
    }
  }

  const removeCount = Math.floor(trees.length * 0.1); // remove 10%
  for (let i = 0; i < removeCount; i++) {
    const [x, y] = trees.splice(Math.floor(Math.random() * trees.length), 1)[0];
    forest[x][y] = 0;
  }

  drawForest();
}

initForest();
