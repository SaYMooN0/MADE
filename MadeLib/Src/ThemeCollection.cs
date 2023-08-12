

using Newtonsoft.Json;

namespace MadeLib.Src
{
    public class ThemeCollection
    {
        public List<Theme> Themes { get; private set; } = new();
        [JsonProperty("_currentThemeName")]
        public string _currentThemeName { get; private set; }
        private List<string> _themeNames = new();
        private const string FileName = "themes.madeThemes";
        [JsonIgnore]
        public Theme CurrentTheme
        {
            get
            {
                var theme = Themes.FirstOrDefault(t => t.Name == _currentThemeName);
                return theme ?? Themes.FirstOrDefault();
            }
            set
            {
                _currentThemeName = value?.Name;
            }
        }
        public static ThemeCollection Initialize()
        {
            if (!File.Exists(FileName))
                CreateDefaultThemesFile();
            ThemeCollection themeCollection = LoadFromFile();
            return themeCollection;
        }
        private static void CreateDefaultThemesFile()
        {
            ThemeCollection themeCollection = new();
            Theme dark = Theme.DefaultDark();
            Theme light = Theme.DefaultLight();
            themeCollection.Themes.Add(dark);
            themeCollection.Themes.Add(light);
            themeCollection._themeNames.Add(dark.Name);
            themeCollection._themeNames.Add(light.Name);
            themeCollection._currentThemeName = dark.Name;
            themeCollection.SaveToFile();
        }
        private static ThemeCollection LoadFromFile()
        {
            string jsonInstance = File.ReadAllText(FileName);
            ThemeCollection _themes = JsonConvert.DeserializeObject<ThemeCollection>(jsonInstance);
            return _themes;
        }
        public void SaveToFile()
        {
            string jsonInstance = JsonConvert.SerializeObject(this, Formatting.Indented);
            File.WriteAllText(FileName, jsonInstance);
        }
    }


}
