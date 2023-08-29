

namespace MadeLib.Src
{
	static class ActionsManager
	{
		static public void HandleAction(ActionType action, string jsonStringContent, string projectFolderPath)
		{
			switch (action)
			{
				case ActionType.StonecutterAdd:
					{
						string strToWrite = "dcasdaidiajidaj";
						JsFilesController.WriteVanillaRecipe(strToWrite, projectFolderPath) ;
						break;
					}
			}
		}
	}
}
