// Ignore Spelling: Json
namespace MadeLib.Src.ProjectClasses
{
    public class HistoryItem
    {
        public Dictionary<string, string> Arguments { get; private set; }
        public string FilePath { get; private set; }
        public string ActionId { get; private set; }
        public ActionType ActionType { get; private set; }
        public HistoryItem(Dictionary<string, string> arguments, string filePath, string actionId, ActionType actionType)
        {
            Arguments = arguments;
            FilePath = filePath;
            ActionId = actionId;
            ActionType = actionType;
        }

        public DateTime? GetCreationTime()
        {
            if(DateTime.TryParseExact(ActionId, "yyMMddHHmmss", null, System.Globalization.DateTimeStyles.None, out DateTime result))
                return result;
            return null;
        }
        public string InputToOutput() => $"'{this.Arguments["input"]}' to '{this.Arguments["output"]}'";

    }
}
