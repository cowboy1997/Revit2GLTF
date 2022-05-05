using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Revit2Gltf
{
    /// <summary>
    /// MainWindow.xaml 的交互逻辑
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }


    

        private void Button_Start(object sender, RoutedEventArgs e)
        {
            if(fileName.Text!=null)
            {
                DialogResult = true;
                Close();
            }
        }

        private void Button_Open(object sender, RoutedEventArgs e)
        {
            SaveFileDialog fd = new SaveFileDialog();
            fd.Title = "exportGLTF";
            //fd.Filter = "gltf文件|*.gltf";
            //fd.Filter = "gltf文件(*.gltf,*.glb)|*.gltf;*.glb";
            fd.Filter = "glb文件(*.glb)|*.glb|gltf文件(*.gltf)|*.gltf";
            fd.FileName = "NewProject";
            if (fd.ShowDialog() == true)
            {
                fileName.Text = fd.FileName;
            }
        }

        private void Hyperlink_Click(object sender, RoutedEventArgs e)
        {
            Hyperlink link = sender as Hyperlink;
            Process.Start(new ProcessStartInfo(link.NavigateUri.AbsoluteUri));
        }
    }
}
