
function createActionOnClick(event) {
    tabCreationResult = addTab(`
        <link href="_content/MadeLib/css/tab_content/recipes.css" rel="stylesheet" />
        <link href="_content/MadeLib/css/tab_content/components.css" rel="stylesheet" />
        <div class="vanila-recipe-container">
        <select id="vanilla-type-selection" onchange="handleRecipeTypeChange(this)" class='default-select vanila-type-select'>
        <option value="crafting-table">Crafting Table</option>
        <option value="furnace">Furnace</option>
        <option value="stonecutter">Stonecutter</option>
        </select>
        <div id="crafting-table-recipe-content"> <label>crafting-table </label> </div>
        <div id="furnace-recipe-content"> 



        <input type="text" data-suggestions>
        
        
        </div>
        <div id="stonecutter-recipe-content"> 
        <form onsubmit="stonecutterSaveButtonClick(event,'stonecutter')" class="stonecutter-form">
            <p class="input-line"><label class="default-input-label"> input: </label> <input class="default-input" type="text" data-suggestions></p>
            <p class="input-line"><label class="default-input-label"> output: </label> <input class="default-input" type="text" data-suggestions><label class="default-input-label count-margin-left"> count: </label><input class="default-input-num" type="number" value="1"></p>
            <p class="input-line"><input class="default-submit" type="submit" value="Save to file"></p>
            <label class="default-error-label"></label >
        </form>
        </div>
    </div>`, "new-recipe");
    if (tabCreationResult) {
        closeParentTab(event)
    }
    switchToTab("new-recipe");
}
function deleteActionOnClick() { alert("deleteActionOnClick"); }
function changeActionOnClick() { alert("changeActionOnClick"); }
function moddedActionOnClick() { alert("moddedActionOnClick"); }
function groupActionOnClick() { alert("groupActionOnClick"); }
function closeParentTab(event) {
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
function handleRecipeTypeChange(selectElement) {
    document.getElementById('crafting-table-recipe-content').style.display = 'none';
    document.getElementById('furnace-recipe-content').style.display = 'none';
    document.getElementById('stonecutter-recipe-content').style.display = 'none';
    const value = selectElement.value;
    document.getElementById(value + '-recipe-content').style.display = 'block';
}
function stonecutterSaveButtonClick(e, type) {
    e.preventDefault();
   
    let form = e.target;
    let inputs = form.elements;

    let errorLabel = form.querySelector('.default-error-label');
    errorLabel.textContent = "";
    if (!inputs[0].value) {
        errorLabel.textContent = "Fill input field!";
        return;
    }

    if (!inputs[1].value) {
        errorLabel.textContent = "Fill output field!";
        return;
    }

    if (!inputs[2].value) {
        errorLabel.textContent = "Fill output count field!";
        return;
    }
    let submitButton = form.querySelector('.default-submit');
    let data = {
        input: inputs[0].value,
        output: inputs[1].value,
        outputCount: inputs[2].value
    };
    addNewRecipeFromJS('StonecutterAdd', data);
    submitButton.value = "Saved"
    setTimeout(() => {
        submitButton.value = "Save to file";
    }, 450);
}

function addNewRecipeFromJS(type, jsonStringContent) {
    DotNet.invokeMethodAsync('MadeLib', 'HandleRecipeCreationFromJS', type, jsonStringContent);
}
