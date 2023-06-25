const DEFAULT_COLOR = '#222';
const DEFAULT_MODE = 'draw';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let gridLines = true;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const clearBtn = document.getElementById('clearBtn');
const drawBtn = document.getElementById("drawBtn");
const colorPicker = document.getElementById('colorPicker');
const eraserBtn = document.getElementById('eraserBtn');
const slider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const gridLinesBtn = document.getElementById('gridLinesBtn');
const grid = document.getElementById('grid');

// Control button events

clearBtn.onclick = () => reloadGrid();

drawBtn.onclick = () => setCurrentMode('draw');

colorPicker.oninput = (e) => {
    colorBtn.style.backgroundColor = e.target.value;
    currentColor = e.target.value;
}

eraserBtn.onclick = () => setCurrentMode('eraser');

gridLinesBtn.onclick = () => toggleGridLines();


/*
sizeSlider.onmousemove = (e) => {
    mouseDown ? changeSize(e.target.value) : e;
}
*/

// Toggle active class and disable mode button until another is clicked
function activateButton(mode) {
     let newBtn = document.getElementById(mode + 'Btn');
     let oldBtn = document.getElementById(currentMode + 'Btn');
     newBtn.classList.add('active');
     newBtn.disabled = true;
     oldBtn.classList.remove('active');
     oldBtn.disabled = false;
}

// Change color of elements in pixel grid
function changeColor(e) {
    if (e.type == 'mouseover' && !mouseDown)  return;
    if (currentMode === 'draw') {
        e.target.style.backgroundColor = currentColor;
    } else {
        e.target.style.backgroundColor = '#FFF';
    }
}

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
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
        gridLines ? gridElement.classList.add('gridLines') : gridLines;
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

function toggleGridLines() {
    const gridElements = grid.childNodes;
    if (gridLines) {
        gridElements.forEach((e) => e.classList.remove('gridLines'));
        gridLines = false;
    } else {
        gridElements.forEach((e) => e.classList.add('gridLines'));
        gridLines = true;
    }
}

function updateSizeValue(value) {
    sizeValue.textContent = `${value} x ${value}`;
}

// Create touch compatible range slider using module
rangeSlider.create(slider, {
    polyfill: true,   // Boolean, if true, custom markup will be created
    rangeClass: 'rangeSlider',
    disabledClass: 'rangeSlider--disabled',
    fillClass: 'rangeSlider__fill',
    bufferClass: 'rangeSlider__buffer',
    handleClass: 'rangeSlider__handle',
    startEvent: ['mousedown', 'touchstart', 'pointerdown'],
    moveEvent: ['mousemove', 'touchmove', 'pointermove'],
    endEvent: ['mouseup', 'touchend', 'pointerup'],
    min: 8,      // Number , 0
    max: 32,      // Number, 100
    step: 2,     // Number, 1
    value: 16,    // Number, center of slider
    buffer: null,     // Number, in percent, 0 by default
    stick: 1,       // [Number stickTo, Number stickRadius]
    borderRadius: 10,  // Number, if you use buffer + border-radius in css for looks good,
    onInit: function () {
    },
    onSlideStart: function (position, value) {
    },
    onSlide: function (position, value) {
        changeSize(position);
    },
    onSlideEnd: function (position, value) {
    }
  });
  // then...
  var giveMeSomeEvents = true; // or false
  //slider.rangeSlider.update({min : 0, max : 20, step : 0.5, value : 1.5, buffer : 70}, giveMeSomeEvents);
  // or
  slider.rangeSlider.onSlideStart( function (position, value) {
    console.error('anotherCallback', 'position: ' + position, 'value: ' + value);
  });
  

window.onload = () => {
    setUpGrid(DEFAULT_SIZE);
}
