
using Newtonsoft.Json;

namespace MadeLib.Src.MinecraftRelatedClasses
{
    public class Block
    {
        public string Id { get; set; }
        public string InGameName { get; set; } = "";
        public int MaxStackSize { get; set; } = 64;
        public int? BurnTime { get; set; } = null;
        public bool FireResistant { get; set; } = false;
        public float Hardness { get; set; } = 1;
        public float Resistance { get; set; } = 1;
        public Block(string id)
        {
            Id = id;
            InGameName = "";
        }
        public Block(string id, string inGameName)
        {
            Id = id;
            InGameName = inGameName;
        }
        [JsonConstructor]
        public Block(string id, string inGameName, int maxStackSize, int? burnTime, bool fireResistant, float hardness, float resistance)
        {
            Id = id;
            InGameName = inGameName;
            MaxStackSize = maxStackSize;
            BurnTime = burnTime;
            FireResistant = fireResistant;
            Hardness = hardness;
            Resistance = resistance;
        }

    }
}
