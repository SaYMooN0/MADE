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
        <div id="crafting-table-recipe-content" class='recpe-content' > ${getCraftingTableRecipeForm()} </div>
        <div id="furnace-recipe-content" class='recpe-content' style="display:none"> ${getFurnaceRecipeForm()} </div>
        <div id="stonecutter-recipe-content" class='recpe-content' style="display:none"> ${getStonecutterRecipeForm()} </div>
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
    e.preventDefault();
    let form = e.target;
    let inputs = form.elements;
    let errorLabel = form.querySelector('.default-error-label');
    errorLabel.textContent = "";
    const fieldNames = ['input', 'output', 'specialType'];

    for (let i = 0; i < fieldNames.length; i++) {
        if (!inputs[i].value) {
            errorLabel.textContent = `Fill ${fieldNames[i]} field!`;
            return;
        }
    }
    let selectedFurnaceType;
    try {
        selectedFurnaceType = form.querySelector('input[name="furnace-type-choice"]:checked').value + "Add";
    } catch (error) {
        errorLabel.textContent = `Please select a furnace type!`;
        return;
    }

    let arguments = {
        input: inputs[0].value,
        output: inputs[1].value,
        specialType: selectedFurnaceType
    };
    if (isNew == "true") { addNewRecipeFromJS(selectedFurnaceType, arguments); }
    else if (isNew == "false") { changeExistingAction(actionId, path, selectedFurnaceType, arguments); }

    let submitButton = form.querySelector('.default-submit');
    submitButton.value = "Saved";
    setTimeout(() => { submitButton.value = "Save to file"; }, 450);
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
function craftingTableSaveButtonClick(e, isNew, actionId, path) {
    alert("in craftingTableSaveButtonClick");
}
function addNewLetterForCraftingRecipr(event) {
    event.preventDefault();
    const container = document.querySelector('.crafting-table-letters-container');
    const existingDivs = container.querySelectorAll('.crafting-table-letter-item');

    const errorLabel = document.querySelector('.default-error-label');
    errorLabel.textContent = "";

    if (existingDivs.length >= 9) { errorLabel.textContent = 'Cannot add more than 9 divs'; return; }
    const currentChars = Array.from(existingDivs).map(div => div.innerText[0]);
    let nextChar = null;
    for (let i = 0; i < 9; i++) {
        const potentialChar = String.fromCharCode('a'.charCodeAt(0) + i).toUpperCase();
        if (!currentChars.includes(potentialChar)) {
            nextChar = potentialChar;
            break;
        }
    }

    if (!nextChar) return;
    const newletterContainer = document.createElement('div');
    newletterContainer.className = 'crafting-table-letter-item';
    newletterContainer.innerHTML = `<label class='letter-label'>${nextChar}</label><input type='text' class='item-for-letter-input' value='made:item'/>`;
    const removeButton = document.createElement('div');
    removeButton.classList.add('letter-delete-button-container');
    removeButton.innerHTML = `<svg class='letter-delete-button' viewBox='0 0 24 24' fill='none' > <path d='M20.5001 6H3.5' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M9.5 11L10 16' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M14.5 11L14 16' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6' stroke='#1C274C' stroke-width='1.5'/></svg>`;
    removeButton.addEventListener('click', function () { container.removeChild(newletterContainer); errorLabel.textContent = ''; });
    const inputItem = newletterContainer.querySelector('.item-for-letter-input');
    newletterContainer.setAttribute('draggable', 'true');
    newletterContainer.addEventListener('dragstart', handleDragStart);
    newletterContainer.appendChild(removeButton);
    newletterContainer.addEventListener('click', function () {
        const input = newletterContainer.querySelector('.item-for-letter-input');
        if (input) {
            input.focus();
        }
    });

    container.appendChild(newletterContainer);
}

function handleDragStart(event) {
    const letterLabel = event.currentTarget.querySelector('.letter-label');
    event.dataTransfer.setData('text/plain', letterLabel.innerText);
}
function handleDragOver(event) { event.preventDefault(); }

function handleDrop(event) {
    event.preventDefault();
    const letter = event.dataTransfer.getData('text/plain');
    if (letter) { event.target.innerHTML = letter; }
}
function clearLetters() {
    const gridItems = document.querySelectorAll('.crafting-table-grid-item');
    gridItems.forEach(item => {
        item.innerHTML = '';
    });
}
function addNewRecipeFromJS(type, jsonStringContent) {
    DotNet.invokeMethodAsync('MadeLib', 'HandleRecipeCreationFromJS', type, jsonStringContent);
}
function changeExistingAction(actionId, filePath, type, jsonStringContent) {
    DotNet.invokeMethodAsync('MadeLib', 'HandleActionChanging', actionId, filePath, type, jsonStringContent);
}
