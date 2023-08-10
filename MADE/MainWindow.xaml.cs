﻿using System.Windows;
using Microsoft.Extensions.DependencyInjection;
using MadeLib;
using MadeLib.Data;
using MadeLib.Src;
using System.ComponentModel;
using System.IO;
using System.Text;

namespace MADE
{
    public partial class MainWindow : Window
    {
        private readonly AppState _appState = new();
        private ThemeCollection _themeCollection = new();

        public MainWindow()
        {
            InitializeComponent();
        
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddWpfBlazorWebView();
            serviceCollection.AddSingleton(_appState);
            serviceCollection.AddSingleton(_themeCollection);
            Resources.Add("services", serviceCollection.BuildServiceProvider());
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
