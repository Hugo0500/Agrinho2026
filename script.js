const forestCanvas = document.getElementById("forestCanvas");
const ctx = forestCanvas.getContext("2d");

const chartCanvas = document.getElementById("chartCanvas");
const chartCtx = chartCanvas.getContext("2d");

const fireSound = document.getElementById("fireSound");
const natureSound = document.getElementById("natureSound");

const size = 20;
let forest = [];
let history = [];
let temperature = 25;

function initForest() {
  forest = [];
  for (let x = 0; x < size; x++) {
    forest[x] = [];
    for (let y = 0; y < size; y++) {
      forest[x][y] = Math.random() < 0.7 ? 1 : 0;
    }
  }
  history = [];
  drawForest();
}

function drawForest() {
  const cellSize = forestCanvas.width / size;
  ctx.clearRect(0, 0, forestCanvas.width, forestCanvas.height);
  let treeCount = 0;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (forest[x][y] === 1) {
        ctx.fillStyle = "green";
        treeCount++;
      } else {
        ctx.fillStyle = Math.random() < 0.5 ? "red" : "gray"; // fogo/fumaça
      }
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  history.push(treeCount);
  updateStatus(treeCount);
  updateClimate(treeCount);
  updateChart();
  updateAlerts(treeCount);
}

function simulateStep() {
  let trees = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (forest[x][y] === 1) trees.push([x, y]);
    }
  }

  const rate = document.getElementById("rate").value / 100;
  const removeCount = Math.floor(trees.length * rate);

  for (let i = 0; i < removeCount; i++) {
    const [x, y] = trees.splice(Math.floor(Math.random() * trees.length), 1)[0];
    forest[x][y] = 0;
  }

  fireSound.play();
  drawForest();
}

function reforest() {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (forest[x][y] === 0 && Math.random() < 0.05) {
        forest[x][y] = 1;
      }
    }
  }
  drawForest();
}

function updateStatus(treeCount) {
  document.getElementById("status").innerText = `Árvores restantes: ${treeCount}`;
}

function updateClimate(treeCount) {
  temperature = 25 + (400 - treeCount) * 0.02;
  document.getElementById("climate").innerText = `🌡️ Temperatura média: ${temperature.toFixed(1)} °C`;
}

function updateAlerts(treeCount) {
  const alertBox = document.getElementById("alert");
  const eduBox = document.getElementById("education");

  if (treeCount < 50) {
    alertBox.innerText = "⚠️ ALERTA CRÍTICO: A floresta está quase destruída!";
    eduBox.innerText = "Impacto: Extinção de espécies e aceleração do aquecimento global.";
  } else if (treeCount < 150) {
    alertBox.innerText = "⚠️ ALERTA: A floresta está em risco!";
    eduBox.innerText = "Impacto: Menos árvores significam menos absorção de CO₂, aumentando o efeito estufa.";
  } else if (treeCount < 250) {
    alertBox.innerText = "⚠️ Atenção: O desmatamento está avançando.";
    eduBox.innerText = "Impacto: A redução da cobertura vegetal afeta o ciclo da água e pode causar secas.";
  } else {
    alertBox.innerText = "";
    eduBox.innerText = "A floresta ainda está relativamente saudável, mas o equilíbrio é frágil.";
  }
}

function updateChart() {
  chartCtx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
  chartCtx.beginPath();
  chartCtx.moveTo(0, chartCanvas.height - history[0]);

  for (let i = 0; i < history.length; i++) {
    chartCtx.lineTo(i * (chartCanvas.width / history.length), chartCanvas.height - history[i]);
  }

  chartCtx.strokeStyle = "green";
  chartCtx.stroke();
}

initForest();
