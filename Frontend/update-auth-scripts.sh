#!/bin/bash

# List of HTML files that need auth guard (excluding index.html)
files=(
    "dashboard.html"
    "quiz.html"
    "plan.html"
    "leaderboard.html"
    "friends.html"
    "profile.html"
    "group-chat.html"
    "pdf-viewer.html"
)

echo "Updating authentication scripts in HTML files..."

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # Check if auth-guard.js is already included
        if ! grep -q "auth-guard.js" "$file"; then
            # Add auth-guard.js after api.js
            sed -i '' 's|<script src="assets/js/api.js"></script>|<script src="assets/js/api.js"></script>\
		<script src="assets/js/auth-guard.js"></script>|' "$file"
        fi
        
        # Remove studia-init.js if present (replaced by auth-guard.js)
        sed -i '' '/<script src="assets\/js\/studia-init.js"><\/script>/d' "$file"
        
        echo "✓ Updated $file"
    else
        echo "✗ $file not found"
    fi
done

echo "Done!"
