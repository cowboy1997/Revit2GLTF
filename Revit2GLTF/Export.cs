﻿

using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Microsoft.Win32;
using Revit2Gltf.glTF;
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


            string path = string.Empty;
            SaveFileDialog fd = new SaveFileDialog();
            fd.Title = "exportGLTF";
            fd.Filter = "gltf文件|*.gltf";
            if (fd.ShowDialog()==true)
            {
                glTFExportContext context = new glTFExportContext(doc, fd.FileName);
                CustomExporter exporter = new CustomExporter(doc, context);
                exporter.IncludeGeometricObjects = false;
                exporter.ShouldStopOnError = true;
                exporter.Export(doc.ActiveView);
                MessageBox.Show("success");
            }    
            return Result.Succeeded;
        }
    }
}