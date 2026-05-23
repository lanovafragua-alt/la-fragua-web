"""Prepare a high-resolution Ascuas GLB for real-time web display in Blender."""

from __future__ import annotations

import sys

import bpy


def decimation_ratio(item: bpy.types.Object) -> float | None:
    face_count = len(item.data.polygons)
    if item.name.startswith("single_color"):
        return None
    if item.name.startswith("Cubo"):
        return 0.05
    if face_count > 1_000_000:
        return 0.1
    if face_count > 250_000:
        return 0.14
    if face_count > 50_000:
        return 0.14
    if face_count > 2_000:
        return 0.28
    return None


def main() -> None:
    args = sys.argv[sys.argv.index("--") + 1 :]
    if len(args) != 2:
        raise SystemExit("Usage: blender --background --python tools/prepare_ascuas_model.py -- INPUT OUTPUT")

    source, destination = args

    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=source)

    meshes = [item for item in bpy.context.scene.objects if item.type == "MESH"]
    before = sum(len(item.data.polygons) for item in meshes)

    for item in meshes:
        ratio = decimation_ratio(item)
        if ratio is None:
            continue

        bpy.context.view_layer.objects.active = item
        item.select_set(True)
        modifier = item.modifiers.new(name="Web Decimate", type="DECIMATE")
        modifier.decimate_type = "COLLAPSE"
        modifier.ratio = ratio
        modifier.use_collapse_triangulate = True
        bpy.ops.object.modifier_apply(modifier=modifier.name)
        item.select_set(False)

    after = sum(len(item.data.polygons) for item in meshes)
    print(f"ASCUAS_FACES_BEFORE={before}")
    print(f"ASCUAS_FACES_AFTER={after}")

    bpy.ops.export_scene.gltf(
        filepath=destination,
        export_format="GLB",
        export_apply=True,
    )


if __name__ == "__main__":
    main()
