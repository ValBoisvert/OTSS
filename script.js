const words = document.querySelectorAll('.word');
const descriptions = document.querySelectorAll('.description');

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
    if (e.target.dataset.word === id) {
        e.target.appendChild(draggable);
        e.target.classList.remove('over');
    }
}