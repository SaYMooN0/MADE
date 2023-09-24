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
        case "CraftingTableAdd":
            {
                let tabContent = recipiesAndComponentsStyles + getCraftingTableRecipeForm(formArguments, actionId, path);
                addTab(tabContent, `action-${actionId}`);
                break;
            }
        default:
            alert("error in historyItemClicked type: "+type);
    }
}
function unvalidJsonStringToObject(str) {
    let jsonString = str.replace(/'/g, '"');
    jsonString = jsonString.replace("\"{","{");
    jsonString = jsonString.replace("}\"", "}");
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return null;
    }
}
function filterHistoryItems() {
    let searchQuery = document.querySelector('.history-search-input').value.toLowerCase();
    let historyItems = document.querySelectorAll('.history-item');

    historyItems.forEach(item => {
        let itemType = item.querySelector('.history-item-type').textContent.toLowerCase();
        let itemDate = item.querySelector('.history-item-date').textContent.toLowerCase();
        let itemLabel = item.querySelector('.history-item-input-output').textContent.toLowerCase();

        if (itemType.includes(searchQuery) || itemDate.includes(searchQuery) || itemLabel.includes(searchQuery)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}
