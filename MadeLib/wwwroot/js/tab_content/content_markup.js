function getStonecutterRecipeForm(formArguments, actionInfo) {
    const inputValue = formArguments && formArguments.input ? formArguments.input : '';
    const outputValue = formArguments && formArguments.output ? formArguments.output : '';
    const outputCountValue = formArguments && formArguments.outputCount ? formArguments.outputCount : '1';
    const submitButton = formArguments ? getSaveChangesButton() : `<input class="default-submit" type="submit" value="Save to file">`;
    const isNew = formArguments === null || formArguments === undefined;
    const contentToReturn = `
        <div id="stonecutter-recipe-content"> 
            <form onsubmit="stonecutterSaveButtonClick(event, ${isNew},${actionInfo})" class="stonecutter-form">
                <p class="input-line"><label class="default-input-label"> input: </label> <input class="default-input" type="text" data-suggestions value="${inputValue}"></p>
                <p class="input-line"><label class="default-input-label"> output: </label> <input class="default-input" type="text" data-suggestions value="${outputValue}"><label class="default-input-label count-margin-left"> count: </label><input class="default-input-num" type="number" value="${outputCountValue}"></p>
                <p class="input-line">${submitButton}</p>
                <label class="default-error-label"></label>
            </form>
        </div>`;

    return contentToReturn;
}
function getSaveChangesButton() { return `<input class="default-submit" type="submit" value="Save changes">`; }