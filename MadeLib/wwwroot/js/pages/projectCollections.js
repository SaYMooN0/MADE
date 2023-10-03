let tabs = document.querySelectorAll('.collection-tab');
let contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        tabs.forEach(innerTab => innerTab.classList.remove('active'));
        contents.forEach(content => content.style.display = 'none');
        tab.classList.add('active');
        let tabContent = document.querySelector(`.tab-content[data-content='${tab.getAttribute("data-tab")}']`);
        if (tabContent) {
            tabContent.style.display = 'block';
        }
    });
});
function collectionAddNewPressesd() {
    let inputValue = document.querySelector('.add-new-input').value;
    document.querySelector('.add-new-message').textContent = inputValue;
}
function collectionItemClicked(e) {
    alert(JSON.stringify(e));
}


function getCollectionItemFromEvent(event) {
    let target = event.target;

    // Если цель события SVG, используем родительский элемент
    if (target.tagName.toLowerCase() === 'svg' || target.tagName.toLowerCase() === 'path') {
        target = target.closest('.collection-item-button');
    }

    return target.parentElement;
}

function collectionItemEdit(event) {
    event.stopPropagation();
    changeAllToLabels();

    let item = getCollectionItemFromEvent(event);
    let label = item.querySelector('.collection-item-label');
    let input = item.querySelector('.collection-item-input');

    input.value = label.textContent;

    label.style.display = 'none';
    item.querySelector('.collection-item-edit-button').style.display = 'none';
    item.querySelector('.collection-item-delete-button').style.display = 'none';

    input.style.display = 'block';
    item.querySelector('.collection-item-save-button').style.display = 'block';
    item.querySelector('.collection-item-cancel-button').style.display = 'block';
}

function collectionItemSave(event) {
    event.stopPropagation();

    let item = getCollectionItemFromEvent(event);
    let label = item.querySelector('.collection-item-label');
    let input = item.querySelector('.collection-item-input');

    label.textContent = input.value;

    input.style.display = 'none';
    item.querySelector('.collection-item-save-button').style.display = 'none';
    item.querySelector('.collection-item-cancel-button').style.display = 'none';

    label.style.display = 'block';
    item.querySelector('.collection-item-edit-button').style.display = 'block';
    item.querySelector('.collection-item-delete-button').style.display = 'block';
}

function collectionItemCancel(event) {
    event.stopPropagation();

    let item = getCollectionItemFromEvent(event);
    item.querySelector('.collection-item-input').style.display = 'none';
    item.querySelector('.collection-item-save-button').style.display = 'none';
    item.querySelector('.collection-item-cancel-button').style.display = 'none';

    item.querySelector('.collection-item-label').style.display = 'block';
    item.querySelector('.collection-item-edit-button').style.display = 'block';
    item.querySelector('.collection-item-delete-button').style.display = 'block';
}

function changeAllToLabels() {
    let items = document.querySelectorAll('.collection-item');

    items.forEach(function (item) {
        let cancelButton = item.querySelector('.collection-item-cancel-button');
        if (cancelButton.style.display !== 'none') {
            collectionItemCancel({ target: cancelButton, stopPropagation: function () { } });
        }
    });
}


function collectionItemDelete(e) {
 
    alert('delete');
    e.stopPropagation();
}