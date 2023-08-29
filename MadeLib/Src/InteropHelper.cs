// Ignore Spelling: Interop json

using MadeLib.Src.ProjectClasses;
using Microsoft.JSInterop;

namespace MadeLib.Src
{
	public class InteropHelper
	{
		[JSInvokable]
		public static void HandleRecipeCreationFromJS(string stringType, Dictionary<string, string> jsonStringContent)
		{
			ActionType type= (ActionType)Enum.Parse(typeof(ActionType), stringType);
			MadeProject project = ProjectManager.CurrentProject;
			project.AddNewRecipe(type, jsonStringContent.ToString());
		}
		[JSInvokable]
		public static string[] GetSuggestions(string input)
		{
			string[] s = { "Apple", "Banana", "Cherry", "Date", "Fig", "Grape", "Ki", "Kwi", "awi", "cxziwi", "Kdasaswi", "Kweiwi" };
			return s ;
		}
	}

}
