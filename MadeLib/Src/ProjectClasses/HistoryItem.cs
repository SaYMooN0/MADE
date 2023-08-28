// Ignore Spelling: Json

namespace MadeLib.Src.ProjectClasses
{
    public class HistoryItem
    {
        public DateTime CreationTime{ get; set; }
        public string Title { get; private set; }   
        public ActionType ActionType { get; private set; }
        public string ContentJsonString { get; set; }
    }
}
