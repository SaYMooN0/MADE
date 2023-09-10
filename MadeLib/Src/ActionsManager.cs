

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
            foreach (string key in arguments.Keys)
            {
                arguments[key] = arguments[key].Replace("'",string.Empty);
            }
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
                case ActionType.FurnaceOnlyAdd:
                    {
                        string contentToWrite = $"event.smelting('{arguments["output"]}', '{arguments["input"]}')";
                        JsFilesController.WriteVanillaRecipe(contentToWrite, projectFolderPath, actionId);
                        HistoryItem historyItem = new(arguments, JsFilesController.GetFullVanillaPath(), actionId, actionType);
                        return historyItem;

                    }
                case ActionType.FurnaceAndBlastAdd:
                    {
                        string contentToWrite = $"event.smelting('{arguments["output"]}', '{arguments["input"]}');";
                        contentToWrite += $"event.blasting('{arguments["output"]}', '{arguments["input"]}');";
                        JsFilesController.WriteVanillaRecipe(contentToWrite, projectFolderPath, actionId);
                        HistoryItem historyItem = new(arguments, JsFilesController.GetFullVanillaPath(), actionId, actionType);
                        return historyItem;

                    }
                case ActionType.FurnaceAndSmokerAdd:
                    {
                        string contentToWrite = $"event.smelting('{arguments["output"]}', '{arguments["input"]}');";
                        contentToWrite += $"event.smoking('{arguments["output"]}', '{arguments["input"]}');";
                        JsFilesController.WriteVanillaRecipe(contentToWrite, projectFolderPath, actionId);
                        HistoryItem historyItem = new(arguments, JsFilesController.GetFullVanillaPath(), actionId, actionType);
                        return historyItem;

                    }
                default: return null;
            }  
        }
        static public void DeleteAction(string ActionId, string fullPathToFile) { JsFilesController.DeleteAction(ActionId, fullPathToFile);  }
        private static string GenerateRecipeId() => DateTime.Now.ToString("yyMMddHHmmss");
       

    }
}
