#!/bin/sh
echo "Installing dependencies..."
npm install --force
echo "Building application..."
npm run build
echo "Exporting static site..."
npm run export
echo "Verifying output directories..."
ls -la .next || echo "Warning: No .next directory found"
ls -la out || echo "Warning: No out directory found"