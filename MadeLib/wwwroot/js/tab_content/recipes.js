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
        closeTabFromRedirect(event)
    }
    switchToTab("new-recipe");
}
function deleteActionOnClick() {
}
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
async function furnaceSaveButtonClick(e, isNew, actionId, path) {
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
    if (isNew == "true") {
        let historyItem = await addNewRecipeFromJS(selectedFurnaceType, arguments);
        changeTabToExistingAction(this.event, JSON.stringify(historyItem.arguments), selectedFurnaceType, historyItem.filePathpath, historyItem.actionId);
    }
    else if (isNew == "false") { changeExistingAction(actionId, path, selectedFurnaceType, arguments); }

    let submitButton = form.querySelector('.default-submit');
    submitButton.value = "Saved";
    setTimeout(() => { submitButton.value = "Save to file"; }, 450);
}
async function stonecutterSaveButtonClick(e, isNew, actionId, path) {
    e.preventDefault();
    let form = e.target;
    let inputs = form.elements;
    let errorLabel = form.querySelector('.default-error-label');
    errorLabel.textContent = "";
    const fieldNames = ['input', 'output', 'output count'];

    for (let i = 0; i < fieldNames.length; i++) {
        if (!inputs[i].value) {
            errorLabel.textContent = `Fill ${fieldNames[i]} field`;
            return;
        }
    }
    let outputCount = parseInt(inputs[2].value, 10);
    if (outputCount > 128 || outputCount < 1) {
        errorLabel.textContent = "Output count cannot be more than 128";
        return;
    }
    let arguments = {
        input: inputs[0].value,
        output: inputs[1].value,
        outputCount: inputs[2].value
    };
    const type = 'StonecutterAdd'
    if (isNew == "true") {
        let historyItem = await addNewRecipeFromJS(type, arguments);
        changeTabToExistingAction(this.event, JSON.stringify(historyItem.arguments), type, historyItem.filePathpath, historyItem.actionId);
    }
    else if (isNew == "false") { changeExistingAction(actionId, path, type, arguments); }
    let submitButton = form.querySelector('.default-submit');
    submitButton.value = "Saved";
    setTimeout(() => { submitButton.value = "Save to file"; }, 450);
}
async function craftingTableSaveButtonClick(e, isNew, actionId, path) {
    e.preventDefault();
    let gridItems = Array.from(document.querySelectorAll('.crafting-table-grid-item'));
    let gridValues = [];
    for (let i = 0; i < gridItems.length; i += 3) {
        let row = '';
        for (let j = 0; j < 3; j++) {
            row += gridItems[i + j].innerText || ' ';
        }
        gridValues.push(row);
    }
    let letterItemDictionary = Array.from(document.querySelectorAll('.crafting-table-letter-item .item-for-letter-input'))
        .reduce((acc, inputElem) => {
            let letter = inputElem.previousElementSibling.innerText;
            acc[letter] = inputElem.value;
            return acc;
        }, {});
    const errorLabel = document.querySelector('.default-error-label');
    let isShapelessChecked = document.querySelector('[name="isShapeless"]').checked;
    let outputValue = document.querySelector(".crafting-table-output-div .default-input").value;
    let outputCountValue = document.querySelector(".crafting-table-output-div .default-input-num").value;
    if (!outputValue) { errorLabel.textContent = 'Please provide an output value'; return; }
    if (!outputCountValue || outputCountValue <= 0 || outputCountValue > 128) { errorLabel.textContent = 'Output count cannot be more than 128'; return; }
    const usedLettersInGrid = gridValues.join('').split('').filter((v, i, a) => a.indexOf(v) === i && v !== ' ');
    if (usedLettersInGrid.length === 0) { errorLabel.textContent = 'Please add letters to the crafting grid.'; return; }
    const definedLetters = Object.keys(letterItemDictionary);
    const unusedLetters = definedLetters.filter(letter => !usedLettersInGrid.includes(letter));

    if (unusedLetters.length > 0) { errorLabel.textContent = `The following letters are defined but not used in the grid: ${unusedLetters.join(', ')}`; return; }

    errorLabel.textContent = '';
    let arguments = {
        letterItemDictionary: JSON.stringify(letterItemDictionary),
        lettersInputGrid: gridValues.toString(),
        isShapeless: isShapelessChecked.toString(),
        output: outputValue,
        outputCount: outputCountValue
    };
    const type = 'CraftingTableAdd'
    if (isNew == "true") {
        let historyItem = await addNewRecipeFromJS(type, arguments);
        changeTabToExistingAction(this.event, JSON.stringify(historyItem.arguments), type, historyItem.filePathpath, historyItem.actionId);
    }
    else if (isNew == "false") { changeExistingAction(actionId, path, rtpe, arguments); }
    let submitButton = e.target.querySelector('.default-submit');
    submitButton.value = "Saved";
    setTimeout(() => { submitButton.value = "Save to file"; }, 450);
}
function addNewLetterForCraftingRecipe(event) {
    event.preventDefault();
    const container = document.querySelector('.crafting-table-letters-container');
    const existingDivs = container.querySelectorAll('.crafting-table-letter-item');

    const errorLabel = document.querySelector('.default-error-label');
    errorLabel.textContent = "";

    if (existingDivs.length >= 9) { errorLabel.textContent = 'Cannot add more than 9 letters'; return; }
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
    newletterContainer.innerHTML = `<label class='letter-label'>${nextChar}</label><input type='text' class='item-for-letter-input' data-suggestions value='made:item'/>`;
    const removeButton = document.createElement('div');
    removeButton.classList.add('letter-delete-button-container');
    removeButton.innerHTML = `<svg class='letter-delete-button' viewBox='0 0 24 24' fill='none' > <path d='M20.5001 6H3.5' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M9.5 11L10 16' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M14.5 11L14 16' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6' stroke='#1C274C' stroke-width='1.5'/></svg>`;
    removeButton.addEventListener('click', function () {
        const letterToRemove = newletterContainer.querySelector('.letter-label').innerText;
        const gridItems = document.querySelectorAll('.crafting-table-grid-item');
        gridItems.forEach(item => {
            if (item.innerText === letterToRemove) { item.innerText = ''; }
        });
        container.removeChild(newletterContainer);
        errorLabel.textContent = '';
    });

    newletterContainer.setAttribute('draggable', 'true');
    newletterContainer.addEventListener('dragstart', handleDragStart);
    newletterContainer.appendChild(removeButton);

    newletterContainer.addEventListener('click', function () {
        const input = newletterContainer.querySelector('.item-for-letter-input');
        if (input) { input.focus(); }
    });
    container.appendChild(newletterContainer);
    const input = newletterContainer.querySelector('.item-for-letter-input');
    input.focus();
}
function addNewLetterForCraftingRecipe(event) {
    event.preventDefault();
    const formElement = event.target.closest('form');
    const container = formElement.querySelector('.crafting-table-letters-container');
    const existingDivs = container.querySelectorAll('.crafting-table-letter-item');

    const errorLabel = formElement.querySelector('.default-error-label');
    errorLabel.textContent = "";

    if (existingDivs.length >= 9) { errorLabel.textContent = 'Cannot add more than 9 letters'; return; }
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
    newletterContainer.innerHTML = `<label class='letter-label'>${nextChar}</label><input type='text' class='item-for-letter-input' data-suggestions value='made:item'/>`;
    const removeButton = document.createElement('div');
    removeButton.classList.add('letter-delete-button-container');
    removeButton.innerHTML = `<svg class='letter-delete-button' viewBox='0 0 24 24' fill='none' > <path d='M20.5001 6H3.5' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M9.5 11L10 16' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M14.5 11L14 16' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6' stroke='#1C274C' stroke-width='1.5'/></svg>`;
    removeButton.addEventListener('click', deleteLetterButtonClick);
    newletterContainer.setAttribute('draggable', 'true');
    newletterContainer.addEventListener('dragstart', handleDragStart);
    newletterContainer.appendChild(removeButton);

    newletterContainer.addEventListener('click', function () {
        const input = newletterContainer.querySelector('.item-for-letter-input');
        if (input) { input.focus(); }
    });
    container.appendChild(newletterContainer);
    const input = newletterContainer.querySelector('.item-for-letter-input');
    input.focus();
}
function deleteLetterButtonClick(event) {
    const buttonClicked = event.target;
    const letterItem = buttonClicked.closest('.crafting-table-letter-item');
    const letterToRemove = letterItem.querySelector('.letter-label').innerText;

    const formElement = event.target.closest('form');
    const errorLabel = formElement.querySelector('.default-error-label');
    const letterSlots = formElement.querySelectorAll('.crafting-table-grid-item');

    letterSlots.forEach(item => {
        if (item.innerText === letterToRemove) { item.innerText = ''; }
    });

    const container = formElement.querySelector('.crafting-table-letters-container');
    container.removeChild(letterItem);

    errorLabel.textContent = '';
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
async function addNewRecipeFromJS(type, jsonStringContent) {
    return await DotNet.invokeMethodAsync('MadeLib', 'HandleRecipeCreationFromJS', type, jsonStringContent);
}
function changeExistingAction(actionId, filePath, type, jsonStringContent) {
    DotNet.invokeMethodAsync('MadeLib', 'HandleActionChanging', actionId, filePath, type, jsonStringContent);
}
