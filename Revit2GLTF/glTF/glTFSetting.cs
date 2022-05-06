using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Revit2Gltf.glTF
{
    internal class glTFSetting
    {
        public bool useDraco { get; set; } = false;
        public string fileName { get; set; }

        public bool exportProperty { get; set; } = false;
    }
}
