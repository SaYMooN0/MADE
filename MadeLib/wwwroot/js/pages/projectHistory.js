async function histotyItemDeleteButtonClicked(event, buttonElement, actionId, filePath) {
    event.stopPropagation();
    if (!await DotNet.invokeMethodAsync('MadeLib', 'GetShowWarningWhenDeletingAction')) {
        await deleteActionFromHistory(buttonElement, actionId, filePath);
        return;
    }
    const dialog = document.querySelector('.histoty-item-deleting-dialog');
    const showDialogAgainCheckBox = dialog.querySelector('input[type="checkbox"]');
    dialog.showModal();
    document.getElementById('confirmDelete').onclick = async () => {
        dialog.close();
        if (showDialogAgainCheckBox.checked) { await DotNet.invokeMethodAsync('MadeLib', 'SetShowWarningWhenDeletingAction', false); }
        await deleteActionFromHistory(buttonElement, actionId, filePath);
    };
    document.getElementById('cancelDelete').onclick = () => { dialog.close(); };
}
async function deleteActionFromHistory(buttonElement, actionId, filePath) {
    let historyItemElement = buttonElement.closest('.history-item');
    if (historyItemElement) {
        await DotNet.invokeMethodAsync('MadeLib', 'HandleActionDeleting', actionId, filePath);
        historyItemElement.remove();
    }
}

function historyItemClicked(formArgumentsString, type, path, actionId) {
    let formArguments = unvalidJsonStringToObject(formArgumentsString);
    const recipiesAndComponentsStyles = `
                <link href="_content/MadeLib/css/tab_content/recipes.css" rel="stylesheet" />
                <link href="_content/MadeLib/css/tab_content/components.css" rel="stylesheet" />
            `;
    switch (type) {
        case "StonecutterAdd":
            {
                let tabContent = recipiesAndComponentsStyles + getStonecutterRecipeForm(formArguments, actionId, path);
                addTab(tabContent, `action-${actionId}`);
                break;
            }
        case "FurnaceOnlyAdd":
        case "FurnaceAndSmokerAdd":
        case "FurnaceAndBlastAdd":
            {
                let tabContent = recipiesAndComponentsStyles + getFurnaceRecipeForm(formArguments, actionId, path);
                addTab(tabContent, `action-${actionId}`);
                break;
            }
        default:
            alert("error in historyItemClicked ");
    }
}
function unvalidJsonStringToObject(str) {
    const jsonString = str.replace(/'/g, '"');
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return null;
    }
}
