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
    alert(1);
    return contentToReturn;
}
function getFurnaceRecipeForm(formArguments, actionId, path) {

    const inputValue = formArguments && formArguments.input ? formArguments.input : '';
    const outputValue = formArguments && formArguments.output ? formArguments.output : '';
    const specialType = formArguments && formArguments.specialType ? formArguments.specialType : '';
    const submitButtonText = formArguments ? "Save changes" : "Save to file";
    const isNew = formArguments === null || formArguments === undefined;

    const contentToReturn = `
            <form onsubmit="furnaceSaveButtonClick(event, '${isNew}','${actionId}','${path}')" class="furnace-form">
                <p class="input-line"><label class="default-input-label"> input: </label> <input class="default-input" type="text" data-suggestions value="${inputValue}"></p>
                <p class="input-line"><label class="default-input-label"> output: </label> <input class="default-input" type="text" data-suggestions value="${outputValue}"></p>
                <p class="input-line"><input class="default-submit" type="submit" value="${submitButtonText}"></p>
                <div class="furnace-radios-container">
                <label class="furnace-additional-type-label">Additional</label>
                   <label class="default-radio-container">
                       <input class="default-radio" type="radio" name="choice" value="none"> 
                        <span class="default-radio-label">None</span>
                   </label>
                   <label class="default-radio-container">
                       <input class="default-radio" type="radio" name="choice" value="smoker">
                       <span class="default-radio-label">Smoker</span>
                   </label>
                   <label class="default-radio-container">
                       <input class="default-radio" type="radio" name="choice" value="blastFurnace">
                       <span class="default-radio-label">Blast Furnace</span>
                   </label>
                </div>
                <label class="default-error-label"></label>
            </form>
        `;
    return contentToReturn;
}