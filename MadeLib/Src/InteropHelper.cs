// Ignore Spelling: Interop json

using MadeLib.Src.ProjectClasses;
using Microsoft.JSInterop;

namespace MadeLib.Src
{
	public class InteropHelper
	{
		[JSInvokable]
		public static void HandleRecipeCreationFromJS(string type, string jsonStringContent)
		{
			MadeProject project = ProjectManager.CurrentProject;
			project.AddNewRecipe( ActionType.StonecutterAdd	, jsonStringContent);
		}
		[JSInvokable]
		public static string[] GetSuggestions(string input)
		{
			string[] s = { "Apple", "Banana", "Cherry", "Date", "Fig", "Grape", "Ki", "Kwi", "awi", "cxziwi", "Kdasaswi", "Kweiwi" };
			return s ;
		}
	}

}
