//
// Modern main script for Sorting Visualiser - animations + control management
//

let array = [];
let speed = 100; // lower = faster
let isSorting = false;

const sizeSlider = document.getElementById('size');
const speedSlider = document.getElementById('speed');
const generateBtn = document.getElementById('generate');
const barsContainer = document.getElementById('bars-container');

// Algorithm buttons
const algButtons = {
    bubble: document.querySelector('button[onclick="bubbleSort()"]'),
    selection: document.querySelector('button[onclick="selectionSort()"]'),
    insertion: document.querySelector('button[onclick="insertionSort()"]'),
    merge: document.querySelector('button[onclick="mergeSortCaller()"]'),
    quick: document.querySelector('button[onclick="quickSortCaller()"]')
};

//
// Speed handling
//
function updateSpeed() {
    const val = Number(speedSlider.value);
    speed = Math.max(8, Math.round(210 - val));
}

speedSlider.addEventListener('input', updateSpeed);

//
// Array generation
//
function generateArray() {
    if (isSorting) return;
    const size = Number(sizeSlider.value);
    array = new Array(size).fill(0).map(() => randomInt(12, 480));
    renderBars(array);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//
// Rendering bars
//
function renderBars(arr) {
    barsContainer.innerHTML = '';
    const frag = document.createDocumentFragment();
    const barWidth = Math.max(4, Math.floor((barsContainer.clientWidth - arr.length * 2) / arr.length));

    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${arr[i]}px`;
        bar.style.width = `${barWidth}px`;
        bar.dataset.index = i;
        frag.appendChild(bar);
    }
    barsContainer.appendChild(frag);
}

function getBars() {
    return barsContainer.getElementsByClassName('bar');
}

//
// Animation helpers
//
async function highlightCompare(i, j) {
    const bars = getBars();
    if (bars[i]) bars[i].classList.add('compare');
    if (bars[j]) bars[j].classList.add('compare');
    await sleep(speed / 1.6);
}

function unhighlightCompare(i, j) {
    const bars = getBars();
    if (bars[i]) bars[i].classList.remove('compare');
    if (bars[j]) bars[j].classList.remove('compare');
}

async function highlightActive(i, j) {
    const bars = getBars();
    if (bars[i]) bars[i].classList.add('active');
    if (bars[j]) bars[j].classList.add('active');
    await sleep(speed / 1.3);
}

function unhighlightActive(i, j) {
    const bars = getBars();
    if (bars[i]) bars[i].classList.remove('active');
    if (bars[j]) bars[j].classList.remove('active');
}

async function swapBars(i, j) {
    const bars = getBars();
    if (!bars[i] || !bars[j]) return;

    const hi = bars[i].style.height;
    const hj = bars[j].style.height;

    bars[i].style.height = hj;
    bars[j].style.height = hi;

    bars[i].classList.add('active');
    bars[j].classList.add('active');

    await sleep(speed);

    bars[i].classList.remove('active');
    bars[j].classList.remove('active');
}

function setBarHeight(index, value) {
    const bars = getBars();
    if (bars[index]) bars[index].style.height = `${value}px`;
}

function markSorted(index) {
    const bars = getBars();
    if (bars[index]) {
        bars[index].style.background = 'linear-gradient(180deg,#7cffc7,#2fcf8c)';
        bars[index].style.boxShadow = '0 0 8px rgba(47,207,140,0.45)';
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//
// Disable/Enable UI controls
//
function disableControls() {
    isSorting = true;
    sizeSlider.disabled = true;
    speedSlider.disabled = true;
    generateBtn.disabled = true;
    for (const btn of Object.values(algButtons)) if (btn) btn.disabled = true;
}

function enableControls() {
    isSorting = false;
    sizeSlider.disabled = false;
    speedSlider.disabled = false;
    generateBtn.disabled = false;
    for (const btn of Object.values(algButtons)) if (btn) btn.disabled = false;
}

//
// Algorithm wrappers
//
async function bubbleSort() {
    if (isSorting) return;
    updateSpeed();
    disableControls();
    if (typeof window._bubbleSort === 'function') {
        await window._bubbleSort(array, {
            highlightCompare,
            unhighlightCompare,
            swapBars,
            setBarHeight,
            sleep,
            markSorted
        });
    }
    enableControls();
}

async function selectionSort() {
    if (isSorting) return;
    updateSpeed();
    disableControls();
    if (typeof window._selectionSort === 'function') {
        await window._selectionSort(array, {
            highlightCompare,
            unhighlightCompare,
            swapBars,
            setBarHeight,
            sleep,
            markSorted
        });
    }
    enableControls();
}

async function insertionSort() {
    if (isSorting) return;
    updateSpeed();
    disableControls();
    if (typeof window._insertionSort === 'function') {
        await window._insertionSort(array, {
            highlightCompare,
            unhighlightCompare,
            swapBars,
            setBarHeight,
            sleep,
            markSorted
        });
    }
    enableControls();
}

async function mergeSortCaller() {
    if (isSorting) return;
    updateSpeed();
    disableControls();
    if (typeof window._mergeSort === 'function') {
        await window._mergeSort(array, {
            setBarHeight,
            highlightCompare,
            unhighlightCompare,
            sleep,
            markSorted
        });
    }
    enableControls();
}

async function quickSortCaller() {
    if (isSorting) return;
    updateSpeed();
    disableControls();
    if (typeof window._quickSort === 'function') {
        await window._quickSort(array, {
            swapBars,
            setBarHeight,
            highlightCompare,
            unhighlightCompare,
            sleep,
            markSorted
        });
    }
    enableControls();
}

//
// Expose to global scope
//
window.generateArray = generateArray;
window.bubbleSort = bubbleSort;
window.selectionSort = selectionSort;
window.insertionSort = insertionSort;
window.mergeSortCaller = mergeSortCaller;
window.quickSortCaller = quickSortCaller;

//
// Init
//
document.addEventListener('DOMContentLoaded', () => {
    updateSpeed();
    generateArray();

    window.addEventListener('resize', () => {
        renderBars(array);
    });
});
