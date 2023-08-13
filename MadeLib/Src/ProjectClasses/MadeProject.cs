﻿using Newtonsoft.Json;

namespace MadeLib.Src.ProjectClasses
{
    public class MadeProject
    {
        public const string FileExtension = ".madeProject";
        public string Name { get; private set; }
        public string FullPath { get; private set; }
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
            File.WriteAllText(FullPath, jsonInstance);
        }
        static MadeProject CreateFromFile( string filePath)
        {
            string jsonInstance = File.ReadAllText(filePath);
            if(string.IsNullOrEmpty(jsonInstance))
                return null;
            MadeProject project = JsonConvert.DeserializeObject<MadeProject>(jsonInstance);
            return project;
        }
        public MadeProject(string name, string fullPath, string pathToFolder, string version, Loader loader, DateTime creationDate, DateTime lastUpdated, List<string> itemsCollection, List<string> tagsCollection, ProjectSettings settings, List<HistoryItem> history)
        {
            Name = name;
            FullPath = fullPath;
            PathToFolder = pathToFolder;
            Version = version;
            Loader = loader;
            CreationDate = creationDate;
            LastUpdated = lastUpdated;
            ItemsCollection = itemsCollection;
            TagsCollection = tagsCollection;
            Settings = settings;
            History = history;
        }

    }
}
