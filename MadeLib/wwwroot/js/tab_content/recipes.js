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
    // ����������, � ����� tabPage ��������� ������
    let tabPage = $(event.target).closest('.tabPage');

    if (!tabPage.length) {
        alert("������ �� ��������� ������ �������");
        return;
    }

    let tabId = tabPage.attr('id');

    // ������� ��������������� ������� tab-item
    let tabItem = $(".tab-item[data-tab='" + tabId + "']");

    if (!tabItem.length) {
        alert("�� ������� ����� ��������������� ������� tab-item");
        return;
    }

    // ������� ������� tab-item � tabPage
    tabItem.remove();
    tabPage.remove();

    createWelcomeIfNecessary();

    // ������������� �� ������ ���������� �������
    let firstRemainingTabName = $(".tab-item").first().attr("data-tab").replace("tab-", "");
    if (firstRemainingTabName) {
        switchToTab(firstRemainingTabName);
    }
}