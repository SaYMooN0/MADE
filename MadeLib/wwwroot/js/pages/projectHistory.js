
function historyItemClicked(formArgumentsString) {
    let formArguments = unvalidJsonStringToObject(formArgumentsString);
    alert(formArguments.input);
}
//function historyItemClicked(formArguments, type, path, actionId) {
//    alert(1);
//    alert(formArguments, type, path, actionId);
//    addTab(getStonecutterRecipeForm(formArguments, actionInfo), `action-${actionId}`);
//}
function unvalidJsonStringToObject(str) {
    const jsonString = str.replace(/'/g, '"');
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return null;
    }
}