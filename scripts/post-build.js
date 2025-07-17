// scripts/post-build.js
const fs = require('fs').promises;
const path = require('path');

async function createHtaccess() {
  const htaccessContent = `
# Redirect all routes to index.html for client-side routing
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 month"
  
  # CSS & JS
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  
  # HTML
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
`.trim();

  try {
    const outPath = path.join(__dirname, '../out');
    await fs.access(outPath);
    await fs.writeFile(path.join(outPath, '.htaccess'), htaccessContent);
    console.log('✅ .htaccess created successfully');
  } catch (error) {
    console.error('❌ Error creating .htaccess:', error.message);
  }
}

async function logBuildInfo() {
  try {
    const outPath = path.join(__dirname, '../out');
    const stats = await fs.stat(outPath);

    // חשב גודל תיקייה
    async function getDirSize(dir) {
      let size = 0;
      const files = await fs.readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
          size += await getDirSize(filePath);
        } else {
          const stat = await fs.stat(filePath);
          size += stat.size;
        }
      }
      return size;
    }

    const totalSize = await getDirSize(outPath);
    const sizeMB = (totalSize / 1024 / 1024).toFixed(2);

    console.log(`\n📊 Build Statistics:`);
    console.log(`   Total Size: ${sizeMB} MB`);
    console.log(`   Ready for upload to Hostinger!\n`);
  } catch (error) {
    console.error('Could not calculate build size:', error.message);
  }
}

// Run post-build tasks
async function run() {
  console.log('\n🔧 Running post-build tasks...\n');
  await createHtaccess();
  await logBuildInfo();
}

run().catch(console.error);
