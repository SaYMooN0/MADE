using Newtonsoft.Json;

namespace MadeLib.Src.MinecraftRelatedClasses
{
    public class Mod
    {
        public string Id { get; private set; }
        public string InGameName { get; private set; } = "";
        public List<string> Items { get; private set; } = new List<string>();
        public List<string> Tags { get; private set; } = new List<string>();
        public List<ProcessingType> SupportedTypes { get; private set; } = new();
        public Mod(string id) { new Mod(id, ""); }
        public Mod(string id, string inGameName)
        {
            Id = id;
            InGameName = inGameName;
            Items = new();
            Tags = new();
            SupportedTypes = new();

        }
        [JsonConstructor]
        public Mod(string id, string inGameName, List<string> items, List<string> tags, List<ProcessingType> supportedTypes)
        {
            Id = id;
            InGameName = inGameName;
            Items = items;
            Tags = tags;
            SupportedTypes = supportedTypes;


        }
    }
}
