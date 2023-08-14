using MadeLib.Src.ProjectClasses;
using Newtonsoft.Json;

namespace MadeLib.Src
{
    public class ProjectManager
    {
        private const string FileName = "links.madeLinks";

        [JsonProperty("_projectLinks")]
        private List<string> _projectLinks = new();

        [JsonProperty("_pinnedProjectLinks")]
        private List<string> _pinnedProjectLinks = new();

        [JsonIgnore]
        public List<MadeProject> Projects
        {
            get
            {
                if(_projectLinks==null || _projectLinks.Count == 0)
                    return new();
                List<MadeProject> projects = new();
                MadeProject project = null;
                foreach (string projectString in _projectLinks)
                {
                    project=MadeProject.CreateFromFile(projectString);
                    if(project != null)
                        projects.Add(project);
                }
                return projects;
            }
            private set
            {
                _projectLinks = new();
                foreach (MadeProject project in value)
                {
                    _projectLinks.Add(project.FullPath);
                }

            }
        }

        [JsonIgnore]
        public List<MadeProject> PinnedProjects
        {
            get
            {
                if (_pinnedProjectLinks == null || _pinnedProjectLinks.Count == 0)
                    return new();

                List<MadeProject> pinnedProjects = new();
                foreach (string pinnedProjectString in _pinnedProjectLinks)
                {
                    MadeProject pinnedProject = MadeProject.CreateFromFile(pinnedProjectString);
                    if (pinnedProject != null)
                        pinnedProjects.Add(pinnedProject);
                }
                return pinnedProjects;
            }
            private set
            {
                _pinnedProjectLinks = new();
                foreach (MadeProject pinnedProject in value)
                {
                    _pinnedProjectLinks.Add(pinnedProject.FullPath);
                }
            }
        }
        public void SaveToFile()
        {
            string jsonInstance = JsonConvert.SerializeObject(this, Formatting.Indented);
            File.WriteAllText(FileName, jsonInstance);
            if (Projects != null && Projects.Count > 0)
                foreach (var item in Projects) { item.SaveToFile(); }
        }
        static public ProjectManager Initialize()
        {
            if (!File.Exists(FileName))
                return new ProjectManager();
            else
            {
                string jsonInstance = File.ReadAllText(FileName);
                ProjectManager pm = JsonConvert.DeserializeObject<ProjectManager>(jsonInstance);
                return pm;
            }
        }
        public bool TryCreateProject(string name, string pathToFolder, string version, Loader loader)
        {
            if (!Directory.Exists(pathToFolder))
                return false;
            if (AnyMadeProjectFilesInFolder(pathToFolder))
                return false;
            string fullPath = pathToFolder + "\\" + name + MadeProject.FileExtension;
            MadeProject project = new(name, fullPath, pathToFolder, version, loader, DateTime.Now, DateTime.Now, new(), new(), new(), new());
            project.SaveToFile();
            Projects.Add(project);
            _projectLinks.Add(project.FullPath);
            return true;
        }
        public bool AnyMadeProjectFilesInFolder(string pathToFolder)
        {
            if (!Directory.Exists(pathToFolder))
                return false;
            var files = Directory.EnumerateFiles(pathToFolder, "*" + MadeProject.FileExtension);
            return files.Any();
        }
    }
}
