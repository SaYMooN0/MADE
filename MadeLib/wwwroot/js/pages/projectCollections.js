let tabs = document.querySelectorAll('.collection-tab');
let contents = document.querySelectorAll('.tab-content');
tabs.forEach(innerTab => innerTab.classList.remove('active'));
contents.forEach(content => content.style.display = 'none');
let itemsTab = document.querySelector('.collection-tab[data-tab="items"]');
if (itemsTab) {
    itemsTab.classList.add('active');
    let itemsContent = document.querySelector('.tab-content[data-content="items"]');
    if (itemsContent) {
        itemsContent.style.display = 'block';
    }
}

function handleTabClick(event) {
    let tabs = document.querySelectorAll('.collection-tab');
    let contents = document.querySelectorAll('.tab-content');
    tabs.forEach(innerTab => innerTab.classList.remove('active'));
    contents.forEach(content => content.style.display = 'none');
    let clickedTab = event.currentTarget;
    clickedTab.classList.add('active');
    let tabContent = document.querySelector(`.tab-content[data-content='${clickedTab.getAttribute("data-tab")}']`);
    if (tabContent) {
        tabContent.style.display = 'block';
    }
}

function getActiveTab() {
    let activeTab = document.querySelector('.collection-tab.active');
    if (activeTab) {
        return activeTab.getAttribute('data-tab');
    }
    return null;
}
function collectionAddNewPressesd() {
    let inputValue = document.querySelector('.add-new-input').value;
    document.querySelector('.add-new-message').textContent = inputValue;
}
function collectionItemClicked(e) {
    let targetElement = e.target;
    while (targetElement && !targetElement.classList.contains('collection-item')) {
        targetElement = targetElement.parentElement;
    }

    if (!targetElement) return;
    const labelText = targetElement.querySelector('.collection-item-label').textContent;

    alert(labelText);
    
    //addTab(getItemPage());
}


function getCollectionItemFromEvent(event) {
    let target = event.target;
    if (target.tagName.toLowerCase() === 'svg' || target.tagName.toLowerCase() === 'path' || target.tagName.toLowerCase() === 'polygon') {
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

async function collectionItemSave(event) {
    event.stopPropagation();

    let item = getCollectionItemFromEvent(event);
    let label = item.querySelector('.collection-item-label');
    let input = item.querySelector('.collection-item-input');
    let oldValue = label.textContent;
    let newValue = input.value;

    let changingResult = await DotNet.invokeMethodAsync('MadeLib', 'TryChangeCollectionItem', getActiveTab(), oldValue, newValue);
    if (changingResult || changingResult.trim() != "") {
        alert(changingResult);
        return;
    }
    label.textContent = newValue;
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