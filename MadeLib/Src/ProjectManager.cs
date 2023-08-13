using MadeLib.Src.ProjectClasses;
namespace MadeLib.Src
{
    internal class ProjectManager
    {
        public List<MadeProject> Projects { get; private set; } = new();
        public List<MadeProject> PinnedProjects { get; private set; } = new();
    }
}
