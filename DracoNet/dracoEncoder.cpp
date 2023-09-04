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
#include "dracoEncoder.h"
char* dracoEncoder(float* positions, float* uvs, float* normals, int* indexs,
    int num_obj_faces, int num_positions, int num_tex_coords, int num_normals,
    DracoEncoderOptions options, int* length) {
    int pos_att_id_ = -1;
    int tex_att_id_ = -1;
    int norm_att_id_ = -1;

    bool use_identity_mapping = false;
    std::unique_ptr<Mesh> mesh(new Mesh());
    Mesh* out_mesh = mesh.get();
    PointCloud* out_point_cloud_ = static_cast<PointCloud*>(out_mesh);

    out_mesh->SetNumFaces(num_obj_faces);
    out_point_cloud_->set_num_points(num_obj_faces * 3);

    if (num_positions != NULL && num_positions > 0) {
        GeometryAttribute va;
        va.Init(GeometryAttribute::POSITION, nullptr, 3, DT_FLOAT32, false,
            sizeof(float) * 3, 0);
        pos_att_id_ = out_point_cloud_->AddAttribute(va, use_identity_mapping, num_positions);
        for (int i = 0; i < num_positions; ++i) {
            float position[3];
            position[0] = positions[3 * i];
            position[1] = positions[3 * i + 1];
            position[2] = positions[3 * i + 2];
            out_point_cloud_->attribute(pos_att_id_)
                ->SetAttributeValue(AttributeValueIndex(i), position);
        }
    }
    if (num_normals != NULL && num_normals > 0) {
        GeometryAttribute va;
        va.Init(GeometryAttribute::NORMAL, nullptr, 3, DT_FLOAT32, false,
            sizeof(float) * 3, 0);
        norm_att_id_ =
            out_point_cloud_->AddAttribute(va, use_identity_mapping, num_normals);

        for (int i = 0; i < num_normals; ++i) {
            float normal[3];
            normal[0] = normals[3 * i];
            normal[1] = normals[3 * i + 1];
            normal[2] = normals[3 * i + 2];
            out_point_cloud_->attribute(norm_att_id_)
                ->SetAttributeValue(AttributeValueIndex(i), normal);
        }
    }
    if (num_tex_coords != NULL && num_tex_coords > 0) {
        GeometryAttribute va;
        va.Init(GeometryAttribute::TEX_COORD, nullptr, 2, DT_FLOAT32, false,
            sizeof(float) * 2, 0);
        tex_att_id_ = out_point_cloud_->AddAttribute(va, use_identity_mapping,
            num_tex_coords);

        for (int i = 0; i < num_tex_coords; ++i) {
            float uv[2];
            uv[0] = uvs[2 * i];
            uv[1] = uvs[2 * i + 1];
            out_point_cloud_->attribute(tex_att_id_)
                ->SetAttributeValue(AttributeValueIndex(i), uv);
        }
    }


    for (int i = 0; i < num_obj_faces; ++i) {
        for (int j = 0; j < 3; ++j) {
            int index = 3 * i + j;
            const PointIndex vert_id(index);

            if (pos_att_id_ != -1) {
                out_point_cloud_->attribute(pos_att_id_)
                    ->SetPointMapEntry(vert_id, AttributeValueIndex(indexs[index]));
            }
            if (norm_att_id_ != -1) {
                out_point_cloud_->attribute(norm_att_id_)
                    ->SetPointMapEntry(vert_id, AttributeValueIndex(indexs[index]));
            }
            if (tex_att_id_ != -1) {
                out_point_cloud_->attribute(tex_att_id_)
                    ->SetPointMapEntry(vert_id, AttributeValueIndex(indexs[index]));
            }
        }
    }

    Mesh::Face face;
    for (FaceIndex i(0); i < num_obj_faces; ++i) {
        for (int c = 0; c < 3; ++c) {
            face[c] = 3 * i.value() + c;
        }
        out_mesh->SetFace(i, face);
    }

    out_point_cloud_->DeduplicateAttributeValues();
    out_point_cloud_->DeduplicatePointIds();

    const int speed = 10 - options.compression_level;
    draco::Encoder encoder;
    if (options.pos_quantization_bits > 0) {
        encoder.SetAttributeQuantization(draco::GeometryAttribute::POSITION,
            options.pos_quantization_bits);
    }
    if (options.tex_coords_quantization_bits > 0) {
        encoder.SetAttributeQuantization(draco::GeometryAttribute::TEX_COORD,
            options.tex_coords_quantization_bits);
    }
    if (options.normals_quantization_bits > 0) {
        encoder.SetAttributeQuantization(draco::GeometryAttribute::NORMAL,
            options.normals_quantization_bits);
    }
    if (options.generic_quantization_bits > 0) {
        encoder.SetAttributeQuantization(draco::GeometryAttribute::GENERIC,
            options.generic_quantization_bits);
    }
    encoder.SetSpeedOptions(speed, speed);
    draco::EncoderBuffer buffer;
    const draco::Status status = encoder.EncodeMeshToBuffer(*out_mesh, &buffer);
    if (!status.ok()) {
        printf("Failed to encode the mesh.\n");
        printf("%s\n", status.error_msg());
        return nullptr;
    }
    // copy
    int size = buffer.size();
    *length = size;
    char* pc = new char[size];
    std::vector<char> data = *(buffer.buffer());
    for (int i = 0; i < size; i++) {
        pc[i] = data[i];
    }
    return pc;
}

void deleteDracoData(char* data) {
    try {
        delete data;
    }
    catch (const std::exception&)
    {
    }
}