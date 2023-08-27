var activeSuggestionIndex = 0;
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
            else if ((e.key === "Tab" || e.key === "Enter") && activeSuggestionIndex > -1) {
                e.preventDefault();
                input.value = container.children[activeSuggestionIndex].innerText;
                container.remove();
                activeSuggestionIndex = -1;
            }
        }
    }
});
document.addEventListener('blur', function (e) { if (e.target.tagName === 'INPUT') { hideAllSuggestions(); } }, true);
document.addEventListener('input', function (e) {
    const data = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Ki', 'Kwi', 'awi', 'cxziwi', 'Kdasaswi', 'Kweiwi'];
    hideAllSuggestions();

    if (e.target.dataset.suggestions !== undefined) {
        hideAllSuggestions()
        const query = e.target.value.toLowerCase();
        const suggestions = data.filter(item => item.toLowerCase().includes(query));
        if (suggestions.length > 0) {
            displaySuggestions(e.target, suggestions);
        }
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
    if (!container || container.dataset.type !== "suggestions-container") {
        container = document.createElement('div');
        container.dataset.type = "suggestions-container";
        container.addEventListener('mousedown', function (e) { e.preventDefault(); });
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
            if (activeSuggestionIndex !== null && container.children[activeSuggestionIndex]) {
                container.children[activeSuggestionIndex].classList.remove('active');
            }
            activeSuggestionIndex = Array.from(container.children).indexOf(this);
            this.classList.add('active');
        });
        div.addEventListener('dblclick', function () {
            inputElem.value = this.textContent;
            hideAllSuggestions();
        });

        container.appendChild(div);
    }
    activeSuggestionIndex = 0;
    container.children[activeSuggestionIndex].classList.add('active');
}
