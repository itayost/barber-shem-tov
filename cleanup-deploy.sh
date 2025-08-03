#!/bin/bash

# Cleanup Script for Deployment
# This script removes unnecessary files before deployment

echo "🧹 Starting cleanup for deployment..."

# 1. Remove backup directories
echo "📁 Removing backup directories..."
rm -rf public/images/backup_*
rm -rf src/backup_*
rm -rf backup_*

# 2. Remove test files
echo "🧪 Removing test files..."
rm -f test-metadata.mjs
rm -rf src/app/test-form  # Remove the test form page

# 3. Remove optimization scripts and reports
echo "📊 Removing optimization scripts and reports..."
rm -f optimize-images.sh
rm -f image-optimization-report-*.txt
rm -f files-to-delete-backup.txt

# 4. Remove .DS_Store files (macOS)
echo "🍎 Removing .DS_Store files..."
find . -name ".DS_Store" -type f -delete

# 5. Remove the example env file (keep .env.local)
echo "🔐 Cleaning environment files..."
rm -f .env.local.example

# 6. Clean up any log files
echo "📝 Removing log files..."
rm -f *.log
rm -f npm-debug.log*
rm -f yarn-debug.log*
rm -f yarn-error.log*

# 7. Remove Next.js cache (will be rebuilt on deployment)
echo "🚀 Cleaning Next.js cache..."
rm -rf .next

# 8. Optional: Remove node_modules (will be reinstalled on deployment)
read -p "Do you want to remove node_modules? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "📦 Removing node_modules..."
    rm -rf node_modules
fi

# 9. Create production .env.local template
echo "📄 Creating production environment template..."
cat > .env.production.local.template << 'EOF'
# Production Environment Variables
# Copy this to .env.local on your production server

# Google Sheets Integration
NEXT_PUBLIC_GOOGLE_SHEETS_URL=your_production_google_sheets_url_here

# Add any other production environment variables here
EOF

# 10. Update .gitignore to ensure sensitive files aren't committed
echo "📝 Updating .gitignore..."
cat >> .gitignore << 'EOF'

# Environment files
.env.local
.env.production.local

# Backup directories
backup_*
*_backup/

# Reports and logs
*.log
*-report-*.txt

# OS files
.DS_Store
Thumbs.db

# Test files
test-*
*.test.*

# IDE files
.idea/
.vscode/
*.swp
*.swo
EOF

echo "✅ Cleanup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Review the changes"
echo "2. Test the application locally"
echo "3. Commit the cleaned project"
echo "4. Deploy to your hosting platform"
echo ""
echo "⚠️  Remember to:"
echo "- Set up environment variables on your production server"
echo "- Configure your Google Sheets URL for production"
echo "- Test the form submission after deployment"