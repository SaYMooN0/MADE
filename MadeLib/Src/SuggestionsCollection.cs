namespace MadeLib.Src
{
    public class SuggestionsCollection
    {
        public const char TagChar = '#';
        public List<string> Mods { get; set; }
        public List<string> Tags { get; set; }
        public List<string> Items { get; set; }
        public SuggestionsCollection()
        {
            Mods = new List<string>() { "minecraft" };
            Tags = new();
            Items = new();
        }
        public SuggestionsCollection(List<string> mods, List<string> tags, List<string> items)
        {
            Mods = mods;
            Tags = tags;
            Items = items;
        }
        public string[] GetSuggestion(string input)
        {
            return new string[] { "a1", "a2", "a3", "a4", "a5", "a6" };
            //return output;
        }

    }
}
