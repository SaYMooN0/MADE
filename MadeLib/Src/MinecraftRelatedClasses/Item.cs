
using Newtonsoft.Json;

namespace MadeLib.Src.MinecraftRelatedClasses
{
    public class Item
    {
        public string Id { get; set; }
        public string InGameName { get; set; } = "";
        [JsonConstructor]
        public Item(string id, string inGameName)
        {
            Id = id;
            InGameName = inGameName;
        }
        public Item(string id)
        {
            Id = id;
            InGameName = "";
        }
    }
}
