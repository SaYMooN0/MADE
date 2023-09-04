
using Newtonsoft.Json;

namespace MadeLib.Src
{
    public class MadeSettings
    {
        public bool EnableSuggestions { get; set; } = true;
        private const string FileName = "settings.madeSettings";
        public static MadeSettings Initialize()
        {
            if (!File.Exists(FileName))
                return new MadeSettings();
            MadeSettings settings = LoadFromFile();
            return settings;
        }
        private static MadeSettings LoadFromFile()
        {
            string jsonInstance = File.ReadAllText(FileName);
            MadeSettings settings = JsonConvert.DeserializeObject<MadeSettings>(jsonInstance);
            return settings;
        }
        public void SaveToFile()
        {
            string jsonInstance = JsonConvert.SerializeObject(this, Formatting.Indented);
            File.WriteAllText(FileName, jsonInstance);
        }
    }
}
