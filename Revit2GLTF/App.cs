using System.Reflection;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using Autodesk.Revit.UI;


namespace Revit2Gltf
{
    class App : IExternalApplication
    {
        public Result OnStartup(UIControlledApplication application)
        {
            RibbonPanel newPanel= application.CreateRibbonPanel("Export glTF");
            string thisAssemblyPath = Assembly.GetExecutingAssembly().Location;
            PushButtonData button1Data = new PushButtonData("export", "Export", thisAssemblyPath, "Revit2Gltf.Export");
            PushButton pushButton1 = newPanel.AddItem(button1Data) as PushButton;
            pushButton1.LargeImage = BmpImageSource(@"Revit2Gltf.glTF.glTF.png");
            return Result.Succeeded;
        }

        public Result OnShutdown(UIControlledApplication a)
        {
            return Result.Succeeded;
        }

        private ImageSource BmpImageSource(string embeddedPath)
        {
            System.IO.Stream manifestResourceStream = Assembly.GetExecutingAssembly().GetManifestResourceStream(embeddedPath);
            PngBitmapDecoder pngBitmapDecoder = new PngBitmapDecoder(manifestResourceStream, BitmapCreateOptions.PreservePixelFormat, BitmapCacheOption.Default);
            return pngBitmapDecoder.Frames[0];
        }
    }
}
