using MadeLib.Data;
using MadeLib.Src;
using Microsoft.Extensions.DependencyInjection;
using System.ComponentModel;
using System.Windows;

namespace MADE
{
    public partial class MainWindow : Window
    {
        private readonly AppState _appState = new();
        private ThemeCollection _themeCollection = ThemeCollection.Initialize();
        private ProjectManager _projectManager =  ProjectManager.Initialize();

        public MainWindow()
        {
            InitializeComponent();
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddWpfBlazorWebView();
            serviceCollection.AddSingleton(_appState);
            serviceCollection.AddSingleton(_themeCollection);
            Resources.Add("services", serviceCollection.BuildServiceProvider());
            Closing += WindowClosing;
        }

        private void WindowClosing(object sender, CancelEventArgs e)
        {
            _themeCollection.SaveToFile();
            _projectManager.SaveToFile();
        }
    }

    // Workaround for compiler error "error MC3050: Cannot find the type 'local:Main'"
    // It seems that, although WPF's design-time build can see Razor components, its runtime build cannot.
    public partial class Main { }
}
