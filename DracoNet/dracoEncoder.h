// Copyright 2016 The Draco Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

#include <draco/compression/encode.h>
using namespace draco;
struct DracoEncoderOptions {
    int pos_quantization_bits;
    int tex_coords_quantization_bits;
    int normals_quantization_bits;
    int generic_quantization_bits;
    int compression_level;
};


extern "C" _declspec(dllexport)
char* dracoEncoder(float* positions, float* uvs, float* normals,
    int* indexs, int num_obj_faces, int num_positions,
    int num_tex_coords,
    int num_normals,
    DracoEncoderOptions options,
    int* length);

extern "C" _declspec(dllexport) void deleteDracoData(char* data);
