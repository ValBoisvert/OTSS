const words = document.querySelectorAll('.word');
const descriptions = document.querySelectorAll('.description');
const verifyButton = document.getElementById('verify');
const resetButton = document.getElementById('reset');
const popup = document.getElementById('popup');
const closePopup = popup.querySelector('.close');
const scoreDisplay = document.getElementById('score');
const retryButton = document.getElementById('retry');
const seeAnswersButton = document.getElementById('see-answers');
const quitButton = document.getElementById('quit');

words.forEach(word => {
    word.addEventListener('dragstart', dragStart);
    word.addEventListener('dragend', dragEnd);
});

descriptions.forEach(description => {
    description.addEventListener('dragover', dragOver);
    description.addEventListener('dragenter', dragEnter);
    description.addEventListener('dragleave', dragLeave);
    description.addEventListener('drop', drop);
});

verifyButton.addEventListener('click', verifyAnswers);
resetButton.addEventListener('click', resetGame);
closePopup.addEventListener('click', closePopupWindow);
retryButton.addEventListener('click', retryGame);
seeAnswersButton.addEventListener('click', closePopupWindow);
quitButton.addEventListener('click', closeGame);

document.addEventListener('dragover', handleScroll);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('dragging');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
    checkAllWordsPlaced();
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('over');
}

function dragLeave(e) {
    e.target.classList.remove('over');
}

function drop(e) {
    const id = e.dataTransfer.getData('text');
    const draggable = document.getElementById(id);
    if (e.target.classList.contains('description') && !e.target.querySelector('.word')) {
        e.target.appendChild(draggable);
        e.target.classList.remove('over');
    } else if (e.target.classList.contains('words')) {
        e.target.appendChild(draggable);
    }
    checkAllWordsPlaced();
}

function verifyAnswers() {
    let correct = 0;
    descriptions.forEach(description => {
        const word = description.querySelector('.word');
        if (word && word.id === description.dataset.word) {
            correct++;
            description.classList.add('correct');
        } else {
            description.classList.add('incorrect');
        }
    });
    scoreDisplay.textContent = `You got ${correct} out of ${descriptions.length} correct.`;
    popup.style.display = 'block';
}

function resetGame() {
    descriptions.forEach(description => {
        if (description.querySelector('.word')) {
            document.getElementById('words').appendChild(description.querySelector('.word'));
        }
        description.classList.remove('correct', 'incorrect');
        description.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    });
    scoreDisplay.textContent = '';
    popup.style.display = 'none';
    toggleDragAndDrop(true); // Re-enable drag-and-drop
    verifyButton.disabled = true; // Disable verify button
}

function closePopupWindow() {
    popup.style.display = 'none';
}

function retryGame() {
    resetGame();
    popup.style.display = 'none';
}

function closeGame() {
    window.close();
}

function showAnswers() {
    descriptions.forEach(description => {
        const correctWord = document.getElementById(description.dataset.word);
        if (correctWord) {
            description.appendChild(correctWord);
            description.classList.add('correct');
        }
    });
    popup.style.display = 'none';
    toggleDragAndDrop(false); // Disable drag-and-drop
}

function toggleDragAndDrop(enable) {
    words.forEach(word => {
        word.draggable = enable;
    });
    descriptions.forEach(description => {
        if (enable) {
            description.addEventListener('dragover', dragOver);
            description.addEventListener('dragenter', dragEnter);
            description.addEventListener('dragleave', dragLeave);
            description.addEventListener('drop', drop);
        } else {
            description.removeEventListener('dragover', dragOver);
            description.removeEventListener('dragenter', dragEnter);
            description.removeEventListener('dragleave', dragLeave);
            description.removeEventListener('drop', drop);
        }
    });
}

function checkAllWordsPlaced() {
    const allPlaced = Array.from(words).every(word => word.parentElement.classList.contains('description'));
    verifyButton.disabled = !allPlaced;
}

function handleScroll(e) {
    const scrollThreshold = 50; // Distance from the edge to start scrolling
    const scrollSpeed = 20; // Speed of scrolling

    if (e.clientY < scrollThreshold) {
        window.scrollBy(0, -scrollSpeed);
    } else if (e.clientY > window.innerHeight - scrollThreshold) {
        window.scrollBy(0, scrollSpeed);
    }
}