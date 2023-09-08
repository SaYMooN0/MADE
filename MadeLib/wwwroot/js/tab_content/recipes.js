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
        <div id="crafting-table-recipe-content" > <label>crafting-table </label> </div>
        <div id="furnace-recipe-content" style="display:none">
        ${getFurnaceRecipeForm()}
 
        </div>
        <div id="stonecutter-recipe-content" style="display:none"> 
        ${getStonecutterRecipeForm()}
        </div>
        </div>`
        , "new-recipe");
    if (tabCreationResult) {
        closeParentTab(event)
    }
    switchToTab("new-recipe");
}
function deleteActionOnClick() { alert("deleteActionOnClick"); }
function changeActionOnClick() { alert("changeActionOnClick"); }
function moddedActionOnClick() { alert("moddedActionOnClick"); }
function groupActionOnClick() { alert("groupActionOnClick"); }

function handleRecipeTypeChange(selectElement) {
    document.getElementById('crafting-table-recipe-content').style.display = 'none';
    document.getElementById('furnace-recipe-content').style.display = 'none';
    document.getElementById('stonecutter-recipe-content').style.display = 'none';
    const value = selectElement.value;
    document.getElementById(value + '-recipe-content').style.display = 'block';
}
function furnaceSaveButtonClick(e, isNew, actionId, path) {
    alert(e);
    alert(isNew);
    alert(actionId);
    alert(path);
}
function stonecutterSaveButtonClick(e, isNew, actionId, path) {
    e.preventDefault();
    let form = e.target;
    let inputs = form.elements;
    let errorLabel = form.querySelector('.default-error-label');
    errorLabel.textContent = "";
    const fieldNames = ['input', 'output', 'output count'];

    for (let i = 0; i < fieldNames.length; i++) {
        if (!inputs[i].value) {
            errorLabel.textContent = `Fill ${fieldNames[i]} field!`;
            return;
        }
    }
    let outputCount = parseInt(inputs[2].value, 10);
    if (outputCount > 128 || outputCount < 1) {
        errorLabel.textContent = "Output count cannot be more than 128!";
        return;
    }
    let arguments = {
        input: inputs[0].value,
        output: inputs[1].value,
        outputCount: inputs[2].value
    };
    if (isNew == "true") { addNewRecipeFromJS('StonecutterAdd', arguments); }
    else if (isNew == "false") { changeExistingAction(actionId, path, 'StonecutterAdd', arguments); }

    let submitButton = form.querySelector('.default-submit');
    submitButton.value = "Saved";
    setTimeout(() => { submitButton.value = "Save to file"; }, 450);
}


function addNewRecipeFromJS(type, jsonStringContent) {
    DotNet.invokeMethodAsync('MadeLib', 'HandleRecipeCreationFromJS', type, jsonStringContent);
}
function changeExistingAction(actionId, filePath, type, jsonStringContent) {
    DotNet.invokeMethodAsync('MadeLib', 'HandleActionChanging', actionId, filePath, type, jsonStringContent);
}
