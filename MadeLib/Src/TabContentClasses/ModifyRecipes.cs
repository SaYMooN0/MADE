namespace MadeLib.Src.TabContentClasses
{
	public abstract class ModifyRecipes
    {
		public const string Main =
           "<link href=\"_content/MadeLib/css/tab_content/components.css\" rel=\"stylesheet\" />" +
           "<div class=\"recipes-action-buttons-container\">"+

		   "<div id=\"newRecipeDiv\" class=\"action-button\">" +
                "<label class=\"action-button-main-label\">Add vanilla recipe</label>" +
                "<label class=\"action-button-hint-label\">Create a new recipe for vanilla minecraft, for example, for a crafting table, furnace, etc.</label>" +
            "</div>" +
           "<div id=\"deleteRecipeDiv\" class=\"action-button\">" +
                "<label>Delete existing recipe</label>" +
            "</div>" +
           "<div id=\"changeRecipeDiv\" class=\"action-button\">" +
                "<label>Change existing recipe</label>" +
            "</div>" +
            "<div id=\"newRecipeDiv\" class=\"action-button\">" +
                "<label>Add new modded recipe</label>" +
            "</div>" +
           "<div id=\"newRecipeDiv\" class=\"action-button\">" +
                "<label>Add recipe group</label>" +
            "</div>"+

           "</div>";


	}
}
