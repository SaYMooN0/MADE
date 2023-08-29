

namespace MadeLib.Src
{
	static class ActionsManager
	{
		static public void HandleAction(ActionType action, string jsonStringContent)
		{
			switch (action)
			{
				case ActionType.StonecutterAdd:
					{
						string strToWrite = "dcasdaidiajidaj";
						JsFileWriter.WriteVanillaRecipe(strToWrite) ;
						break;
					}
			}
		}
	}
}
