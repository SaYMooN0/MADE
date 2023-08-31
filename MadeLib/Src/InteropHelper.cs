// Ignore Spelling: Interop json

using MadeLib.Src.ProjectClasses;
using Microsoft.JSInterop;

namespace MadeLib.Src
{
	public class InteropHelper
	{
		[JSInvokable]
		public static void HandleRecipeCreationFromJS(string stringType, Dictionary<string, string> arguments)
		{
			ActionType type= ActionTypeConverter.TypeFromString(stringType);
			ProjectManager.CurrentProject.AddNewRecipe(type, arguments);
		}
		[JSInvokable]
		public static void HandleActionChanging(string actionInfo)
		{
			
		}
		[JSInvokable]
		public static string[] GetSuggestions(string input)
		{
			string[] s = { "Apple", "Banana", "Cherry", "Date", "Fig", "Grape", "Ki", "Kwi", "awi", "cxziwi", "Kdasaswi", "Kweiwi" };
			return s ;
		}
	}

}
