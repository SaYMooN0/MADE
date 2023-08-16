function showModal(dialogId) {
    let dialog = document.getElementById(dialogId);
    dialog.showModal();
}
function closeModal(dialogId) {
    let dialog = document.getElementById(dialogId);
    dialog.close();
}
function showWarning() { document.getElementById("warning").innerHTML = "!Warning! The folder with the modpack that you are trying to open is most likely created not with CurseForge. For better performance and to avoid errors in Made and the modpack itself, it is recommended to recreate your modpack using CurseForge</br>" }
function closeWarning() { document.getElementById("warning").innerHTML = "" }

function showUnsupportedVersionMessage(version, loader) {
    let warningMessage = "You are trying to create a project to work with ";
    warningMessage = warningMessage + loader.toString() + " for " + version.toString();
    warningMessage = warningMessage + " minecraft version, but unfortunately kubejs does not support this version, therefore Made also cannot work with this version. If you are sure that kubejs supports ";
    warningMessage = warningMessage + loader.toString() + " " + version.toString() + " let us know on the issues page on github.";
    let dialog = document.getElementById("warningDialog");
    let dialogStringContent = document.getElementById("warningDialogString");
    dialogStringContent.innerText = warningMessage;
    dialog.showModal();
    document.getElementById("openGithubBtn").addEventListener('click', function () { window.open("https://github.com/SaYMooN0/Made/issues", '_blank'); });
}