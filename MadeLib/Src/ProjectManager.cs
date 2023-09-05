using MadeLib.Src.ProjectClasses;
using Newtonsoft.Json;
using Microsoft.WindowsAPICodePack.Dialogs;
using Microsoft.JSInterop;

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
                if (_projectLinks == null || _projectLinks.Count == 0)
                    return new();
                List<MadeProject> projects = new();
                MadeProject project = null;
                foreach (string projectString in _projectLinks)
                {
                    project = MadeProject.CreateFromFile(projectString);
                    if (project != null)
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
        [JsonIgnore]
        static public MadeProject CurrentProject { get; set; }
        [JSInvokable]
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
        public void SaveToFile()
        {
            string jsonInstance = JsonConvert.SerializeObject(this, Formatting.Indented);
            File.WriteAllText(FileName, jsonInstance);
            if (Projects != null && Projects.Count > 0)
                foreach (var item in Projects) { item.SaveToFile(); }
        }
        public bool TryCreateProject(string name, string pathToFolder, string version, Loader loader)
        {
            if (!Directory.Exists(pathToFolder))
                return false;
            if (AnyMadeProjectFilesInFolder(pathToFolder))
                return false;
            string fullPath = pathToFolder + "\\" + name + MadeProject.FileExtension;
            MadeProject project = new(name, fullPath, pathToFolder, version, loader, DateTime.Now, DateTime.Now, new(), new(), new(loader));
            project.SaveToFile();
            _projectLinks.Add(project.FullPath);
            Projects.Add(project);
            this.SaveToFile();
            return true;
        }
        public bool AnyMadeProjectFilesInFolder(string pathToFolder)
        {
            if (!Directory.Exists(pathToFolder))
                return false;
            var files = Directory.EnumerateFiles(pathToFolder, "*" + MadeProject.FileExtension);
            return files.Any();
        }
        public string ChooseFolder()
        {
            using (var dialog = new CommonOpenFileDialog())
            {
                dialog.IsFolderPicker = true;
                if (dialog.ShowDialog() == CommonFileDialogResult.Ok)
                {
                    string folder = dialog.FileName;
                    return folder;
                }
                return null;
            }
        }
        public string ChooseProject()
        {
            var dialog = new CommonOpenFileDialog
            {
                Title = $"Choose *{MadeProject.FileExtension} file",
                Filters = { new CommonFileDialogFilter("MADE Project File", MadeProject.FileExtension) { ShowExtensions = true } },
                DefaultExtension = MadeProject.FileExtension,
                EnsureFileExists = true
            };
            if (dialog.ShowDialog() != CommonFileDialogResult.Ok)
                return null;
            AddProjectToCollectionIfNeeded(dialog.FileName);
            return dialog.FileName;
        }
        public void AddProjectToCollectionIfNeeded(string pathToFile)
        {
            MadeProject project = MadeProject.CreateFromFile(pathToFile);
            Projects.Add(project);
            _projectLinks.Add(project.FullPath);
            this.SaveToFile();
        }
        public ProjectCreationInformation GetInformationToFillCreationForm(string folderPath)
        {
            string fullPath = Path.Combine(folderPath, "minecraftinstance.json");
            ProjectCreationInformation info = new();
            info.FolderPath = folderPath;
            if (!File.Exists(fullPath))
                return info;
            string parentDirName = Path.GetDirectoryName(fullPath);
            if (parentDirName == null)
                return info;
            string contents;
            try
            {
                contents = File.ReadAllText(fullPath);
            }
            catch (Exception)
            {
                return info;
            }
            string name = Path.GetFileName(folderPath);
            if (string.IsNullOrEmpty(name))
                return info;
            info.Name = name;

            string version = GetSubstringBetween(contents, "\"minecraftVersion\":", ",");
            if (version == null)
                return info;
            string cleanVersion = new string(version.Where(c => char.IsDigit(c) || c == '.').ToArray());
            info.Version = cleanVersion;

            string loaderName = GetSubstringBetween(contents, "\"name\":", "\",");
            if (loaderName == null)
                return info;
            string cleanLoader = loaderName.Split('-').FirstOrDefault() ?? "-1";
            info.ModLoader = Enum.Parse<Loader>(CapitalizeFirstLetter(cleanLoader));
            return info;
        }
        private string GetSubstringBetween(string source, string startStr, string endStr)
        {
            int start = source.IndexOf(startStr);
            if (start == -1) return null;
            start += startStr.Length;
            int end = source.IndexOf(endStr, start);
            if (end == -1) return null;
            return source.Substring(start, end - start).Trim().Trim(',', '\"');
        }
        private static string CapitalizeFirstLetter(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return string.Empty;
            }
            return char.ToUpper(input[0]) + input.Substring(1);
        }

    }
}
