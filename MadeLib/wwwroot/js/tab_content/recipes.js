function createActionOnClick(event) {
    tabCreationResult = addTab(`
        <link href="_content/MadeLib/css/tab_content/recipes.css" rel="stylesheet" />
        <link href="_content/MadeLib/css/tab_content/components.css" rel="stylesheet" />
        <div class="vanila-recipe-container">
        <select id="vanilla-type-selection" onchange="handleSelectionChange(this)" class='default-select vanila-type-select'>
        <option value="crafting-table">Crafting Table</option>
        <option value="furnace">Furnace</option>
        <option value="stonecutter">Stonecutter</option>
        </select>
        <div id="crafting-table-recipe-content"> <label>crafting-table </label> </div>
        <div id="furnace-recipe-content"> <label>furnace </label> </div>
        <div id="stonecutter-recipe-content"> 
        <form onsubmit="formSaveButtonClicked(event,'stonecutter')">
            <p class="input-line"><label class="default-input-label"> input: </label> <input class="default-input" type="text"></p>
            <p class="input-line"><label class="default-input-label"> output: </label> <input class="default-input" type="text"> <input class="default-input-num" type="number"></p>
            <p class="default-submit"><input type="submit"></p>
        </form>
        </div>
    </div>`, "new-recipe");
    if (tabCreationResult) {
        closeTabFromButton(event)
    }
    switchToTab("new-recipe");
}
function deleteActionOnClick() { alert("deleteActionOnClick"); }
function changeActionOnClick() { alert("changeActionOnClick"); }
function moddedActionOnClick() { alert("moddedActionOnClick"); }
function groupActionOnClick() { alert("groupActionOnClick"); }
function closeTabFromButton(event) {
    let tabPage = $(event.target).closest('.tabPage');
    if (!tabPage.length) { return; }
    let tabItem = $(".tab-item[data-tab='" + tabPage.attr('id') + "']");
    if (!tabItem.length) { return; }
    tabItem.remove();
    tabPage.remove();
    let firstRemainingTabName = $(".tab-item").first().attr("data-tab").replace("tab-", "");
    if (firstRemainingTabName) {
        switchToTab(firstRemainingTabName);
    }
}
function handleSelectionChange(selectElement) {
    // —крываем все дивы
    document.getElementById('crafting-table-recipe-content').style.display = 'none';
    document.getElementById('furnace-recipe-content').style.display = 'none';
    document.getElementById('stonecutter-recipe-content').style.display = 'none';

    // ѕоказываем нужный див в зависимости от выбранного значени€
    const value = selectElement.value;
    document.getElementById(value + '-recipe-content').style.display = 'block';
}
function formSaveButtonClicked(e, type) {
    e.preventDefault();
    alert(type);
    
}