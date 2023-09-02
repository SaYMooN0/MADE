using Microsoft.JSInterop;
using Newtonsoft.Json;
using System;

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
        public List<string> ItemsCollection { get; private set; } = new();
		public List<string> TagsCollection { get; private set; } = new();
		public ProjectSettings Settings { get; private set; }
        public List<HistoryItem> History { get; private set; } = new();
        public void SaveToFile()
        {
            string jsonInstance = JsonConvert.SerializeObject(this, Formatting.Indented);
            File.WriteAllText(FullPath, jsonInstance);
        }
        public static MadeProject CreateFromFile( string filePath)
        {
            try
            {
                string jsonInstance = File.ReadAllText(filePath);
                if (string.IsNullOrEmpty(jsonInstance))
                    return null;
                MadeProject project = JsonConvert.DeserializeObject<MadeProject>(jsonInstance);
                return project;
            }
            catch { 
                return null; 
            }
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
	
		public void AddNewRecipe(ActionType type, Dictionary<string,string> arguments)
        {
            this.LastUpdated=DateTime.Now;
            HistoryItem historyItem=ActionsManager.HandleAction(type, arguments, PathToFolder);
            if(historyItem !=null)
                History.Add(historyItem);
			SaveToFile();
		}
        public void ChangeAction(string actionId, string filePath, ActionType type, Dictionary<string, string> arguments)
        {
            ProjectManager.CurrentProject.DeleteActionById(actionId, filePath);
            this.LastUpdated = DateTime.Now;
            HistoryItem historyItem = ActionsManager.HandleAction(type, arguments, PathToFolder, actionId);
            if (historyItem != null)
                History.Add(historyItem);
            SaveToFile();
        }
        public void DeleteActionById(string actionId, string filePath)
        {
            
            string fullPathToFile=Path.Combine(PathToFolder, filePath.Replace('/','\\'));
            if (TryDeleteHistoryItemByActionId(actionId))
                ActionsManager.DeleteAction(actionId, fullPathToFile);
            SaveToFile();
        }
        public bool TryDeleteHistoryItemByActionId(string actionId)
        {
            HistoryItem historyItem = History.FirstOrDefault(item=>item.ActionId== actionId);
            if (historyItem != null)
            {
                History.Remove(historyItem);
                return true;
            }
            return false;

        }
	}
}
