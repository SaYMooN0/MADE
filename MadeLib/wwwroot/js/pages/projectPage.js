$(function () {

    // Не создавайте вкладки с помощью jQuery UI в начале
    // $("#containerForPages").tabs();

    $("#sortable").sortable({
        axis: "x"
    });

    $("#sortable").disableSelection();

    addTab("<p>Content 1</p>", "1");
    addTab("<h1>Content 2</h1>", "2");
    addTab("<h4>Content 3</h4>", "3");

    switchToTab("2");
});

function addTab(content, name) {
    if (!name) {
        name = ($("#sortable .tab-item").length + 1);
    }
    let newTabId = "tab-" + name;

    let tabItem = $("<li class='tab-item' data-tab='" + newTabId + "'><label>" + name + `</label>
    <svg class="tab-cross-btn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
</svg>
    </li>`);

    tabItem.click(function () {
        switchToTab(name);
    });

    $("#sortable").append(tabItem);

    let tabPage = $("<div class='tabPage' id='" + newTabId + "'>" + content + "</div>");

    // Начнем с того, что все вкладки скрыты
    tabPage.css('display', 'none');

    $("#containerForPages").append(tabPage);

    // Отключаем уничтожение и создание вкладок
    // $("#containerForPages").tabs("destroy").tabs();
    $("#sortable").sortable("refresh");

    let tabCrossBtn = tabItem.find(".tab-cross-btn");
    tabCrossBtn[0].addEventListener('click', closeTab);
}

function switchToTab(tabName) {
    let newTabId = "tab-" + tabName;

    // Сначала скрываем все вкладки
    $(".tabPage").css('display', 'none');

    // Затем отображаем нужную вкладку
    $("#" + newTabId).css('display', 'block');
}

function closeTab(event) {
    event.stopPropagation();
    let tabItem = $(this).closest('.tab-item');
    let tabId = tabItem.attr('data-tab');
    tabItem.remove();
    $("#" + tabId).remove();

    // Отключаем уничтожение и создание вкладок
    // $("#containerForPages").tabs("destroy").tabs();

    // Переключимся на первую вкладку после удаления
    switchToTab("1");
}
