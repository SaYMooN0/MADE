$(function () {
    $("#sortable").sortable({
        axis: "xy",
        containment: "parent"
    });
    $("#sortable").disableSelection();
    addTab("<p>Content 1</p>", "14123   r123fadf");
    addTab("<h1>Content 2</h1>", "2fasdfasfsaf");
    addTab("<h4>Content 3</h4>", "3safaefbhsaf");
    addTab("<h4>Content 3</h4>", "4sfnbdbds");
    addTab("<h4>Content 3</h4>", "5ndsndfsn");
    addTab("<h4>Content 3</h4>", "6nsdndndsdsfndsndsnsndsnfsd");
    addTab("<h4>Content 3</h4>", "7sdnfnre3efeserg3rgwrgw3");

    switchToTab("2");
});

function addTab(content, name) {
    if (!name) {
        name = ($("#sortable .tab-item").length + 1);
    }
    let newTabId = "tab-" + name;

    let tabItem = $("<li class='tab-item' data-tab='" + newTabId + "'><label>" + name + `</label>
        <svg class="tab-cross-btn" viewBox="0 0 24 24" fill="none">
        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
        </svg>
        </li>`
    );
    tabItem.click(function () {
        switchToTab(name);
    });

    $("#sortable").append(tabItem);
    let tabPage = $("<div class='tabPage' id='" + newTabId + "'>" + content + "</div>");
    tabPage.css('display', 'none');
    $("#containerForPages").append(tabPage);
    $("#sortable").sortable("refresh");
    let tabCrossBtn = tabItem.find(".tab-cross-btn");
    tabCrossBtn[0].addEventListener('click', closeTab);
}

function switchToTab(tabName) {
    let newTabId = "tab-" + tabName;
    $(".tabPage").css('display', 'none');
    $("#" + newTabId).css('display', 'block');
    $(".tab-item").removeClass("active-tab");
    $(".tab-item[data-tab='" + newTabId + "']").addClass("active-tab");
}


function closeTab(event) {
    event.stopPropagation();
    let tabItem = $(this).closest('.tab-item');
    let tabId = tabItem.attr('data-tab');
    tabItem.remove();
    $("#" + tabId).remove();
    let firstRemainingTabName = $(".tab-item").first().attr("data-tab").replace("tab-", "");
    switchToTab(firstRemainingTabName);
}
