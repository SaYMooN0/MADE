namespace MadeLib.Src.MinecraftRelatedClasses
{
    public class Tag
    {
        public const char divider = '/';
        public string Name { get; private set; }
        public List<Tag> SubTags { get; private set; }
        public Tag(string name, List<Tag> subTags)
        {
            Name = name;
            SubTags = subTags;
        }
    }
}
