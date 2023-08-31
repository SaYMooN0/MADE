

using MadeLib.Src.ProjectClasses;

namespace MadeLib.Src
{

    static class ActionsManager
    {
        static public HistoryItem HandleAction(ActionType actionType, Dictionary<string, string> arguments, string projectFolderPath)
        {
            string madeComment = GenerateMadeComment(actionType);
            switch (actionType)
            {
                case ActionType.StonecutterAdd:
                    {
                        string output = arguments["outputCount"] == "1" ? arguments["output"] : $"{arguments["outputCount"]}x {arguments["output"]}";
                        string contentToWrite = $"event.stonecutting('{output}','{arguments["input"]}')";
                        JsFilesController.WriteVanillaRecipe(contentToWrite, projectFolderPath, madeComment);
                        HistoryItem historyItem = new(madeComment, arguments,JsFilesController.GetFullVanillaPath());
                        return historyItem;

                    }
            }
            return null;
        }
        private static string GenerateRecipeId() => DateTime.Now.ToString("yyMMddHHmmss");
        private static string GenerateMadeComment(ActionType type) => "//Made:" + GenerateRecipeId() + "-" + type.ToString();

    }
}
