
namespace MadeLib.Src
{
	static class JsFilesController
	{
		public const string kubejs = "kubejs";
		public const string serverScripts = "server_scripts";
		public const string startupScripts = "startup_scripts";
		public const string clientScripts = "client_scripts";
		public const string assets = "assets";
		public const string vanillaRecipesFile = "vanilla";

		//return int that contains string ind
		public static void WriteVanillaRecipe(string contentToWrite, string projectFolderPath,ActionType actionType)
		{
			string fullDirPath = Path.Combine(projectFolderPath, kubejs, serverScripts);
			Directory.CreateDirectory(fullDirPath);
			string fullFilePath = Path.Combine(fullDirPath, $"{vanillaRecipesFile}.js");

			contentToWrite = "\n"+GenerateMadeComment(actionType)+"\n" + WrapInOnEventRecipes(contentToWrite);
			File.AppendAllText(fullFilePath, contentToWrite);
		}
		private static string GenerateRecipeId() => DateTime.Now.ToString("yyMMddHHmmss");
		private static string GenerateMadeComment(ActionType type) => "//"+GenerateRecipeId()+"-"+type.ToString();
		static private string WrapInOnEventRecipes(string input) => "onEvent('recipes', event => {"+input+ "}) ";
	}
	
}
