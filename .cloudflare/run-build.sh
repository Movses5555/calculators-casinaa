#!/bin/sh
echo "Installing dependencies..."
npm install --force
echo "Running full build..."
npm run full-build
echo "Verifying output..."
ls -la .next || (echo "Build failed - no .next directory" && exit 1)
ls -la out || (echo "Export failed - no out directory" && exit 1)