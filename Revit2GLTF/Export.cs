

using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Microsoft.Win32;
using Revit2Gltf.glTF;
using System;
using System.Diagnostics;
using System.Windows;
using Document = Autodesk.Revit.DB.Document;


namespace Revit2Gltf
{
    [Autodesk.Revit.Attributes.Transaction(Autodesk.Revit.Attributes.TransactionMode.Manual)]
    [Autodesk.Revit.Attributes.Regeneration(Autodesk.Revit.Attributes.RegenerationOption.Manual)]
    [Autodesk.Revit.Attributes.Journaling(Autodesk.Revit.Attributes.JournalingMode.NoCommandData)]
    public class Export : Autodesk.Revit.UI.IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            UIDocument uidoc = commandData.Application.ActiveUIDocument;
            Document doc = uidoc.Document;


            MainWindow mainWindow = new MainWindow();

            if(mainWindow.ShowDialog()==true)
            {
                Stopwatch stopWatch = new Stopwatch();
                //测量运行时间
                stopWatch.Start();
                glTFSetting setting = new glTFSetting();
                setting.useDraco = true;
                setting.fileName = mainWindow.fileName.Text;
                glTFExportContext context = new glTFExportContext(doc, setting);
                CustomExporter exporter = new CustomExporter(doc, context);
                exporter.IncludeGeometricObjects = false;
                exporter.ShouldStopOnError = true;
                exporter.Export(doc.ActiveView as View3D);
                stopWatch.Stop();
                MessageBox.Show("success! time is:" + stopWatch.Elapsed.TotalSeconds + "s");
            }
            return Result.Succeeded;
        }
    }
}
