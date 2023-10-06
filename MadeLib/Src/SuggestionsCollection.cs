using MadeLib.Src.MinecraftRelatedClasses;

namespace MadeLib.Src
{
    public class SuggestionsCollection
    {
        public const char TagChar = '#';
        public Loader Loader { get; private set; }
        public List<Mod> Mods  { get; private set; }
        public SuggestionsCollection(Loader loader, List<Mod> mods)
        {
            Loader = loader;
            Mods = mods;
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
                        .Where(i => i.Id.Contains(afterModIdString))
                        .Select(i => TagChar + mod.Id + ':' + i.Id)
                        .ToArray();
                }
                else
                    return mod.Items
                        .Where(i => i.Id.Contains(afterModIdString))
                        .Select(i => mod.Id + ":" + i.Id)
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
