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
async function collectionItemClicked(e) {
    
    let targetElement = e.target;
    while (targetElement && !targetElement.classList.contains('collection-item')) {
        targetElement = targetElement.parentElement;
    }

    if (!targetElement) return;
    const itemId = targetElement.querySelector('.collection-item-label').textContent;
    let tabContent = await getItemPage(itemId);
    if (tabContent == null) {
        alert("Error"); //ToDo: show error dialog
        return;
    }
    addTab(tabContent, itemId.replace(':', '-') );

}

async function collectionBlockClicked(e) { alert("block   clicked")}
async function collectionTagClicked(e) { alert("Tag   clicked")}
async function collectionProcessingTypeClicked(e) { alert("ProcessingTyp   clicked")}
async function collectionModClicked(e) { alert("Mod   clicked")}

