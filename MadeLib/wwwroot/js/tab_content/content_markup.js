function getStonecutterRecipeForm(formArguments, actionId, path) {
    const inputValue = formArguments && formArguments.input ? formArguments.input : '';
    const outputValue = formArguments && formArguments.output ? formArguments.output : '';
    const outputCountValue = formArguments && formArguments.outputCount ? formArguments.outputCount : '1';
    const submitButtonText = formArguments ? "Save changes" : "Save to file";
    const isNew = formArguments === null || formArguments === undefined;
    const contentToReturn = `
            <form onsubmit="stonecutterSaveButtonClick(event, '${isNew}','${actionId}','${path}')" class="stonecutter-form">
                <p class="input-line"><label class="default-input-label"> input: </label> <input class="default-input" type="text" data-suggestions value="${inputValue}"></p>
                <p class="input-line"><label class="default-input-label"> output: </label> <input class="default-input" type="text" data-suggestions value="${outputValue}"><label class="default-input-label count-margin-left"> count: </label><input class="default-input-num" type="number" value="${outputCountValue}"></p>
                <p class="input-line"><input class="default-submit" type="submit" value="${submitButtonText}"></p>
                <label class="default-error-label"></label>
            </form>
        `;
    return contentToReturn;
}
function getFurnaceRecipeForm(formArguments, actionId, path) {

    const inputValue = formArguments && formArguments.input ? formArguments.input : '';
    const outputValue = formArguments && formArguments.output ? formArguments.output : '';
    const specialTypeValue = formArguments && formArguments.specialType ? formArguments.specialType : '';
    const submitButtonText = formArguments ? "Save changes" : "Save to file";
    const isNew = formArguments === null || formArguments === undefined;
    const radioTypes = [
        { value: "FurnaceOnly", label: "None" },
        { value: "FurnaceAndSmoker", label: "Smoker" },
        { value: "FurnaceAndBlast", label: "Blast Furnace" }
    ];
    let radiosHtml = radioTypes.map(type => `
    <label class="default-radio-container">
        <input class="default-radio" type="radio" name="furnace-type-choice" value="${type.value}" ${specialTypeValue === type.value + "Add" ? "checked" : ""}> 
        <span class="default-radio-label">${type.label}</span>
    </label>
    `).join('');
    const contentToReturn = `
            <form onsubmit="furnaceSaveButtonClick(event, '${isNew}','${actionId}','${path}')" class="furnace-form">
                <p class="input-line"><label class="default-input-label"> input: </label> <input class="default-input" type="text" data-suggestions value="${inputValue}"></p>
                <p class="input-line"><label class="default-input-label"> output: </label> <input class="default-input" type="text" data-suggestions value="${outputValue}"></p>
                <div class="furnace-radios-container">
                    <label class="furnace-additional-type-label">Additional</label>
                    ${radiosHtml}
                </div>
                <label class="default-error-label"></label>
                <p class="input-line"><input class="default-submit" type="submit" value="${submitButtonText}"></p>
            </form>
        `;
    return contentToReturn;
}
function getCraftingTableRecipeForm(formArguments, actionId, path) {

    const isNew = formArguments === null || formArguments === undefined;
    const outputCountValue = formArguments && formArguments.outputCount ? formArguments.outputCount : '1';
    const outputValue = formArguments && formArguments.output ? formArguments.output : '';
    const submitButtonText = formArguments ? "Save changes" : "Save to file";
    const isShapelessChecked = formArguments && formArguments.isShapeless === "true" ? "checked" : "";

    let letterDivs = '';
    if (formArguments && formArguments.letterItemDictionary) {
        for (let letter in formArguments.letterItemDictionary) {
            const itemValue = formArguments.letterItemDictionary[letter];
            letterDivs += `
                <div class="crafting-table-letter-item" draggable="true" ondragstart="handleDragStart(event)" onclick="document.querySelector('.item-for-letter-input', this).focus()">
                    <label class="letter-label">${letter}</label>
                    <input type="text" class="item-for-letter-input" data-suggestions value="${itemValue}">
                    <div class="letter-delete-button-container" onclick="deleteLetterButtonClick(event)">
                        <svg class='letter-delete-button' viewBox='0 0 24 24' fill='none' > <path d='M20.5001 6H3.5' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M9.5 11L10 16' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M14.5 11L14 16' stroke='#1C274C' stroke-width='1.5' stroke-linecap='round'/> <path d='M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6' stroke='#1C274C' stroke-width='1.5'/></svg>
                    </div>
                </div>`;
        }
    }


    let gridItems = "";
    if (formArguments && formArguments.lettersInputGrid) {
        let gridValues = formArguments.lettersInputGrid.split(',');
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let value = gridValues[i][j] ? gridValues[i][j] : '';
                gridItems += `<div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)">${value}</div>`;
            }
        }

    }
    else {
        for (let i = 0; i < 9; i++) {
            gridItems += `<div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)"></div>`;
        }
    }

    const contentToReturn = `
         <form onsubmit="craftingTableSaveButtonClick(event, '${isNew}','${actionId}','${path}')" class="crafting-table-form">
                <div class='crafting-table-main-content-container'>
                    <div class='crafting-table-letters-zone'>
                        <label class="custom-checkbox-label is-shapeless-checkbox">
                            Shapeless
                            <input type="checkbox" name="isShapeless" ${isShapelessChecked} />
                            <span class="checkmark"></span>
                        </label>
                          <div class='crafting-table-letters-container'>${letterDivs}</div>
                        <button type='button' onclick="addNewLetterForCraftingRecipe(event)" class='add-new-letter-button'>
                            Add letter
                            <svg viewBox="0 0 24 24" class='add-new-letter-button-icon'>
                                <line x1="12" x2="12" y1="19" y2="5" />
                                <line x1="5" x2="19" y1="12" y2="12" />
                            </svg>
                        </button>
                    </div>
                    <div class='crafting-table-grid-zone'>
                        <div class='clear-letters-button' onclick='clearLetters()'>Clear letters</div>
                        <div class='crafting-table-grid-div-container'>
                            <div class='crafting-table-grid-div'>
                                ${gridItems}
                            </div>
                        </div>
                        <div class="crafting-table-output-div">
                            <label class="default-input-label">output: <input class="default-input" type="text" data-suggestions value="${outputValue}"></label>
                            <label class="default-input-label">count: <input class="default-input-num" type="number" value="${outputCountValue}"></label>
                        </div>
                    </div>
                </div>
                <label class="default-error-label"></label>
                <p class="input-line"><input class="default-submit" type="submit" value="${submitButtonText}"></p>
            </form>
    `;
    return contentToReturn;
}
function getItemPage(itemId) {
    let contentToReturn = `
            <div class="item-page-container">
                <div class="item-main-info">
                    <img class="item-image"/>
        
                </div>
                <div class="item-secondary-info">

                </div>
                <div class="item-delete-button" onclick='deleteItemClick(${itemId})'>
                    Delete
                </div>
            </div>
`;
    return contentToReturn;
}
function changeTabToExistingAction(e, formArgumentsString, type, path, actionId) {
    closeParentTab(e);
    addTabFromType(formArgumentsString, type, path, actionId);
}
