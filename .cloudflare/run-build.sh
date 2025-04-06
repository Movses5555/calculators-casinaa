#!/bin/sh
echo "Installing dependencies..."
npm install
echo "Building application..."
npm run build
echo "Verifying build output..."
ls -la .next