const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'draw';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const clearBtn = document.getElementById('clearBtn');
const drawBtn = document.getElementById("drawBtn");
const colorPicker = document.getElementById('colorPicker');
const eraserBtn = document.getElementById('eraserBtn');
const grid = document.getElementById('grid');

clearBtn.addEventListener('click', reloadGrid);

drawBtn.onclick = () => setCurrentMode('draw');

colorPicker.oninput = (e) => {
    colorBtn.style.backgroundColor = e.target.value;
    currentColor = e.target.value;
}

eraserBtn.onclick = () => setCurrentMode('eraser');

function activateButton(mode) {
     let newBtn = document.getElementById(mode + 'Btn');
     let oldBtn = document.getElementById(currentMode + 'Btn');
     newBtn.classList.add('active');
     oldBtn.classList.remove('active');
}

function changeColor(e) {
    if (e.type == 'mouseover' && !mouseDown)  return;
    if (currentMode === 'draw') {
        e.target.style.backgroundColor = currentColor;
    } else {
        e.target.style.backgroundColor = '#FFF';
    }
}

function clearGrid() {
    grid.innerHTML = ''
}

function reloadGrid() {
    clearGrid();
    setUpGrid(currentSize);
}

function setCurrentColor(color) {
    currentColor = color;
}

function setCurrentMode(mode) {
    activateButton(mode);
    currentMode = mode;
}

function setCurrentSize(size) {
    currentSize = size;
}

function setUpGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}


window.onload = () => {
    setUpGrid(DEFAULT_SIZE);
}