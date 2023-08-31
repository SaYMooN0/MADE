namespace MadeLib.Src
{
    public static class ActionTypeConverter
    {
        public static string TypeToString(ActionType? type)
        {
            switch (type)
            {
                case ActionType.StonecutterAdd: return "New stonecutter recipe";
                case ActionType.RecipeRemoved: return "Recipe removed";
                default:
                    return "Default action";
            }
        }
        public static ActionType TypeFromString(string stringType) => Enum.Parse<ActionType>(stringType);
    }
}
