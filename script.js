const words = document.querySelectorAll('.word');
const descriptions = document.querySelectorAll('.description');
const verifyButton = document.getElementById('verify');
const resetButton = document.getElementById('reset');
const popup = document.getElementById('popup.querySelector('.close');
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

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('dragging');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
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
}

function verifyAnswers() {
    let correct = 0;
    descriptions.forEach(description => {
        const word = description.querySelector('.word');
        if (word && word.id === description.dataset.word) {
            correct++;
            description.style.backgroundColor = 'lightgreen';
        } else {
            description.style.backgroundColor = 'lightcoral';
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
        description.style.backgroundColor = '#fff';
    });
    scoreDisplay.textContent = '';
    popup.style.display = 'none';
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