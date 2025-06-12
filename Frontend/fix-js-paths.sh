#!/bin/bash

echo "Fixing JavaScript file paths..."

# Copy all JS files from js/ to assets/js/
echo "Copying files from js/ to assets/js/..."
cp -n Frontend/js/*.js Frontend/assets/js/ 2>/dev/null || true

# List all files to verify
echo "Files in assets/js/:"
ls -la Frontend/assets/js/

echo "Done!"
