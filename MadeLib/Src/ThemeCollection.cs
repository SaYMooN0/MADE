

namespace MadeLib.Src
{
    public class ThemeCollection
    {
        public List<Theme> Themes { get; private set; } = new ();
        private List<string> _themeNames = new ();
        public static ThemeCollection Initialize()
        {
            if (!Directory.Exists(Theme.ThemesFolderName))
                Directory.CreateDirectory(Theme.ThemesFolderName);

            if (Directory.EnumerateFiles(Theme.ThemesFolderName, '*'+Theme.FileExtension).Count() < 1)
                CreateDefaultThemeFiles();

            return CreateInstanceFromFiles();
        }
        private static void CreateDefaultThemeFiles()
        {
            Theme _theme = Theme.DefaultDark();
            _theme.TrySaveToFile();

            _theme=Theme.DefaultLight();
            _theme.TrySaveToFile();
        }
        private static ThemeCollection CreateInstanceFromFiles()
        {
            ThemeCollection themeCollection = new ThemeCollection();
            string[] filePaths = Directory.GetFiles(Theme.ThemesFolderName, '*' + Theme.FileExtension);

            foreach (string filePath in filePaths)
            {
                string fileName = Path.GetFileNameWithoutExtension(filePath);
                themeCollection._themeNames.Add(fileName);
                themeCollection.Themes.Add(Theme.LoadFromJson(filePath));
            }

            return themeCollection;
        }
    }

}
