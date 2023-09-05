using MadeLib.Src.MinecraftRelatedClasses;
using Newtonsoft.Json;

namespace MadeLib.Src
{
    public class SuggestionsCollection
    {
        public const char TagChar = '#';
        public List<Mod> Mods { get; set; } = new();
        [JsonConstructor]
        public SuggestionsCollection(List<Mod> mods) {  Mods = mods; }
        public SuggestionsCollection(Loader loader)
        {
            Mods = new();
            Mod minecraft = new Mod("minecraft");
            Mods.Add(minecraft);
            if (loader == null)
            {
                Mod forge = new Mod("forge");
                Mod fabric = new Mod("fabric");
                Mods.Add(forge);
                Mods.Add(fabric);
            }
            else if (loader == Loader.Forge)
            {
                Mod forge = new Mod("forge");
                Mods.Add(forge);
            }
            else if (loader == Loader.Fabric)
            {
                Mod fabric = new Mod("fabric");
                Mods.Add(fabric);
            }
        }

        public string[] GetSuggestion(string input)
        {
            return new string[] { "a1", "a2", "a3", "a4", "a5", "a6" };
            //return output;
        }

    }
}
