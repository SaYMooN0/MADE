

using MadeLib.Src.ProjectClasses;

namespace MadeLib.Src
{

    static class ActionsManager
    {
        static public HistoryItem HandleAction(ActionType actionType, Dictionary<string, string> arguments, string projectFolderPath)
        {
            string actionId = GenerateRecipeId();
            return HandleAction(actionType,arguments,projectFolderPath,actionId);
        }
        static public HistoryItem HandleAction(ActionType actionType, Dictionary<string, string> arguments, string projectFolderPath,string actionId)
        {
            switch (actionType)
            {
                case ActionType.StonecutterAdd:
                    {
                        string output = arguments["outputCount"] == "1" ? arguments["output"] : $"{arguments["outputCount"]}x {arguments["output"]}";
                        string contentToWrite = $"event.stonecutting('{output}','{arguments["input"]}')";
                        JsFilesController.WriteVanillaRecipe(contentToWrite, projectFolderPath, actionId);
                        HistoryItem historyItem = new(arguments, JsFilesController.GetFullVanillaPath(), actionId, actionType);
                        return historyItem;

                    }
                default: return null;
            }  
        }
        static public void RemoveAction(string ActionId, string filePath) { JsFilesController.DeleteAction(ActionId, filePath); }
        private static string GenerateRecipeId() => DateTime.Now.ToString("yyMMddHHmmss");
       

    }
}
