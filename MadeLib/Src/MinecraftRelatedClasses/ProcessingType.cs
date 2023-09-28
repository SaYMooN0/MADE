namespace MadeLib.Src.MinecraftRelatedClasses
{
    public class ProcessingType
    {
        public string Id { get; private set; }
        public string InGameName { get; private set; } = "";
        public bool IsSupportedByMade { get; private set; }=false;
        public ProcessingType(string id, string inGameName, bool isSupportedByMade)
        {
            Id = id;
            InGameName = inGameName;
            IsSupportedByMade = isSupportedByMade;
        }

    }
}
