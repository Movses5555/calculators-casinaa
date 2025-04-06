#!/bin/sh
echo "Setting up environment..."
export NODE_VERSION=20.12.2

echo "Installing dependencies..."
npm install --force

echo "Building application..."
npm run build

echo "Verifying output..."
if [ -d "out" ]; then
  echo "Build successful - out directory exists"
  ls -la out
  exit 0
else
  echo "Error: Build failed - no out directory created"
  exit 1
fi