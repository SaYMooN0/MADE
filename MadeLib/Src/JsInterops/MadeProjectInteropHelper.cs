// Ignore Spelling: Interops Interop

using Microsoft.JSInterop;

namespace MadeLib.Src.JsInterops
{
    public class MadeProjectInteropHelper
    {
        [JSInvokable]
        static public void SetShowWarningWhenDeletingAction(bool value) { ProjectManager.CurrentProject.Settings.ShowWarningWhenDeletingAction = value; }
        [JSInvokable]
        static public bool GetShowWarningWhenDeletingAction() { return ProjectManager.CurrentProject.Settings.ShowWarningWhenDeletingAction; }
        [JSInvokable]
        static public string TryChangeCollectionItem (string collectionType, string oldValue, string newValue) {
            switch(collectionType)
            {
                case "items":
                    return ProjectManager.CurrentProject.EditCollectionItem(oldValue, newValue);
                default: return "An error has occurred";
            }
        }

    }
}
