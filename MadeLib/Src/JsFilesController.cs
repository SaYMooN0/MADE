
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
		
		public static void WriteVanillaRecipe(string contentToWrite, string projectFolderPath,string actionId)
		{
			string fullDirPath = Path.Combine(projectFolderPath, kubejs, serverScripts);
			Directory.CreateDirectory(fullDirPath);
			string fullFilePath = Path.Combine(fullDirPath, $"{vanillaRecipesFile}.js");
            contentToWrite = "\n" + GenerateMadeComment(actionId) +"\n"+WrapInOnEventRecipes(contentToWrite);
			File.AppendAllText(fullFilePath, contentToWrite);
		}
		//ToDo
		public static void DeleteAction(string actionId, string filePath)
		{
			
		}
		public static string GetFullVanillaPath() => Path.Combine(kubejs, serverScripts, $"{vanillaRecipesFile}.js");
		static private string WrapInOnEventRecipes(string input) => "onEvent('recipes', event => {"+input+ "}) ";
        private static string GenerateMadeComment(string actionId) => "//Made:" + actionId+';';
    }
	
}
