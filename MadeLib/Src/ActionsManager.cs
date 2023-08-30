

namespace MadeLib.Src
{
	
	static class ActionsManager
	{
		static public string HandleAction(ActionType actionType, Dictionary<string,string> arguments, string projectFolderPath)
		{
			string madeComment = GenerateMadeComment(actionType);
			switch (actionType)
			{
				case ActionType.StonecutterAdd:
					{
						string output = arguments["outputCount"] == "1" ? arguments["output"] : $"{arguments["outputCount"]}x {arguments["output"]}";
						string contentToWrite = $"event.stonecutting('{output}','{arguments["input"]}')";
						JsFilesController.WriteVanillaRecipe(contentToWrite, projectFolderPath, madeComment) ;
						break;
					}
			}
			return madeComment;
		}
		private static string GenerateRecipeId() => DateTime.Now.ToString("yyMMddHHmmss");
		private static string GenerateMadeComment(ActionType type) => "//Made:" + GenerateRecipeId() + "-" + type.ToString();

	}
}
