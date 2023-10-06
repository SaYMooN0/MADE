using MadeLib.Src.MinecraftRelatedClasses;
using Microsoft.AspNetCore.Components.Web;
using Newtonsoft.Json;
using System;
using System.Linq;

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
        public ProjectSettings Settings { get; private set; }
        public List<HistoryItem> History { get; private set; } = new();
        public List<Mod> Mods { get; private set; } = new();
        [JsonIgnore]
        public SuggestionsCollection SuggestionsCollection { get; private set; }
        public void SaveToFile()
        {
            string jsonInstance = JsonConvert.SerializeObject(this, Formatting.Indented);
            File.WriteAllText(FullPath, jsonInstance);
        }
        public static MadeProject CreateFromFile(string filePath)
        {
            try
            {
                string jsonInstance = File.ReadAllText(filePath);
                if (string.IsNullOrEmpty(jsonInstance))
                    return null;
                MadeProject project = JsonConvert.DeserializeObject<MadeProject>(jsonInstance);
                return project;
            }
            catch
            {
                return null;
            }
        }
        public MadeProject(string name, string fullPath, string pathToFolder, string version, Loader loader)
        {
            Name = name;
            FullPath = fullPath;
            PathToFolder = pathToFolder;
            Version = version;
            Loader = loader;
            CreationDate = DateTime.Now;
            LastUpdated = DateTime.Now;
            Settings = new ProjectSettings();
            History = new List<HistoryItem>();

            Mods = new List<Mod> {
                new Mod(
                    "minecraft",
                    "Minecraft",
                    new List<Item> { new("stone","Stone"), new("granite","Granite"), new("dirt","Dirt"), new("andesite","Andesite"), new("sand","Sand") },
                    new List<Tag>(),
                    new List<ProcessingType>
                    {
                        new ProcessingType("shapeless", "Shapeless crafting", true),
                        new ProcessingType("minecraft:campfire_cooking", "Campfire cooking", true)
                    })
            };

            if (loader == Loader.Forge)
                Mods.Add(new Mod("forge", "Forge", new List<Item>(), new List<Tag> { new("ores", "Forge ores"), new("ores/copper", "Forge copper ores") }, new List<ProcessingType>()));

            if (loader == Loader.Fabric)
                Mods.Add(new Mod("fabric", "Fabric"));
            SuggestionsCollection = new(loader, Mods);
        }
        [JsonConstructor]
        public MadeProject(string name, string fullPath, string pathToFolder, string version, Loader loader, DateTime creationDate, DateTime lastUpdated,
            ProjectSettings settings, List<HistoryItem> history, List<Mod> mods)
        {
            Name = name;
            FullPath = fullPath;
            PathToFolder = pathToFolder;
            Version = version;
            Loader = loader;
            CreationDate = creationDate;
            LastUpdated = lastUpdated;
            Settings = settings;
            History = history;
            Mods = mods;
            SuggestionsCollection = new(loader, mods);
        }
        public HistoryItem AddNewRecipe(ActionType type, Dictionary<string, string> arguments)
        {
            this.LastUpdated = DateTime.Now;
            HistoryItem historyItem = ActionsManager.HandleAction(type, arguments, PathToFolder);
            if (historyItem != null)
                History.Add(historyItem);
            SaveToFile();
            return historyItem;
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
            string fullPathToFile = Path.Combine(PathToFolder, filePath.Replace('/', '\\'));
            if (TryDeleteHistoryItemByActionId(actionId))
                ActionsManager.DeleteAction(actionId, fullPathToFile);
            SaveToFile();
        }
        public bool TryDeleteHistoryItemByActionId(string actionId)
        {
            HistoryItem historyItem = History.FirstOrDefault(item => item.ActionId == actionId);
            if (historyItem != null)
            {
                History.Remove(historyItem);
                return true;
            }
            return false;

        }
        public IEnumerable<(string Id, string InGameName)> GetAllItems(){return Mods.SelectMany(mod => mod.Items.Select(item => ($"{mod.Id}:{item.Id}", item.InGameName))); }

        public IEnumerable<(string Id, string InGameName)> GetAllTags() {return Mods.SelectMany(mod => mod.Tags.Select(tag => ($"#{mod.Id}:{tag.Id}", tag.InGameName)));}

        public IEnumerable<(string Id, string InGameName)> GetAllProcessingTypes()
        {
            return Mods.SelectMany(mod => mod.SupportedTypes)
                       .Select(type => (type.Id, type.InGameName))
                       .Distinct();
        }


        public string AddNewItem(string itemIdString) => AddNewItem(itemIdString, "");
        public string AddNewItem(string itemIdString, string inGameName)
        {
            string modString = itemIdString.Split(":")[0];
            itemIdString = itemIdString.Split(":")[1];
            Mod mod = Mods.FirstOrDefault(m => m.Id == modString);
            if (mod == null)
            {
                mod = new(modString);
                mod.Items.Add(new(itemIdString, inGameName));
                Mods.Add(mod);
            }
            else
            {
                if (mod.Items.Any(item=>item.Id==inGameName))
                    return $"Mod with id {mod.Id} already contains this item";
                mod.Items.Add(new(itemIdString, inGameName));
            }
            SaveToFile();
            return "";
        }
        public string EditCollectionItem(string oldItem, string newItem)
        {
            string processResult = AddNewItem(newItem);
            if (!string.IsNullOrEmpty(processResult))
                return processResult;
            processResult = DeleteItemFromCollection(oldItem);
            if (!string.IsNullOrEmpty(processResult))
                return processResult;
            return "";

        }
        public string DeleteItemFromCollection(string itemToDelete)
        {
            string modString = itemToDelete.Split(":")[0];
            itemToDelete = itemToDelete.Split(":")[1];
            Mod mod = Mods.FirstOrDefault(mod => mod.Id == modString);
            if (mod != null)
            {
                Item item = mod.Items.FirstOrDefault(i => i.Id == itemToDelete);
                if (item != null)
                {
                    mod.Items.Remove(item);
                    SaveToFile();
                    return "";
                }
                else
                    return $"No item with id {itemToDelete} found in the mod {modString}";
            }
            else
                return $"No mod with id {modString} found";
        }



    }
}
