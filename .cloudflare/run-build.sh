#!/bin/sh
echo "Installing dependencies..."
npm install --force
echo "Building application..."
npm run build
echo "Verifying build output..."
ls -la .next || (echo "Build failed - no .next directory created" && exit 1)