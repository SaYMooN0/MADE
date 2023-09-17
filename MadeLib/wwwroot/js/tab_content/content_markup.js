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
    const submitButtonText = formArguments ? "Save changes" : "Save to file";
    const contentToReturn = `
            <form onsubmit="craftingTableSaveButtonClick(event, '${isNew}','${actionId}','${path}')" class="crafting-table-form">
            
            <div class='crafting-table-main-content-container'>
                <div class='crafting-table-letters-zone'>
                    <div class='crafting-table-letters-container'> </div>
                    <button type='button' onclick="addNewLetterForCraftingRecipr(event)" class='add-new-letter-button' >
                        Add letter
                        <svg viewBox="0 0 24 24" class='add-new-letter-button-icon'>
                            <line  x1="12" x2="12" y1="19" y2="5"/>
                            <line  x1="5" x2="19" y1="12" y2="12"/>
                        </svg>
                    </button>
                </div>
                <div class='crafting-table-grid-zone'>
                    <label class="custom-checkbox-label">
                        Shapeless
                        <input type="checkbox" id="horns" name="isShapeless" />
                        <span class="checkmark"></span>
                    </label>

                    <div class='crafting-table-grid-div-container'>
                        <div class='crafting-table-grid-div'>
                            <div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)">
                            </div>
                            <div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)">
                            </div>
                            <div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)">
                            </div>
                            <div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)">
                            </div>
                            <div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)">
                            </div>
                            <div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)">
                            </div>
                            <div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)">
                            </div>
                            <div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)">
                            </div>
                            <div class='crafting-table-grid-item' ondragover="handleDragOver(event)" ondrop="handleDrop(event)">
                            </div>
                        </div>
                    </div>
                    <div class='clear-letters-button' onclick='clearLetters()'>Clear letters</div>
                </div>
            </div>
            <label class="default-error-label"></label>
            <p class="input-line"><input class="default-submit" type="submit" value="${submitButtonText}"></p>
        </form>
        `;
    return contentToReturn;
}
