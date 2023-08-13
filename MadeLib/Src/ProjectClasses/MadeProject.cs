namespace MadeLib.Src.ProjectClasses
{
    internal class MadeProject
    {
        public const string FileExtension = ".madeProject";
        public string Name { get; private set; }
        public string PathToFile { get; private set; }
        public string PathToFolder { get; private set; }
        public string Version { get; private set; }
        public Loader Loader { get; private set; }
        public DateTime CreationDate { get; private set; }
        public DateTime LastUpdated { get; private set; }
        public List<string> ItemsCollection { get; private set; }
        public List<string> TagsCollection { get; private set; }
        public ProjectSettings Settings { get; private set; }
        public List<HistoryItem> History { get; private set; } = new();
    }
}
