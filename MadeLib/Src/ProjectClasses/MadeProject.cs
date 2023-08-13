using Newtonsoft.Json;

namespace MadeLib.Src.ProjectClasses
{
    public class MadeProject
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
        public void SaveToFile()
        {
            string jsonInstance = JsonConvert.SerializeObject(this, Formatting.Indented);
            File.WriteAllText(PathToFile, jsonInstance);
        }
        static MadeProject CreateFromFile( string filePath)
        {
            string jsonInstance = File.ReadAllText(filePath);
            if(string.IsNullOrEmpty(jsonInstance))
                return null;
            MadeProject project = JsonConvert.DeserializeObject<MadeProject>(jsonInstance);
            return project;
        }
        
    }
}
