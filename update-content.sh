#!/usr/bin/env bash

cd content || git pull
cd .scripts || python3 tag_sorter.py -p ".." || python3 reference_sorter.py -p ".."
cd ..
cd ..

if command -v nix &> /dev/null; then
  nix develop --no-pure-eval --command npx quartz sync
else
  npx quartz sync
fi

