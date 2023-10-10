// Ignore Spelling: Interops Interop

using MadeLib.Src.MinecraftRelatedClasses;
using Microsoft.JSInterop;
using System.IO;
using System.Drawing;

namespace MadeLib.Src.JsInterops
{
    public class MadeProjectInteropHelper
    {
        [JSInvokable]
        static public void SetShowWarningWhenDeletingAction(bool value) { ProjectManager.CurrentProject.Settings.ShowWarningWhenDeletingAction = value; }
        [JSInvokable]
        static public bool GetShowWarningWhenDeletingAction() { return ProjectManager.CurrentProject.Settings.ShowWarningWhenDeletingAction; }
        [JSInvokable]
        static public string TryChangeCollectionItem(string collectionType, string oldValue, string newValue)
        {
            switch (collectionType)
            {
                case "items":
                    return ProjectManager.CurrentProject.EditCollectionItem(oldValue, newValue);
                default: return "An error has occurred";
            }
        }
        [JSInvokable]
        static public Item GetItemInfo(string itemId)
        {
            return ProjectManager.CurrentProject.GetItemById(itemId);
        }
        [JSInvokable]
        static public string GetItemImgInBase64(string itemId)
        {
            string imagePath = ProjectManager.CurrentProject.GetItemImgById(itemId);
            if (string.IsNullOrEmpty(imagePath)) return null;
            try
            {
                using var image = Image.FromFile(imagePath);
                using var ms = new MemoryStream();
                image.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                return Convert.ToBase64String(ms.ToArray());
            }
            catch
            {
                return "";
            }
        }

    }
}
