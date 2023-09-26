// Ignore Spelling: Interop
// Ignore Spelling: Interops
using MadeLib.Src.ProjectClasses;
using Microsoft.JSInterop;
namespace MadeLib.Src.JsInterops
{
    public class InteropHelper
    {
        [JSInvokable]
        public static HistoryItem HandleRecipeCreationFromJS(string stringType, Dictionary<string, string> arguments)
        {
            ActionType type = ActionTypeConverter.TypeFromString(stringType);
            return ProjectManager.CurrentProject.AddNewRecipe(type, arguments);
            
        }
        [JSInvokable]
        public static void HandleActionChanging(string actionId, string filePath, string stringType, Dictionary<string, string> arguments)
        {
            ActionType type = ActionTypeConverter.TypeFromString(stringType);
            ProjectManager.CurrentProject.ChangeAction(actionId, filePath, type, arguments);
        }
        [JSInvokable]
        static public void HandleActionDeleting(string actionId, string filePath)
        {
            ProjectManager.CurrentProject.DeleteActionById(actionId, filePath);
        }
        [JSInvokable]
        public static string[] GetSuggestions(string input)
        {
            MadeSettings madeSettings = MadeSettings.Initialize();
            if (!madeSettings.EnableSuggestions)
                return new string[0];
            return ProjectManager.CurrentProject.Suggestions.GetSuggestion(input);
        }
    }

}
