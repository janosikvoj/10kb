let score = 0;
let currentLevel = 1;
const giftsPerLevel = JSON.parse(localStorage.getItem('giftsPerLevel')) ?? [0, 11, 9, 7, 5, 3, 1];

let startButton = document.getElementById('start-button');
let gameText = document.getElementById('game-text');
let reloadButtons = document.querySelectorAll('.reload_button img');
const cells = document.querySelectorAll('.grid-container .cell');

reloadButtons.forEach((button) => {
    button.addEventListener('click', reloadGame);
});

startButton.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('start-screen').style.display = 'none';
    startGame();
});

function removeCellClickListeners() {
    cells.forEach((cell) => {
        cell.removeEventListener('click', handleCellClick);
    });
}

function addCellClickListeners() {
    cells.forEach((cell) => {
        cell.addEventListener('click', handleCellClick);
    });
}

function startGame() {
    score = 0;
    currentLevel = 1;
    addCellClickListeners();
    updateScore();
    document.getElementById('current-level').textContent = currentLevel;
    initializeGrid();
}

function updateScore() {
    let scoreElements = document.querySelectorAll('.score');
    scoreElements.forEach((element) => {
        element.textContent = score.toString().padStart(4, 0);
    });
}

function getRandomColor() {
    const colors = ['#FFE76B', '#E7B5FF', '#B7F479', '#97F1D6'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function checkLvlFinish() {
    const hiddenGifts = document.querySelectorAll('.gift:not([style*="display: block"])');
    if (hiddenGifts.length === 0) {
        goToNextLevel();
    }
}

function handleCellClick(event) {
    const cell = event.target.classList.contains('cell') ? event.target : event.target.closest('.cell');

    if (!cell) return;

    const gift = cell.querySelector('.gift');
    if (gift && gift.style.display === 'none') {
        score += 100;
        gift.style.display = 'block';
        cell.classList.add('gift-found');
        cell.style.backgroundColor = getRandomColor();
        checkLvlFinish();
    } else if (!cell.classList.contains('gift-found')) {
        score = Math.max(score - 20, 0);

        cell.classList.add('empty');
        cell.classList.add('transition');
        setTimeout(() => {
            cell.classList.remove('empty');
            cell.classList.remove('transition');
        }, 500);
    }

    updateScore();
}

function placeGifts() {
    const giftsCount = giftsPerLevel[currentLevel];
    const emptyCells = Array.from(document.querySelectorAll('.grid-container .cell:not(.gift-placed)'));
    let placedGifts = 0;

    while (placedGifts < giftsCount) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cell = emptyCells[randomIndex];

        if (!cell.classList.contains('gift-placed')) {
            const giftClass = getGiftClass(cell);
            const gift = document.createElement('div');
            gift.className = `gift ${giftClass}`;
            gift.style.display = 'none';
            cell.appendChild(gift);
            cell.classList.add('gift-placed');
            placedGifts++;
        }
    }
}

function getGiftClass(cell) {
    if (cell.classList.contains('block-2x3')) return 'gift-2x3';
    if (cell.classList.contains('block-2x2')) return 'gift-2x2';
    if (cell.classList.contains('block-1x2')) return 'gift-1x2';
    if (cell.classList.contains('block-2x1')) return 'gift-2x1';
    return 'gift-1x1';
}

function initializeGrid() {
    clearGrid();
    placeGifts();
    updateLevelInfo();
}

function clearGrid() {
    cells.forEach((cell) => {
        cell.classList.remove('gift-placed', 'wrong', 'gift-found');
        cell.style.backgroundColor = '';
        const gift = cell.querySelector('.gift');
        if (gift) {
            gift.remove();
        }
    });
}
function goToNextLevel() {
    removeCellClickListeners();
    setTimeout(() => {
        if (currentLevel < giftsPerLevel.length - 1) {
            currentLevel++;
            initializeGrid();
            addCellClickListeners();
        } else {
            if (score === giftsPerLevel.reduce((acc, count) => acc + count * 100, 0)) {
                clearGrid();
                document.getElementById('finish-game-top').style.display = '';
            } else if (score > 0) {
                clearGrid();
                document.getElementById('finish-game-win').style.display = '';
            } else {
                clearGrid();
                document.getElementById('finish-game-lose').style.display = '';
            }
        }
    }, 1000);
}

function updateLevelInfo() {
    document.getElementById('current-level').textContent = currentLevel;
    document.getElementById('gifts-count').textContent = giftsPerLevel[currentLevel];
}

function reloadGame() {
    clearGrid();
    removeCellClickListeners();
    score = 0;
    currentLevel = 1;
    updateScore();
    updateLevelInfo();
    document.getElementById('start-screen').style.display = '';
    document.getElementById('finish-game-lose').style.display = 'none';
    document.getElementById('finish-game-win').style.display = 'none';
    document.getElementById('finish-game-top').style.display = 'none';
}
