let draggedItem = null;

function startDragging(tabId) {
    let tabsHeader = document.getElementById('tabs-header');
    let tabElements = tabsHeader.getElementsByClassName('tab-item');

    for (let tab of tabElements) {
        tab.setAttribute('draggable', 'true');

        tab.addEventListener('dragstart', function (event) {
            draggedItem = this;
            setTimeout(function () {
                draggedItem.style.display = 'none';
            }, 0);
        });

        tab.addEventListener('dragend', function (event) {
            setTimeout(function () {
                draggedItem.style.display = '';
                tabsHeader.insertBefore(draggedItem, tabsHeader.firstChild);
                draggedItem = null;
            }, 0);
        });

        tab.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        tab.addEventListener('dragenter', function (event) {
            if (this === draggedItem) return;
            this.style['border-bottom'] = '2px solid blue';
        });

        tab.addEventListener('dragleave', function (event) {
            this.style['border-bottom'] = '';
        });

        tab.addEventListener('drop', function (event) {
            if (this === draggedItem) return;
            this.style['border-bottom'] = '';
            tabsHeader.insertBefore(draggedItem, this);
        });
    }
}
