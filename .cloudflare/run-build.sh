cat > .cloudflare/run-build.sh << 'EOL'
#!/bin/sh
echo "Forcing npm installation..."
npm install
echo "Running build..."
npm run build
EOL