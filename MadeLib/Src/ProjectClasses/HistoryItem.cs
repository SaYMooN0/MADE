// Ignore Spelling: Json

using System.Text.RegularExpressions;

namespace MadeLib.Src.ProjectClasses
{
	public class HistoryItem
	{
		public string Comment { get; private set; }
		public Dictionary<string, string> Arguments { get; set; }

		private const string Pattern = @"//Made:(\d+)-(\w+)";

		public HistoryItem(string comment, Dictionary<string, string> arguments)
		{
			Comment = comment;
			Arguments = arguments;
		}

		public DateTime? CreationTime()
		{
			var match = Regex.Match(this.Comment, Pattern);
			if (match.Success && DateTime.TryParseExact(match.Groups[1].Value, "yyMMddHHmmss", null, System.Globalization.DateTimeStyles.None, out DateTime result))
				return result;
			return null;
		}

		public ActionType? ActionType()
		{
			var match = Regex.Match(this.Comment, Pattern);
			if (match.Success && Enum.TryParse(match.Groups[2].Value, out ActionType result))
				return result;
			return null;
		}
        public long? ActionCode()
        {
            var match = Regex.Match(this.Comment, Pattern);
            if (match.Success && long.TryParse(match.Groups[1].Value, out long result))
                return result;
            return null;
        }

    }
}
