using Autodesk.Revit.DB;
using System;
using Microsoft.Win32;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autodesk.Revit.DB.Visual;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Revit2Gltf.glTF
{
    class glTFExportContext : IExportContext
    {
        private glTFSetting setting;
        private string textureFolder;
        private string gltfOutDir;


        private GLTF glTF;
        private Stack<Document> _documentStack = new Stack<Document>();
        private Document doc { get { return _documentStack.Peek(); } }
        private Stack<Transform> _transformStack = new Stack<Transform>();
        private Transform CurrentTransform { get { return _transformStack.Peek(); } }


        private string curMaterialName;
        private Dictionary<string, glTFMaterial> MapMaterial = new Dictionary<string, glTFMaterial>();
        private Dictionary<string, glTFBinaryData> curMapBinaryData = new Dictionary<string, glTFBinaryData>();
        private List<glTFBinaryData> allBinaryDatas;

        private Dictionary<string, int> MapSymbolId = new Dictionary<string, int>();
        private string _curSymbolId;
        private Element _element;

        private List<int> _elementInstanceNodelist = new List<int>();

        private List<glTFBufferView> dracoBufferViews;
        //draco多线程
        private List<Task> taskList;
        public glTFExportContext(Document document, glTFSetting exportSetting)
        {
            _documentStack.Push(document);
            setting = exportSetting;
            gltfOutDir = Path.GetDirectoryName(setting.fileName) + "\\";
            glTF = new GLTF();
            if (setting.useDraco)
            {
                glTF.extensionsRequired = new List<string>() { "KHR_draco_mesh_compression" };
                glTF.extensionsUsed = new List<string>() { "KHR_draco_mesh_compression" };
                dracoBufferViews = new List<glTFBufferView>();
                taskList = new List<Task>();
            }
            glTF.asset = new glTFVersion();
            glTF.scenes = new List<glTFScene>();
            glTF.nodes = new List<glTFNode>();
            glTF.meshes = new List<glTFMesh>();
            glTF.bufferViews = new List<glTFBufferView>();
            glTF.accessors = new List<glTFAccessor>();
            glTF.buffers = new List<glTFBuffer>();
            glTF.materials = new List<glTFMaterial>();
            var scence = new glTFScene();
            scence.nodes = new List<int>() { 0 };
            glTF.scenes.Add(scence);
            glTFNode root = new glTFNode();
            root.name = "root";
            root.children = new List<int>();
            //设置y轴向上
            root.matrix = new List<double>()
            {
                0.3048, 0.0,0.0, 0.0,
                0.0,0.0, -0.3048, 0.0,
                0.0,0.3048,0.0,0.0,
                0.0,0.0,0.0, 1.0
            };
            glTF.nodes.Add(root);
            allBinaryDatas = new List<glTFBinaryData>();
        }




        public void Finish()
        {
            MemoryStream memoryStream = new MemoryStream();
            using (BinaryWriter writer = new BinaryWriter(memoryStream))
            {
                if (setting.useDraco)
                {
                    //等待线程结束
                    Task.WaitAll(taskList.ToArray());
                    var Binarylength = allBinaryDatas.Count;
                    for (int i = 0; i < Binarylength; i++)
                    {
                        var binData = allBinaryDatas[i];
                        var data = binData.dracoData;
                        var size = binData.dracoSize;
                        unsafe
                        {
                            byte* memBytePtr = (byte*)data.ToPointer();
                            for (int j = 0; j < size; j++)
                            {
                                writer.Write(*(byte*)memBytePtr);
                                memBytePtr += 1;
                            }

                        }
                        //释放c++内存
                        try
                        {
                            glTFDraco.deleteDracoData(data);
                        }
                        catch (Exception)
                        {

                            throw;
                        }
                        int byteOffset = 0;
                        if (i > 0)
                        {
                            byteOffset = dracoBufferViews[i - 1].byteLength + dracoBufferViews[i - 1].byteOffset;
                        }
                        dracoBufferViews[i].byteOffset = byteOffset;
                        dracoBufferViews[i].byteLength = size;
                    }
                    glTF.bufferViews = dracoBufferViews;
                    foreach (var accessor in glTF.accessors)
                    {
                        accessor.bufferView = null;
                        accessor.byteOffset = null;
                    }
                    if(glTF.images!=null)
                    {
                        foreach (var image in glTF.images)
                        {
                            image.bufferView = glTF.bufferViews.Count;

                            var bytes = File.ReadAllBytes(image.uri);
                            var byteOffset = glTF.bufferViews[glTF.bufferViews.Count - 1].byteLength + glTF.bufferViews[glTF.bufferViews.Count - 1].byteOffset;
                            var imageView = glTFUtil.addBufferView(0, byteOffset, bytes.Length);
                            image.uri = null;
                            foreach (var b in bytes)
                            {
                                writer.Write(b);
                            }
                            glTF.bufferViews.Add(imageView);
                        }
                    }
                }
                else
                {
                    foreach (var binData in allBinaryDatas)
                    {
                        foreach (var index in binData.indexBuffer)
                        {
                            if (binData.indexMax > 65535)
                            {
                                writer.Write((uint)index);
                            }
                            else
                            {
                                writer.Write((ushort)index);
                            }
                        }
                        if (binData.indexAlign != null && binData.indexAlign != 0)
                        {
                            writer.Write((ushort)binData.indexAlign);
                        }
                        foreach (var coord in binData.vertexBuffer)
                        {
                            writer.Write((float)coord);
                        }
                        foreach (var normal in binData.normalBuffer)
                        {
                            writer.Write((float)normal);
                        }
                        foreach (var uv in binData.uvBuffer)
                        {
                            writer.Write((float)uv);
                        }
                    }
                    if (glTF.images != null)
                    {
                        foreach (var image in glTF.images)
                        {
                            image.bufferView = glTF.bufferViews.Count;

                            var bytes = File.ReadAllBytes(image.uri);
                            var byteOffset = glTF.bufferViews[glTF.bufferViews.Count - 1].byteLength + glTF.bufferViews[glTF.bufferViews.Count - 1].byteOffset;
                            var imageView = glTFUtil.addBufferView(0, byteOffset, bytes.Length);

                            image.uri = null;
                            foreach (var b in bytes)
                            {
                                writer.Write(b);
                            }
                            glTF.bufferViews.Add(imageView);
                        }
                    }
                }


            }   
            glTFBuffer newbuffer = new glTFBuffer();
            newbuffer.uri = Path.GetFileNameWithoutExtension(setting.fileName) + ".bin";
            newbuffer.byteLength = glTF.bufferViews[glTF.bufferViews.Count() - 1].byteOffset +
                         glTF.bufferViews[glTF.bufferViews.Count() - 1].byteLength;
            glTF.buffers = new List<glTFBuffer>() { newbuffer };

            glTF.cameras = new List<glTFCameras>();


            //新增相机
            var view3d = doc.ActiveView as View3D;
            ViewOrientation3D orientation = view3d.GetOrientation();
            var camera = new glTFCameras();
            camera.type = CameraType.perspective;
            camera.perspective = new glTFPerspectiveCamera();
            camera.perspective.aspectRatio = 1.0;
            camera.perspective.yfov = 0.7;
            camera.perspective.zfar = 100;
            camera.perspective.znear = 0.01;
            var cameraNode = new glTFNode();
            glTF.nodes.Add(cameraNode);
            cameraNode.camera = 0;
            //相机位置
            cameraNode.translation = new List<double>() {
                orientation.EyePosition.X,
                orientation.EyePosition.Y,
                orientation.EyePosition.Z };
            //相机方向
            var n = orientation.ForwardDirection.CrossProduct(orientation.UpDirection);
            cameraNode.rotation = glTFUtil.MakeQuaternion(n, orientation.UpDirection);
            cameraNode.name = "revit_camera";
            glTF.cameras.Add(camera);
            glTF.nodes[0].children.Add(glTF.nodes.Count - 1);




            var fileExtension = Path.GetExtension(setting.fileName).ToLower();
            if (fileExtension == ".gltf")
            {
                var binFileName = Path.GetFileNameWithoutExtension(setting.fileName) + ".bin";
                using (FileStream f = File.Create(Path.Combine(gltfOutDir, binFileName)))
                {
                    byte[] data = memoryStream.ToArray();
                    f.Write(data, 0, data.Length);
                }

                UTF8Encoding uTF8Encoding = new UTF8Encoding(false);
                File.WriteAllText(setting.fileName, glTF.toJson(), uTF8Encoding);
            }
            else if (fileExtension == ".glb")
            {
                using (var fileStream = File.Create(setting.fileName))
                using (var writer = new BinaryWriter(fileStream))
                {
                    newbuffer.uri = null;
                    writer.Write(GLB.Magic);
                    writer.Write(GLB.Version);
                    var chunksPosition = writer.BaseStream.Position;
                    writer.Write(0U);
                    var jsonChunkPosition = writer.BaseStream.Position;
                    writer.Write(0U);
                    writer.Write(GLB.ChunkFormatJson);
                    using (var streamWriter = new StreamWriter(writer.BaseStream, new UTF8Encoding(false, true), 1024, true))
                    using (var jsonTextWriter = new JsonTextWriter(streamWriter))
                    {
                        JObject json = JObject.Parse(glTF.toJson());
                        json.WriteTo(jsonTextWriter);
                    }
                    glTFUtil.Align(writer.BaseStream, 0x20);
                    var jsonChunkLength = checked((uint)(writer.BaseStream.Length - jsonChunkPosition)) - GLB.ChunkHeaderLength;
                    writer.BaseStream.Seek(jsonChunkPosition, SeekOrigin.Begin);
                    writer.Write(jsonChunkLength);
                    byte[] data = memoryStream.ToArray();
                    writer.BaseStream.Seek(0, SeekOrigin.End);
                    var binChunkPosition = writer.BaseStream.Position;
                    writer.Write(0);
                    writer.Write(GLB.ChunkFormatBin);
                    foreach (var b in data)
                    {
                        writer.Write(b);
                    }
                    glTFUtil.Align(writer.BaseStream, 0x20);
                    var binChunkLength = checked((uint)(writer.BaseStream.Length - binChunkPosition)) - GLB.ChunkHeaderLength;
                    writer.BaseStream.Seek(binChunkPosition, SeekOrigin.Begin);
                    writer.Write(binChunkLength);
                    var length = checked((uint)writer.BaseStream.Length);
                    writer.BaseStream.Seek(chunksPosition, SeekOrigin.Begin);
                    writer.Write(length);
                }
            }
            memoryStream.Dispose();


        }

        public bool IsCanceled()
        {
            return false;
        }

        public RenderNodeAction OnElementBegin(ElementId elementId)
        {
            _elementInstanceNodelist.Clear();
            _curSymbolId = null;
            _element = doc.GetElement(elementId);
            curMapBinaryData = new Dictionary<string, glTFBinaryData>();
            return RenderNodeAction.Proceed;
        }

        public void OnElementEnd(ElementId elementId)
        {
            wiriteElement(elementId);
        }

        public RenderNodeAction OnFaceBegin(FaceNode node)
        {
            return RenderNodeAction.Proceed;
        }

        public void OnFaceEnd(FaceNode node)
        {

        }

        public RenderNodeAction OnInstanceBegin(InstanceNode node)
        {
            _transformStack.Push(CurrentTransform.Multiply(node.GetTransform()));
            ElementId symId = node.GetSymbolId();
            Element symElem = doc.GetElement(symId);
            _curSymbolId = symElem.UniqueId;
            if (MapSymbolId.ContainsKey(symElem.UniqueId))
            {
                return RenderNodeAction.Skip;
            }
            return RenderNodeAction.Proceed;
        }

        public void OnInstanceEnd(InstanceNode node)
        {
            ElementId symId = node.GetSymbolId();
            Element symElem = doc.GetElement(symId);
            if (MapSymbolId.ContainsKey(symElem.UniqueId))
            {
                var gltfNode = new glTFNode();
                gltfNode.name = _element.Name;
                glTF.nodes.Add(gltfNode);
                _elementInstanceNodelist.Add(glTF.nodes.Count - 1);
                gltfNode.matrix = new List<double> {
                        CurrentTransform.BasisX.X, CurrentTransform.BasisX.Y, CurrentTransform.BasisX.Z, 0,
                        CurrentTransform.BasisY.X, CurrentTransform.BasisY.Y, CurrentTransform.BasisY.Z, 0,
                        CurrentTransform.BasisZ.X, CurrentTransform.BasisZ.Y, CurrentTransform.BasisZ.Z, 0,
                        CurrentTransform.Origin.X, CurrentTransform.Origin.Y, CurrentTransform.Origin.Z, 1,
                        };
                gltfNode.mesh = MapSymbolId[_curSymbolId];
            }
            else
            {
                wiriteElementId(node.GetSymbolId(), true);
            }
            _transformStack.Pop();
        }


        private void wiriteElementId(ElementId elementId, bool isInstance)
        {
            if (curMapBinaryData.Keys.Count > 0)
            {
                var e = doc.GetElement(elementId);
                var node = new glTFNode();
                node.name = e.Name;


                var meshID = glTF.meshes.Count;
                node.mesh = meshID;


                if (_curSymbolId != null && !CurrentTransform.IsIdentity)
                {
                    if (!MapSymbolId.ContainsKey(_curSymbolId))
                    {
                        MapSymbolId.Add(_curSymbolId, meshID);
                    }
                    Transform t = CurrentTransform;
                    node.matrix = new List<double> {
                        t.BasisX.X, t.BasisX.Y, t.BasisX.Z, 0,
                        t.BasisY.X, t.BasisY.Y, t.BasisY.Z, 0,
                        t.BasisZ.X, t.BasisZ.Y, t.BasisZ.Z, 0,
                        t.Origin.X, t.Origin.Y, t.Origin.Z, 1};
                }
                glTF.nodes.Add(node);
                if (isInstance)
                {
                    _elementInstanceNodelist.Add(glTF.nodes.Count - 1);
                }
                else
                {
                    node.extras = new Dictionary<string, object>();
                    node.extras.Add("ElementID", e.Id.IntegerValue);
                    node.extras.Add("UniqueId", e.UniqueId);
                    if(setting.exportProperty)
                    {
                        node.extras.Add("Parameters", glTFUtil.GetParameter(e));
                    }
                    glTF.nodes[0].children.Add(glTF.nodes.Count - 1);
                }
                var mesh = new glTFMesh();
                glTF.meshes.Add(mesh);
                mesh.primitives = new List<glTFMeshPrimitive>();
                foreach (var key in curMapBinaryData.Keys)
                {
                    var bufferData = curMapBinaryData[key];
                    var primative = new glTFMeshPrimitive();
                    primative.material = MapMaterial[key].index;
                    mesh.primitives.Add(primative);
                    if (bufferData.indexBuffer.Count > 0)
                    {
                        glTFUtil.addIndexsBufferViewAndAccessor(glTF, bufferData);
                        primative.indices = glTF.accessors.Count - 1;
                    }
                    if (bufferData.vertexBuffer.Count > 0)
                    {
                        glTFUtil.addVec3BufferViewAndAccessor(glTF, bufferData);
                        primative.attributes.POSITION = glTF.accessors.Count - 1;
                    }
                    if (bufferData.normalBuffer.Count > 0)
                    {
                        glTFUtil.addNormalBufferViewAndAccessor(glTF, bufferData);
                        primative.attributes.NORMAL = glTF.accessors.Count - 1;
                    }
                    if (bufferData.uvBuffer.Count > 0)
                    {
                        glTFUtil.addUvBufferViewAndAccessor(glTF, bufferData);
                        primative.attributes.TEXCOORD_0 = glTF.accessors.Count - 1;
                    }

                    if (setting.useDraco)
                    {
                        primative.extensions = new glTFPrimitiveExtensions();
                        var dracoPrimative = primative.extensions.KHR_draco_mesh_compression;
                        dracoPrimative.bufferView = dracoBufferViews.Count;
                        dracoPrimative.attributes.POSITION = 0;
                        dracoPrimative.attributes.NORMAL = 1;
                        dracoPrimative.attributes.TEXCOORD_0 = 2;
                        int byteOffset = 0;
                        int byteLength = 0;
                        var dracoBufferView = glTFUtil.addBufferView(0, byteOffset, byteLength);
                        dracoBufferViews.Add(dracoBufferView);
                        taskList.Add(Task.Run(() =>
                        {
                            glTFDraco.compression(bufferData);
                        }));
                    }
                    allBinaryDatas.Add(bufferData);
                }
                curMapBinaryData.Clear();
            }
        }

        private void wiriteElement(ElementId elementId)
        {
            if (_elementInstanceNodelist.Count == 0 && curMapBinaryData.Keys.Count > 0)
            {
                wiriteElementId(elementId, false);
            }
            else if (_elementInstanceNodelist.Count > 0)
            {
                var e = doc.GetElement(elementId);
                var node = new glTFNode();
                node.name = e.Name;
                glTF.nodes[0].children.Add(glTF.nodes.Count);
                glTF.nodes.Add(node);
                node.children = new List<int>();
                node.children.AddRange(_elementInstanceNodelist);
                node.extras = new Dictionary<string, object>();
                node.extras.Add("ElementID", e.Id.IntegerValue);
                node.extras.Add("UniqueId", e.UniqueId);
                if (setting.exportProperty)
                {
                    node.extras.Add("Parameters", glTFUtil.GetParameter(e));
                }
            }
        }




        public void OnLight(LightNode node)
        {
            var a = node;
        }

        public RenderNodeAction OnLinkBegin(LinkNode node)
        {
            _documentStack.Push(node.GetDocument());
            _transformStack.Push(CurrentTransform.Multiply(node.GetTransform()));
            return RenderNodeAction.Proceed;
        }

        public void OnLinkEnd(LinkNode node)
        {
            _documentStack.Pop();
            _transformStack.Pop();
        }

        public void OnMaterial(MaterialNode node)
        {
            ElementId id = node.MaterialId;
            double alpha = Math.Round(node.Transparency, 2);
            if (id != ElementId.InvalidElementId)
            {
                Element m = doc.GetElement(node.MaterialId);
                curMaterialName = m.Name;
                if (!MapMaterial.ContainsKey(curMaterialName))
                {
                    glTFMaterial gl_mat = new glTFMaterial();
                    gl_mat.name = curMaterialName;
                    glTFPBR pbr = new glTFPBR();
                    if (alpha != 0)
                    {
                        gl_mat.alphaMode = "BLEND";
                        gl_mat.doubleSided = true;
                        alpha = 1 - alpha;
                    }
                    pbr.metallicFactor = 0f;
                    // pbr.roughnessFactor = 1 - node.Smoothness / 100;
                    pbr.roughnessFactor = 1f;
                    gl_mat.pbrMetallicRoughness = pbr;
                    gl_mat.index = glTF.materials.Count;
                    glTF.materials.Add(gl_mat);
                    try
                    {
                        pbr.baseColorFactor = new List<double>() { node.Color.Red / 255f, node.Color.Green / 255f, node.Color.Blue / 255f, alpha / 1f };
                    }
                    catch
                    {

                    }
                    Asset currentAsset = null;
                    if (node.HasOverriddenAppearance)
                    {
                        currentAsset = node.GetAppearanceOverride();
                    }
                    else
                    {
                        currentAsset = node.GetAppearance();
                    }
                    string assetPropertyString = glTFUtil.ReadAssetProperty(currentAsset);
                    //if (assetPropertyString == null)
                    //{
                    //    var asset = glTFUtil.FindTextureAsset(currentAsset);
                    //    if (asset != null)
                    //    {
                    //        assetPropertyString = (asset.FindByName("unifiedbitmap_Bitmap")
                    //       as AssetPropertyString).Value;
                    //    }
                    //}
                    if (assetPropertyString != null)
                    {
                        string textureFile = assetPropertyString.Split('|')[0];
                        var texturePath = Path.Combine(textureFolder, textureFile.Replace("/", "\\"));
                        if (File.Exists(texturePath))
                        {
                            if (glTF.textures == null)
                            {
                                glTF.samplers = new List<glTFSampler>();
                                glTF.images = new List<glTFImage>();
                                glTF.textures = new List<glTFTexture>();
                            }
                            pbr.baseColorFactor = null;
                            glTFbaseColorTexture bct = new glTFbaseColorTexture();
                            bct.index = glTF.textures.Count;
                            pbr.baseColorTexture = bct;
                            glTFTexture texture = new glTFTexture();
                            texture.source = glTF.images.Count;
                            texture.sampler = 0;
                            glTF.textures.Add(texture);
                            glTFImage image = new glTFImage();
                            image.name = Path.GetFileNameWithoutExtension(texturePath);
                            image.mimeType = glTFUtil.FromFileExtension(texturePath);
                            image.uri = texturePath;
                            glTF.images.Add(image);
                            if (glTF.samplers.Count == 0)
                            {
                                glTFSampler sampler = new glTFSampler();
                                sampler.magFilter = 9729;
                                sampler.minFilter = 9987;
                                sampler.wrapS = 10497;
                                sampler.wrapT = 10497;
                                glTF.samplers.Add(sampler);
                            }
                        }
                        else
                        {
                            
                        }
                    }
                    MapMaterial.Add(curMaterialName, gl_mat);
                }
            }
            else
            {
                curMaterialName = string.Format("r{0}g{1}b{2}a{3}", node.Color.Red.ToString(),
                   node.Color.Green.ToString(), node.Color.Blue.ToString(), alpha);
                if (!MapMaterial.ContainsKey(curMaterialName))
                {
                    glTFMaterial gl_mat = new glTFMaterial();
                    gl_mat.name = curMaterialName;
                    gl_mat.index = glTF.materials.Count;
                    if (alpha != 0)
                    {
                        gl_mat.alphaMode = "BLEND";
                        gl_mat.doubleSided = true;
                        alpha = 1 - alpha;
                    }
                    glTFPBR pbr = new glTFPBR();
                    pbr.baseColorFactor = new List<double>() { node.Color.Red / 255f, node.Color.Green / 255f, node.Color.Blue / 255f, alpha };
                    pbr.metallicFactor = 0f;
                    pbr.roughnessFactor = 1f;
                    gl_mat.pbrMetallicRoughness = pbr;
                    glTF.materials.Add(gl_mat);
                    MapMaterial.Add(curMaterialName, gl_mat);

                }
            }

            if (!curMapBinaryData.ContainsKey(curMaterialName))
            {
                curMapBinaryData.Add(curMaterialName, new glTFBinaryData());
            }

        }

        public void OnPolymesh(PolymeshTopology node)
        {
            var currentGeometry = curMapBinaryData[curMaterialName];
            var index = currentGeometry.vertexBuffer.Count / 3;
            IList<XYZ> pts = node.GetPoints();
            foreach (XYZ point in pts)
            {
                currentGeometry.vertexBuffer.Add((float)point.X);
                currentGeometry.vertexBuffer.Add((float)point.Y);
                currentGeometry.vertexBuffer.Add((float)point.Z);
            }
            IList<UV> uvs = node.GetUVs();
            foreach (UV uv in uvs)
            {
                currentGeometry.uvBuffer.Add((float)uv.U);
                currentGeometry.uvBuffer.Add((float)uv.V);
            }
            IList<XYZ> normals = node.GetNormals();
            if (normals != null && normals.Count() > 0)
            {
                var normal = normals[0];
                for (int i = 0; i < node.NumberOfPoints; i++)
                {
                    currentGeometry.normalBuffer.Add((float)normal.X);
                    currentGeometry.normalBuffer.Add((float)normal.Y);
                    currentGeometry.normalBuffer.Add((float)normal.Z);
                }
            }
            foreach (PolymeshFacet facet in node.GetFacets())
            {
                var index1 = facet.V1 + index;
                var index2 = facet.V2 + index;
                var index3 = facet.V3 + index;
                currentGeometry.indexBuffer.Add(index1);
                currentGeometry.indexBuffer.Add(index2);
                currentGeometry.indexBuffer.Add(index3);


                if (!currentGeometry.indexMax.HasValue)
                {
                    currentGeometry.indexMax = 0;
                }

                if (index1 > currentGeometry.indexMax)
                {
                    currentGeometry.indexMax = index1;
                }
                else if (index2 > currentGeometry.indexMax)
                {
                    currentGeometry.indexMax = index2;
                }
                else if (index3 > currentGeometry.indexMax)
                {
                    currentGeometry.indexMax = index3;
                }

            }
        }

        public void OnRPC(RPCNode node)
        {
        }

        public RenderNodeAction OnViewBegin(ViewNode node)
        {
            return RenderNodeAction.Proceed;
        }

        public void OnViewEnd(ElementId elementId)
        {

        }

        public bool Start()
        {
            _transformStack.Push(Transform.Identity);
            try
            {
                //获取revit材质文件路径
                RegistryKey hklm = Registry.LocalMachine;
                RegistryKey libraryPath = hklm.OpenSubKey("SOFTWARE\\WOW6432Node\\Autodesk\\ADSKTextureLibrary\\1");
                if (libraryPath == null)
                {
                    libraryPath = hklm.OpenSubKey("SOFTWARE\\WOW6432Node\\Autodesk\\ADSKTextureLibrary\\2");
                    if (libraryPath == null)
                    {
                        libraryPath = hklm.OpenSubKey("SOFTWARE\\WOW6432Node\\Autodesk\\ADSKTextureLibrary\\3");
                    }
                }
                if (libraryPath != null)
                {
                    textureFolder = libraryPath.GetValue("LibraryPaths").ToString();
                    libraryPath.Close();
                }
                if (textureFolder == null)
                {
                    textureFolder = @"C:\Program Files (x86)\Common Files\Autodesk Shared\Materials\Textures\";
                }
                hklm.Close();
            }
            catch
            {
                textureFolder = @"C:\Program Files (x86)\Common Files\Autodesk Shared\Materials\Textures\";
            }
            return true;
        }
    }
}
