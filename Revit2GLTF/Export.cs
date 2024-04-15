using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Revit2Gltf.glTF;
using System.Collections.Generic;
using System.Diagnostics;

namespace Revit2Gltf
{
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    [Journaling(JournalingMode.NoCommandData)]
    public class Export : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            var doc = commandData.Application.ActiveUIDocument.Document;
            if (!(doc.ActiveView is View3D))
            {
                TaskDialog.Show("提示", "当前视图不支持导出，请切换至3D视图");
                return Result.Cancelled;
            }


            var mainWindow = new MainWindow();
            if (mainWindow.ShowDialog() == true)
            {
                var stopWatch = new Stopwatch();
                //测量运行时间
                stopWatch.Start();
                var setting = new glTFSetting
                {
                    useDraco = (bool)mainWindow.useDraco.IsChecked,
                    fileName = mainWindow.fileName.Text,
                    exportProperty = (bool)mainWindow.exportProperty.IsChecked
                };
                var context = new glTFExportContext(doc, setting);
                var exporter = new CustomExporter(doc, context)
                {
                    IncludeGeometricObjects = false,
                    ShouldStopOnError = true
                };
                exporter.Export(new List<ElementId>() { doc.ActiveView.Id });
                stopWatch.Stop();


                var mainDialog = new TaskDialog("Revit2GLTF")
                {
                    MainContent = "success! time is:" + stopWatch.Elapsed.TotalSeconds + "s" + "\n" +
                     "<a href=\"https://cowboy1997.github.io/Revit2GLTF/threejs/index?\">" + "open your glb model</a>"
                };
                ;
                mainDialog.Show();

            }
            return Result.Succeeded;
        }
    }
}
