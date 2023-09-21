

using MadeLib.Src.ProjectClasses;
using Newtonsoft.Json;

namespace MadeLib.Src
{

    static class ActionsManager
    {
        static public HistoryItem HandleAction(ActionType actionType, Dictionary<string, string> arguments, string projectFolderPath)
        {
            string actionId = GenerateRecipeId();
            return HandleAction(actionType, arguments, projectFolderPath, actionId);
        }
        static public HistoryItem HandleAction(ActionType actionType, Dictionary<string, string> arguments, string projectFolderPath, string actionId)
        {
            foreach (string key in arguments.Keys)
            {
                arguments[key] = arguments[key].Replace("'", string.Empty);
            }
            switch (actionType)
            {
                case ActionType.StonecutterAdd:
                    {
                        string contentToWrite = $"event.stonecutting('{returnItemWithCount(arguments["output"], arguments["outputCount"])}','{arguments["input"]}')";
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
                case ActionType.CraftingTableAdd:
                    {
                        Dictionary<char, string> letterItemDictionary =
                                JsonConvert.DeserializeObject<Dictionary<char, string>>(arguments["letterItemDictionary"]);
                        //arguments["letterItemDictionary"] = arguments["letterItemDictionary"].Replace("\"","`") ;
                        if (letterItemDictionary.Count < 1) return null;        //in case suddenly the letterItemDictionary is empty

                        Boolean.TryParse(arguments["isShapeless"], out bool isShapeless);
                        string contentToWrite = "";
                        if (isShapeless)
                        {
                            string itemsString = "";
                            string? item;
                            foreach (char letter in arguments["lettersInputGrid"]) {
                                letterItemDictionary.TryGetValue(letter, out item);
                                if(item!=null) itemsString += $"'{item}',";
                                item = null;
                            }
                            itemsString = itemsString.Substring(0, itemsString.Length - 1);
                            contentToWrite = $"event.shapeless('{returnItemWithCount(arguments["output"], arguments["outputCount"])}', [{itemsString}])";
                        }
                        else
                        {
                            string letterItemString = "";
                            foreach (var letterItemPair in letterItemDictionary) { letterItemString += letterItemPair.Key + $": '{letterItemPair.Value}',"; }
                            letterItemString = letterItemString.Substring(0, letterItemString.Length - 1);

                            string[] gridInputStrings = arguments["lettersInputGrid"].Split(',');
                            string gridInput = $"'{gridInputStrings[0]}'," +
                                                  $"'{gridInputStrings[1]}'," +
                                                  $"'{gridInputStrings[2]}'";
                            contentToWrite = $" event.shaped('{returnItemWithCount(arguments["output"], arguments["outputCount"])}', [{gridInput}], {{{letterItemString}}})";
                        }
                        JsFilesController.WriteVanillaRecipe(contentToWrite, projectFolderPath, actionId);
                        HistoryItem historyItem = new(arguments, JsFilesController.GetFullVanillaPath(), actionId, actionType);
                        return historyItem;
                    }
                default: return null;
            }
        }
        static public void DeleteAction(string ActionId, string fullPathToFile) { JsFilesController.DeleteAction(ActionId, fullPathToFile); }
        private static string GenerateRecipeId() => DateTime.Now.ToString("yyMMddHHmmss");
        private static string returnItemWithCount(string item, string itemCount) => itemCount == "1" ? item : $"{itemCount}x {item}";


    }
}
