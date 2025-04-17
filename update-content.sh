#!/usr/bin/env bash

cd content || git pull
cd ..

if command -v nix &> /dev/null; then
  nix develop --no-pure-eval --command npx quartz sync
else
  npx quartz sync
fi

