var activeSuggestionIndex = -1;
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 27) {
        hideAllSuggestions();
        return;
    }
    const input = e.target;
    if (input.dataset.suggestions !== undefined) {
        const container = document.querySelector('[data-type="suggestions-container"]');
        if (container && container.dataset.type === "suggestions-container" && container.children.length) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (activeSuggestionIndex > -1 && container.children[activeSuggestionIndex]) {
                    container.children[activeSuggestionIndex].classList.remove('active');
                }
                activeSuggestionIndex = (activeSuggestionIndex + 1) % container.children.length;
                container.children[activeSuggestionIndex].classList.add('active');
            }
            else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (activeSuggestionIndex > -1 && container.children[activeSuggestionIndex]) {
                    container.children[activeSuggestionIndex].classList.remove('active');
                }
                activeSuggestionIndex--;
                if (activeSuggestionIndex < 0) {
                    activeSuggestionIndex = container.children.length - 1;
                }
                container.children[activeSuggestionIndex].classList.add('active');
            }
            else if ((e.key === "Tab" || e.key === "Enter")  && activeSuggestionIndex > -1) {
                e.preventDefault();
                input.value = container.children[activeSuggestionIndex].innerText;
                container.remove();
                activeSuggestionIndex = -1;
            }
        }
    }
});
function createActionOnClick(event) {
    tabCreationResult = addTab(`
        <link href="_content/MadeLib/css/tab_content/recipes.css" rel="stylesheet" />
        <link href="_content/MadeLib/css/tab_content/components.css" rel="stylesheet" />
        <div class="vanila-recipe-container">
        <select id="vanilla-type-selection" onchange="handleSelectionChange(this)" class='default-select vanila-type-select'>
        <option value="crafting-table">Crafting Table</option>
        <option value="furnace">Furnace</option>
        <option value="stonecutter">Stonecutter</option>
        </select>
        <div id="crafting-table-recipe-content"> <label>crafting-table </label> </div>
        <div id="furnace-recipe-content"> 



        <input type="text" data-suggestions>
        
        
        </div>
        <div id="stonecutter-recipe-content"> 
        <form onsubmit="formSaveButtonClicked(event,'stonecutter')">
            <p class="input-line"><label class="default-input-label"> input: </label> <input class="default-input" type="text" data-suggestions></p>
            <p class="input-line"><label class="default-input-label"> output: </label> <input class="default-input" type="text" data-suggestions> <input class="default-input-num" type="number"></p>
            <p class="default-submit"><input type="submit"></p>
        </form>
        </div>
    </div>`, "new-recipe");
    if (tabCreationResult) {
        closeTabFromButton(event)
    }
    switchToTab("new-recipe");
}
function deleteActionOnClick() { alert("deleteActionOnClick"); }
function changeActionOnClick() { alert("changeActionOnClick"); }
function moddedActionOnClick() { alert("moddedActionOnClick"); }
function groupActionOnClick() { alert("groupActionOnClick"); }
function closeTabFromButton(event) {
    let tabPage = $(event.target).closest('.tabPage');
    if (!tabPage.length) { return; }
    let tabItem = $(".tab-item[data-tab='" + tabPage.attr('id') + "']");
    if (!tabItem.length) { return; }
    tabItem.remove();
    tabPage.remove();
    let firstRemainingTabName = $(".tab-item").first().attr("data-tab").replace("tab-", "");
    if (firstRemainingTabName) {
        switchToTab(firstRemainingTabName);
    }
}
function handleSelectionChange(selectElement) {
    // —крываем все дивы
    document.getElementById('crafting-table-recipe-content').style.display = 'none';
    document.getElementById('furnace-recipe-content').style.display = 'none';
    document.getElementById('stonecutter-recipe-content').style.display = 'none';

    // ѕоказываем нужный див в зависимости от выбранного значени€
    const value = selectElement.value;
    document.getElementById(value + '-recipe-content').style.display = 'block';
}
function formSaveButtonClicked(e, type) {
    e.preventDefault();
    alert(type);

}
document.addEventListener('input', function (e) {
    const data = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi'];
    if (e.target.dataset.suggestions !== undefined) {
        hideAllSuggestions()
        const query = e.target.value.toLowerCase();
        const suggestions = data.filter(item => item.toLowerCase().includes(query));
        displaySuggestions(e.target, suggestions);
    }
});
function hideAllSuggestions() {
    const allContainers = document.querySelectorAll('[data-type="suggestions-container"]');
    allContainers.forEach(container => container.remove());
}

function hideSuggestions(inputElem) {
    let container = inputElem.nextElementSibling;
    if (container && container.dataset.type === "suggestions-container") {
        container.remove();
    }
}
function displaySuggestions(inputElem, suggestions) {
    let container = inputElem.nextElementSibling;

    // ≈сли контейнер дл€ подсказок не существует, создайте его
    if (!container || container.dataset.type !== "suggestions-container") {
        container = document.createElement('div');
        container.dataset.type = "suggestions-container";
        document.body.appendChild(container);
    }

    const rect = inputElem.getBoundingClientRect();

    container.style.top = `${rect.bottom + window.scrollY}px`;
    container.style.left = `${rect.left + window.scrollX}px`;
    container.style.width = `${rect.width}px`;

    container.innerHTML = '';

    for (const suggestion of suggestions) {
        const div = document.createElement('div');
        div.innerText = suggestion;
        div.addEventListener('click', function () {
            inputElem.value = suggestion;
            container.remove();
        });
        container.appendChild(div);
    }
}
