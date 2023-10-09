// Ignore Spelling: Interops Interop

using MadeLib.Src.MinecraftRelatedClasses;
using Microsoft.JSInterop;
using Newtonsoft.Json;

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
        [JSInvokable]
        static public Item GetItemInfo(string itemId) {
            return ProjectManager.CurrentProject.GetItemById(itemId);
        }
        [JSInvokable]
        static public string GetItemImg(string itemId)
        {
            var a= ProjectManager.CurrentProject.GetItemImgById(itemId);
            return a;
        }

    }
}
