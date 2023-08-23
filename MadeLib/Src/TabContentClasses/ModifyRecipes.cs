namespace MadeLib.Src.TabContentClasses
{
	public abstract class ModifyRecipes
    {
		public const string Main =
           "<link href=\"_content/MadeLib/css/tab_content/components.css\" rel=\"stylesheet\" />" +
           "<div class=\"action-buttons-container-5\">"+

		   "<div id=\"newRecipeDiv\" class=\"action-button\">" +
                "<label class=\"action-button-main-label\">Add vanilla recipe</label><br/>"+
                "<label class=\"action-button-hint-label\">Create recipes for crafting table, furnace, stonecutter and so on </label>" +
            "</div>" +
           "<div id=\"deleteRecipeDiv\" class=\"action-button\">" +
                "<label class=\"action-button-main-label\">Delete existing recipe</label><br/>" +
                "<label class=\"action-button-hint-label\">Delete creation recipes for items and tags</label>" +
            "</div>" +
           "<div id=\"changeRecipeDiv\" class=\"action-button\">" +
                "<label class=\"action-button-main-label\">Change existing recipe</label><br/>" +
                "<label class=\"action-button-hint-label\">Edit the recipes you have already created</label>" +
            "</div>" +
            "<div id=\"moddedRecipeDiv\" class=\"action-button\">" +
                "<label class=\"action-button-main-label\">Add new modded recipe</label><br/>" +
                "<label class=\"action-button-hint-label\">Create recipes for different mods that are supported by Made</label>" +
            "</div>" +
           "<div id=\"groupRecipeDiv\" class=\"action-button\">" +
                "<label class=\"action-button-main-label\">Add recipe group</label><br/>" +
                "<label class=\"action-button-hint-label\">Create recipes for crushers, sawmills and other modded machines in one go</label>" +
            "</div>" +

           "</div>";


	}
}
