
using Newtonsoft.Json;
using System.Drawing;
namespace MadeLib.Src
{
    public class Theme
    {
        
        public string Name { get; private set; }
        private Color _main_back;
        private Color _second_back;
        private Color _third_back;
        private Color _main_front;
        private Color _second_front;
        private Color _third_front;
        private Color _main_bright;
        private Color _second_bright;
        private Color _third_bright;
        private Color _warning_main;
        private Color _warning_bright;
        public const string FileExtension = ".made_theme";
        public const string ThemesFolderName = "themes";
        public Theme(string name, string mainBackColor, string secondBackColor, string thirdBackColor, string mainFrontColor, string secondFrontColor, string thirdFrontColor, string mainBrightColor, string secondBrightColor, string thirdBrightColor, string warningMainColor, string warningBrightColor)
        {
            Name = name;
            MainBackColor = mainBackColor;
            SecondBackColor = secondBackColor;
            ThirdBackColor = thirdBackColor;
            MainFrontColor = mainFrontColor;
            SecondFrontColor = secondFrontColor;
            ThirdFrontColor = thirdFrontColor;
            MainBrightColor = mainBrightColor;
            SecondBrightColor = secondBrightColor;
            ThirdBrightColor = thirdBrightColor;
            WarningMainColor = warningMainColor;
            WarningBrightColor = warningBrightColor;
        }

        public string MainBackColor
        {
            get => ColorToHex(_main_back);
            set => _main_back = HexToColor(value);
        }
        public string SecondBackColor
        {
            get => ColorToHex(_second_back);
            set => _second_back = HexToColor(value);
        }
        public string ThirdBackColor
        {
            get => ColorToHex(_third_back);
            set => _third_back = HexToColor(value);
        }
        public string MainFrontColor
        {
            get => ColorToHex(_main_front);
            set => _main_front = HexToColor(value);
        }
        public string SecondFrontColor
        {
            get => ColorToHex(_second_front);
            set => _second_front = HexToColor(value);
        }
        public string ThirdFrontColor
        {
            get => ColorToHex(_third_front);
            set => _third_front = HexToColor(value);
        }
        public string MainBrightColor
        {
            get => ColorToHex(_main_bright);
            set => _main_bright = HexToColor(value);
        }
        public string SecondBrightColor
        {
            get => ColorToHex(_second_bright);
            set => _second_bright = HexToColor(value);
        }
        public string ThirdBrightColor
        {
            get => ColorToHex(_third_bright);
            set => _third_bright = HexToColor(value);
        }
        public string WarningMainColor
        {
            get => ColorToHex(_warning_main);
            set => _warning_main = HexToColor(value);
        }
        public string WarningBrightColor
        {
            get => ColorToHex(_warning_bright);
            set => _warning_bright = HexToColor(value);
        }
        private string ColorToHex(Color color)
        {
            return $"#{color.R:X2}{color.G:X2}{color.B:X2}";
        }
        private Color HexToColor(string hex)
        {
            if (hex.StartsWith("#"))
                hex = hex.Substring(1);

            if (hex.Length == 6)
            {
                return Color.FromArgb(
                    255,
                    int.Parse(hex.Substring(0, 2), System.Globalization.NumberStyles.HexNumber),
                    int.Parse(hex.Substring(2, 2), System.Globalization.NumberStyles.HexNumber),
                    int.Parse(hex.Substring(4, 2), System.Globalization.NumberStyles.HexNumber));
            }
            else
            {
                throw new ArgumentException("Invalid hex format. Expected RGB format.");
            }
        }
        public static Theme LoadFromJson(string path)
        {
            try
            {
                if (!File.Exists(path))
                    return null;
                string content = File.ReadAllText(path);
                Theme theme = JsonConvert.DeserializeObject<Theme>(content);
                return theme;
            }
            catch
            {
                return null;
            }
        }
        public bool TrySaveToFile()
        {
            string fileName =Name + FileExtension;
            try
            {
                var content = JsonConvert.SerializeObject(this, Formatting.Indented);
                File.WriteAllText(Path.Combine(ThemesFolderName, fileName), content);
                return true;
            }
            catch {return false;}
        }
        public static Theme DefaultDark()
        {
            return new Theme(
                "default dark",
                "#272527", // MainBackColor
                "#2F2E37", // SecondBackColor
                "#3B3946", // ThirdBackColor
                "#D8D3DC", // MainFrontColor
                "#D4BFFD", // SecondFrontColor
                "#A782EA", // ThirdFrontColor
                "#8862D5", // MainBrightColor
                "#7E54D5", // SecondBrightColor
                "#5A39AD", // ThirdBrightColor
                "#7E032A", // WarningMainColor
                "#930336"  // WarningBrightColor
            );
        }
        public static Theme DefaultLight()
        {
            return new Theme(
                "default light",
                "#E0E1DD", // MainBackColor
                "#D5BDAF", // SecondBackColor
                "#C9B9B0", // ThirdBackColor
                "#457B9D", // MainFrontColor
                "#1F4558", // SecondFrontColor
                "#1D3557", // ThirdFrontColor
                "#171020", // MainBrightColor
                "#222B48", // SecondBrightColor
                "#262D4A", // ThirdBrightColor
                "#7E032A", // WarningMainColor
                "#930336"  // WarningBrightColor
            );
        }
    }

}

