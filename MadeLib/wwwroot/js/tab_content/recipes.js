function createActionOnClick(event) {
    tabCreationResult = addTab("<h1>New recipe</h1>", "new-recipe");
    if (tabCreationResult) {
        closeTabFromButton(event)
    }
    switchToTab("new-recipe");
}
function deleteActionOnClick() { alert("deleteActionOnClick");}
function changeActionOnClick() { alert("changeActionOnClick");}
function moddedActionOnClick() { alert("moddedActionOnClick");}
function groupActionOnClick() { alert("groupActionOnClick"); }
function closeTabFromButton(event) {
    // Определите, в какой tabPage находится кнопка
    let tabPage = $(event.target).closest('.tabPage');

    if (!tabPage.length) {
        alert("Кнопка не находится внутри вкладки");
        return;
    }

    let tabId = tabPage.attr('id');

    // Найдите соответствующий элемент tab-item
    let tabItem = $(".tab-item[data-tab='" + tabId + "']");

    if (!tabItem.length) {
        alert("Не удалось найти соответствующий элемент tab-item");
        return;
    }

    // Удалите элемент tab-item и tabPage
    tabItem.remove();
    tabPage.remove();

    createWelcomeIfNecessary();

    // Переключитесь на первую оставшуюся вкладку
    let firstRemainingTabName = $(".tab-item").first().attr("data-tab").replace("tab-", "");
    if (firstRemainingTabName) {
        switchToTab(firstRemainingTabName);
    }
}