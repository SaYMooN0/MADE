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
