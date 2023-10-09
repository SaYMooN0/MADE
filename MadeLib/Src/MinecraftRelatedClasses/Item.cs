
using Newtonsoft.Json;

namespace MadeLib.Src.MinecraftRelatedClasses
{
    public class Item
    {
        public string Id { get; set; }
        public string InGameName { get; set; } = "";
        public int MaxStackSize { get; set; } = 64;
        public int? BurnTime { get; set; } = null;
        public bool FireResistant { get; set; } = false;
        public Item(string id)
        {
            Id = id;
            InGameName = "";
        }
        public Item(string id, string inGameName)
        {
            Id = id;
            InGameName = inGameName;
        }
        [JsonConstructor]
        public Item(string id, string inGameName, int maxStackSize, int? burnTime, bool fireResistant)
        {
            Id = id;
            InGameName = inGameName;
            MaxStackSize = maxStackSize;
            this.BurnTime = burnTime;
            this.FireResistant = fireResistant;
        }
        const string pngExtension = ".png";
        public string GetImagePath() => Id + pngExtension;



    }
}
