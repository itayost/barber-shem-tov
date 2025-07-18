# Pre-Deployment Checklist for The Fader Website

## 🧹 Files to Remove

### Test Files
- [x] `test-metadata.mjs` - Test script created during development
- [x] `src/app/test/` - Test page directory
- [x] `files-to-delete.txt` - This cleanup list

### Unused Default Files
- [x] `public/next.svg` - Default Next.js logo
- [x] `public/vercel.svg` - Default Vercel logo
- [x] `public/file.svg` - Unused icon
- [x] `public/globe.svg` - Unused icon
- [x] `public/window.svg` - Unused icon

### Duplicate Files
- [x] `src/app/icon0.svg` - Duplicate icon (using favicon.ico instead)
- [x] `src/app/icon1.png` - Duplicate icon (using favicon.ico instead)
- [x] `public/manifest.json` - Duplicate (using site.webmanifest)

## ✅ Files to Keep

### Important Config Files
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts
- `.gitignore` - Git ignore rules
- `.eslintrc.json` - ESLint configuration

### SEO & Meta Files
- `src/app/favicon.ico` - Site favicon
- `src/app/apple-icon.png` - Apple touch icon
- `src/app/shortcut-icon.png` - Shortcut icon
- `public/site.webmanifest` - PWA manifest
- `src/app/robots.ts` - Robots.txt configuration
- `src/app/sitemap.ts` - Sitemap configuration

### Logo Files for PWA
- `public/logo-192x192.png` - PWA icon
- `public/logo-512x512.png` - PWA icon

## 🚀 Deployment Steps

1. **Run cleanup script:**
   ```bash
   chmod +x cleanup-deploy.sh
   ./cleanup-deploy.sh
   ```

2. **Install clean dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Test production build locally:**
   ```bash
   npm start
   ```

5. **Check for any build warnings or errors**

6. **Deploy to your hosting platform:**
   - Vercel: `vercel --prod`
   - Netlify: Push to connected Git branch
   - Other: Follow platform-specific instructions

## 📋 Final Checks

- [ ] All pages load correctly
- [ ] Metadata shows properly on all pages
- [ ] Images load and are optimized
- [ ] Forms work correctly
- [ ] WhatsApp button functions
- [ ] Mobile responsive design works
- [ ] No console errors in production

## 🔍 Post-Deployment

- Test all pages on production URL
- Check Google Search Console for any issues
- Verify sitemap is accessible at `/sitemap.xml`
- Ensure robots.txt is accessible at `/robots.txt`
- Monitor Core Web Vitals