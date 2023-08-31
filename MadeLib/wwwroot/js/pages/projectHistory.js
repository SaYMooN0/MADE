function historyItemClicked(actionId) {
    addTab(`<div>Content: ${actionId} </div>`, `action-${actionId}`);
}