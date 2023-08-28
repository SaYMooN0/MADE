// Ignore Spelling: Interop json

using MadeLib.Src.ProjectClasses;
using Microsoft.JSInterop;

namespace MadeLib.Src
{
	public class InteropHelper
	{
		[JSInvokable]
		public static void AddNewRecipeFromJS(string type, string jsonStringContent)
		{
			MadeProject project = ProjectManager.CurrentProject;
			project.AddNewRecipe( ActionType.StonecutterAdd	, jsonStringContent);
		}
	}

}
