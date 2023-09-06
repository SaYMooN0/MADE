using MadeLib.Src.MinecraftRelatedClasses;
using Microsoft.AspNetCore.Components.Web;
using Newtonsoft.Json;

namespace MadeLib.Src
{
    public class SuggestionsCollection
    {
        public const char TagChar = '#';
        public List<Mod> Mods { get; set; } = new();
        [JsonConstructor]
        public SuggestionsCollection(List<Mod> mods) { Mods = mods; }
        public SuggestionsCollection(Loader loader)
        {
            Mods = new();
            Mod minecraft = new Mod("minecraft", new() { "stone", "granite", "dirt", "andesite", "sand" }, new());
            Mods.Add(minecraft);
            Mods.Add(new Mod("minecr"));
            Mods.Add(new Mod("minecra"));
            Mods.Add(new Mod("minecraf"));
            Mods.Add(new Mod("min"));
            if (loader == null)
            {
                Mod forge = new Mod("forge");
                Mod fabric = new Mod("fabric");
                Mods.Add(forge);
                Mods.Add(fabric);
            }
            else if (loader == Loader.Forge)
            {
                Mod forge = new Mod("forge", new(), new() { "ores", "ores/copper" });
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
            if (string.IsNullOrEmpty(input))
                return new string[] { };
            if (!input.Contains(':'))
                return Mods.Where(
                    i =>
                    {
                        if (input.StartsWith("#")) return i.Id.Contains(input.Substring(1));

                        else return i.Id.Contains(input);
                    }).Select(m => input.StartsWith("#") ? "#" + m.Id : m.Id).ToArray();
            else
            {
                Mod mod = GetModFromInput(input);
                if (mod == null) return new string[] { };
                string afterModIdString = input.Split(':')[1];
                if (input[0] == TagChar)
                {
                    return mod.Tags
                        .Where(i => i.Contains(afterModIdString))
                        .Select(i => TagChar + mod.Id + ':' + i)
                        .ToArray();
                }
                else
                    return mod.Items
                        .Where(i => i.Contains(afterModIdString))
                        .Select(i => mod.Id + ":" + i)
                        .ToArray();

            }
        }
        private Mod GetModFromInput(string input)
        {
            string modString = input.Split(':')[0];
            if (input[0] == TagChar)
                modString = modString.Substring(1);
            return Mods.FirstOrDefault(i => i.Id == modString);

        }

    }
}
