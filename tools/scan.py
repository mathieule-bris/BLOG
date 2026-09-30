#!/usr/bin/env python3
"""Run after adding or removing files in images/ or music/:  python3 tools/scan.py
Writes media.json, which the site reads to build galleries and playlists."""
import json, os
from urllib.parse import quote

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
kinds = {
    "images": (".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"),
    "music": (".mp3", ".m4a", ".ogg", ".wav", ".flac"),
}
out = {}
for kind, exts in kinds.items():
    files = []
    for d, _, names in os.walk(os.path.join(root, kind)):
        for n in names:
            if n.lower().endswith(exts):
                rel = os.path.relpath(os.path.join(d, n), root).replace(os.sep, "/")
                files.append(quote(rel))
    out[kind] = sorted(files)
with open(os.path.join(root, "media.json"), "w") as f:
    json.dump(out, f, indent=1)
print({k: len(v) for k, v in out.items()}, "-> media.json")
