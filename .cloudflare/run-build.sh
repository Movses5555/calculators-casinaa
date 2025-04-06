#!/bin/sh
echo "Installing dependencies..."
npm install --force
echo "Building application..."
npm run build
echo "Verifying output..."
if [ -d "out" ]; then
  echo "Static export successful - out directory exists"
  ls -la out
else
  echo "Error: Build failed - no out directory created"
  exit 1
fi