using System.Windows;
using Microsoft.Extensions.DependencyInjection;
using View;
using View.Data;
using System;
using System.ComponentModel;
using System.IO;
using static System.Net.Mime.MediaTypeNames;
using System.Text;

namespace MADE
{
    public partial class MainWindow : Window
    {
        private readonly AppState _appState = new();

        public MainWindow()
        {
            InitializeComponent();
        
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddWpfBlazorWebView();
            serviceCollection.AddSingleton<AppState>(_appState);
            serviceCollection.AddSingleton<WeatherForecastService>();
            Resources.Add("services", serviceCollection.BuildServiceProvider());
            Closing += WriteCount;

        }

        private void WriteCount(object sender, CancelEventArgs e)
        {
            using (FileStream fstream = new FileStream("1.txt", FileMode.OpenOrCreate))
            {
                string text ="counts "+ _appState.Counter.ToString();
                byte[] buffer = Encoding.Default.GetBytes(text);
                // запись массива байтов в файл
                fstream.Write(buffer, 0, buffer.Length);
            }
        }
    }

    // Workaround for compiler error "error MC3050: Cannot find the type 'local:Main'"
    // It seems that, although WPF's design-time build can see Razor components, its runtime build cannot.
    public partial class Main { }
}
