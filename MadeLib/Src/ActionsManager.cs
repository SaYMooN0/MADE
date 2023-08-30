

namespace MadeLib.Src
{
	
	static class ActionsManager
	{
		static public void HandleAction(ActionType actionType, Dictionary<string,string> arguments, string projectFolderPath)
		{
			switch (actionType)
			{
				case ActionType.StonecutterAdd:
					{
						string output = arguments["outputCount"] == "1" ? arguments["output"] : $"{arguments["outputCount"]}x {arguments["output"]}";
						string contentToWrite = $"event.stonecutting('{output}','{arguments["input"]}')";
						JsFilesController.WriteVanillaRecipe(contentToWrite, projectFolderPath,actionType ) ;
						break;
					}
			}
		}
		
	}
}
