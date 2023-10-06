
using Newtonsoft.Json;

namespace MadeLib.Src.MinecraftRelatedClasses
{
    public class Tag
    {
        public string Id { get; set; }
        public string InGameName { get; set; } = "";
        [JsonConstructor]
        public Tag(string id, string inGameName)
        {
            Id = id;
            InGameName = inGameName;
        }
        public Tag(string id)
        {
            Id = id;
            InGameName = "";
        }
    }
}
