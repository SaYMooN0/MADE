async function histotyItemDeleteButtonClicked(event, buttonElement, actionId, filePath) {
    event.stopPropagation();
    const dialog = document.querySelector('.histotyItemDeletingDialog');
    dialog.showModal();
    document.getElementById('confirmDelete').onclick = async () => {
        dialog.close();
        let historyItemElement = buttonElement.closest('.history-item');
        if (historyItemElement) {
            await DotNet.invokeMethodAsync('MadeLib', 'HandleActionDeleting', actionId, filePath);
            historyItemElement.remove();
        }
    };
    document.getElementById('cancelDelete').onclick = () => {
        dialog.close();
    };
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
