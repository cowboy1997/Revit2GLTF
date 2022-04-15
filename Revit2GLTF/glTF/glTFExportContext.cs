using Autodesk.Revit.DB;
using System;
using Microsoft.Win32;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autodesk.Revit.DB.Visual;
using System.IO;

namespace Revit2Gltf.glTF
{
    class glTFExportContext : IExportContext
    {
        private string textureFolder;
        private string gltfOutFile;
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
        public glTFExportContext(Document document, string outPutFile)
        {
            _documentStack.Push(document);
            gltfOutFile = outPutFile;
            gltfOutDir = Path.GetDirectoryName(gltfOutFile) + "\\";
            glTF = new GLTF();
            glTF.asset = new glTFVersion();
            glTF.scenes = new List<glTFScene>();
            glTF.nodes = new List<glTFNode>();
            glTF.meshes = new List<glTFMesh>();
            glTF.bufferViews = new List<glTFBufferView>();
            glTF.accessors = new List<glTFAccessor>();
            glTF.buffers = new List<glTFBuffer>();
            glTF.materials = new List<glTFMaterial>();
            glTF.samplers = new List<glTFSampler>();
            glTF.images = new List<glTFImage>();
            glTF.textures = new List<glTFTexture>();
            var scence = new glTFScene();
            glTF.scenes.Add(scence);

            allBinaryDatas = new List<glTFBinaryData>();
        }




        public void Finish()
        {
            var binFileName= Path.GetFileNameWithoutExtension(gltfOutFile) + ".bin";
            using (FileStream f = File.Create(Path.Combine(gltfOutDir,binFileName)))
            {
                using (BinaryWriter writer = new BinaryWriter(f))
                {
                    foreach (var binData in allBinaryDatas)
                    {
                        foreach (var coord in binData.vertexBuffer)
                        {
                            writer.Write((float)coord);
                        }

                        foreach (var uv in binData.uvBuffer)
                        {
                            writer.Write((float)uv);
                        }
                        foreach (var normal in binData.normalBuffer)
                        {
                            writer.Write((float)normal);
                        }
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
                        if (binData.indexAlign != null)
                        {
                            writer.Write((ushort)binData.indexAlign);
                        }
                    }
                }
            }




            glTFBuffer newbuffer = new glTFBuffer();
            newbuffer.uri = Path.GetFileNameWithoutExtension(gltfOutFile) + ".bin";
            newbuffer.byteLength = glTF.bufferViews[glTF.bufferViews.Count() - 1].byteOffset +
                         glTF.bufferViews[glTF.bufferViews.Count() - 1].byteLength;
            glTF.buffers = new List<glTFBuffer>() { newbuffer };
            File.WriteAllText(gltfOutFile, glTF.toJson());
        }

        public bool IsCanceled()
        {
            return false;
        }

        public RenderNodeAction OnElementBegin(ElementId elementId)
        {
            curMapBinaryData = new Dictionary<string, glTFBinaryData>();
            return RenderNodeAction.Proceed;
        }

        public void OnElementEnd(ElementId elementId)
        {
            if(curMapBinaryData.Keys.Count>0)
            {
                var e = doc.GetElement(elementId);
                var node = new glTFNode();
                node.name = e.Name;
                node.mesh = glTF.nodes.Count;
                glTF.scenes[0].nodes.Add(glTF.nodes.Count);
                glTF.nodes.Add(node);
                var mesh = new glTFMesh();
                glTF.meshes.Add(mesh);
                mesh.primitives = new List<glTFMeshPrimitive>();
                foreach (var key in curMapBinaryData.Keys)
                {
                    var bufferData = curMapBinaryData[key];
                    var primative = new glTFMeshPrimitive();
                    primative.material = MapMaterial[key].index;
                    mesh.primitives.Add(primative);
                    gltfUtil.addVec3BufferViewAndAccessor(glTF, bufferData);
                    primative.attributes.POSITION = glTF.accessors.Count - 1;
                    if (bufferData.uvBuffer.Count > 0)
                    {
                        gltfUtil.addUvBufferViewAndAccessor(glTF, bufferData);
                        primative.attributes.TEXCOORD_0 = glTF.accessors.Count - 1;
                    }
                    if (bufferData.normalBuffer.Count > 0)
                    {
                        gltfUtil.addNormalBufferViewAndAccessor(glTF, bufferData);
                        primative.attributes.NORMAL = glTF.accessors.Count - 1;
                    }
                    if (bufferData.indexBuffer.Count > 0)
                    {
                        gltfUtil.addIndexsBufferViewAndAccessor(glTF, bufferData);
                        primative.indices = glTF.accessors.Count - 1;
                    }
                    allBinaryDatas.Add(bufferData);
                }
            }
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
            return RenderNodeAction.Proceed;
        }

        public void OnInstanceEnd(InstanceNode node)
        {
            _transformStack.Pop();
        }

        public void OnLight(LightNode node)
        {
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
                if(!MapMaterial.ContainsKey(curMaterialName))
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
                    pbr.roughnessFactor = 1f;
                    gl_mat.pbrMetallicRoughness = pbr;
                    gl_mat.index = glTF.materials.Count;
                    glTF.materials.Add(gl_mat);

                    Asset currentAsset = null;
                    if (node.HasOverriddenAppearance)
                    {
                        currentAsset = node.GetAppearanceOverride();
                    }
                    else
                    {
                        currentAsset = node.GetAppearance();
                    }
                    string assetPropertyString = gltfUtil.ReadAssetProperty(currentAsset);
                    if (assetPropertyString != null)
                    {
                        string textureFile = assetPropertyString.Split('|')[0];
                        var texturePath = Path.Combine(textureFolder, textureFile.Replace("/", "\\"));
                        if (File.Exists(texturePath))
                        {
                            glTFbaseColorTexture bct = new glTFbaseColorTexture();
                            bct.index = glTF.textures.Count;
                            pbr.baseColorTexture = bct;
                            glTFTexture texture = new glTFTexture();
                            texture.source = glTF.images.Count;
                            texture.sampler = 0;
                            glTF.textures.Add( texture);
                            glTFImage image = new glTFImage();
                            string textureName = string.Format("{0}.png", m.Name);
                            string dirName = "glTFImage";
                            string dir = Path.Combine(gltfOutDir, dirName);
                            if (!Directory.Exists(dir))
                            { 
                                Directory.CreateDirectory(dir);
                            }
                            File.Copy(texturePath, Path.Combine(dir, textureName), true);
                            image.uri = dirName + "/" + textureName;
                            glTF.images.Add(image);
                            if (glTF.samplers.Count==0)
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
                            try
                            {
                                pbr.baseColorFactor = new List<double>() { node.Color.Red / 255f, node.Color.Green / 255f, node.Color.Blue / 255f, alpha / 1f };
                            }
                            catch
                            {

                            }
                        }
                    }
                    else
                    {
                        try
                        {
                            pbr.baseColorFactor = new List<double>() { node.Color.Red / 255f, node.Color.Green / 255f, node.Color.Blue / 255f, alpha / 1f };
                        }
                        catch
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
            Transform t = CurrentTransform;
            IList<XYZ> pts = node.GetPoints();
            pts = pts.Select(p => t.OfPoint(p)).ToList();
            foreach (XYZ point in pts)
            {
                currentGeometry.vertexBuffer.Add(point.X);
                currentGeometry.vertexBuffer.Add(point.Z);
                currentGeometry.vertexBuffer.Add(-point.Y);
            }
            IList<UV> uvs = node.GetUVs();
            foreach (UV uv in uvs)
            {
                currentGeometry.uvBuffer.Add(uv.U);
                currentGeometry.uvBuffer.Add(uv.V);
            }
            IList<XYZ> normals = node.GetNormals();
            if (normals != null && normals.Count() > 0)
            {
                var normal = normals[0];
                for (int i = 0; i < node.NumberOfPoints; i++)
                {
                    currentGeometry.normalBuffer.Add(normal.X);
                    currentGeometry.normalBuffer.Add(normal.Y);
                    currentGeometry.normalBuffer.Add(normal.Z);
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

                if(index1>currentGeometry.indexMax)
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
