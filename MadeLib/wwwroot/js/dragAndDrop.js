let draggedItem = null;

function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    if (e.target.classList.contains("tab-header")) {
        let parent = e.target.parentElement;
        parent.insertBefore(draggedItem, e.target.nextSibling);
    }
    resetDragState();
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function resetDragState() {
    draggedItem = null;
}

document.addEventListener('dragend', resetDragState);