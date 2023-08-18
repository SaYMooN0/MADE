function closeModal(dialogId) {
    let dialog = document.getElementById("warningDialog");
    dialog.close();
}
function showWarning() { document.getElementById("warning").innerHTML = "!Warning! The folder with the modpack that you are trying to open is most likely created not with CurseForge. For better performance and to avoid errors in Made and the modpack itself, it is recommended to recreate your modpack using CurseForge</br>" }
function hideWarning() { document.getElementById("warning").innerHTML = "" }

function showErrorMessage() {
    let warningMessage = "Made failed to create a project file in the folder you specified. Make sure there is no .madeProject files. If there are still no files with the .madeProject extension there, but you still see this message, we apologize to you and ask you to describe your problem on the issues page on github";
    let dialog = document.getElementById("warningDialog");
    let dialogStringContent = document.getElementById("warningDialogString");
    dialogStringContent.innerText = warningMessage;
    dialog.showModal();
    document.getElementById("openGithubBtn").addEventListener('click', function () { window.open("https://github.com/SaYMooN0/Made/issues", '_blank'); });
}
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
function isVersionSupported(version, loader) {
    if (loader == "Forge") {
        if (kubjsVersionsForForge.includes(version)) {
            return true;
        }
    }
    else if (loader == "Fabric") {
        if (kubjsVersionsForFabric.includes(version)) {
            return true;
        }
    }
    return false;
}
const kubjsVersionsForForge = ["1.12.2", "1.14.4", "1.15.1", "1.15.2", "1.16.1", "1.16.2", "1.16.3", "1.16.4", "1.16.5", "1.18", "1.18.1", "1.18.1", "1.18.2", "1.19", "1.19.2"];
const kubjsVersionsForFabric = ["1.18.2", "1.19", "1.19.2"];