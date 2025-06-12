#!/bin/bash

# Fix all HTML files to include proper script references

echo "Fixing HTML files..."

# List of HTML files to fix
HTML_FILES=(
    "plan.html"
    "profile.html"
    "leaderboard.html"
    "group-chat.html"
    "pdf-viewer.html"
)

for file in "${HTML_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # Replace jQuery and other script references
        sed -i.bak 's|<script src="js/jquery.min.js"></script>|<script src="assets/js/jquery.min.js"></script>|g' "$file"
        sed -i.bak 's|<script src="js/browser.min.js"></script>|<script src="assets/js/browser.min.js"></script>|g' "$file"
        sed -i.bak 's|<script src="js/breakpoints.min.js"></script>|<script src="assets/js/breakpoints.min.js"></script>|g' "$file"
        sed -i.bak 's|<script src="js/util.js"></script>|<script src="assets/js/util.js"></script>|g' "$file"
        sed -i.bak 's|<script src="js/main.js"></script>|<script src="assets/js/main.js"></script>|g' "$file"
        
        # Check if config.js is already included
        if ! grep -q "config.js" "$file"; then
            # Add config.js before api.js
            sed -i.bak 's|<script src="assets/js/api.js"></script>|<script src="assets/js/config.js"></script>\
		<script src="assets/js/api.js"></script>|g' "$file"
        fi
        
        # Check if error-handler.js is already included
        if ! grep -q "error-handler.js" "$file"; then
            # Add error-handler.js after api.js
            sed -i.bak 's|<script src="assets/js/api.js"></script>|<script src="assets/js/api.js"></script>\
		<script src="assets/js/error-handler.js"></script>|g' "$file"
        fi
        
        # Check if init.js is already included
        if ! grep -q "init.js" "$file"; then
            # Add init.js after error-handler.js
            sed -i.bak 's|<script src="assets/js/error-handler.js"></script>|<script src="assets/js/error-handler.js"></script>\
		<script src="assets/js/init.js"></script>|g' "$file"
        fi
        
        # Remove backup files
        rm -f "${file}.bak"
        
        echo "✓ Fixed $file"
    else
        echo "⚠ $file not found"
    fi
done

echo "All HTML files have been updated!"
