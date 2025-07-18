#!/bin/bash

# Complete Image Optimization Script for Barber Shem-Tov Website
# This script optimizes ALL images across the entire site

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Complete Site Image Optimization${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Check if required tools are installed
check_requirements() {
    local missing_tools=()
    
    if ! command -v convert &> /dev/null; then
        missing_tools+=("imagemagick")
    fi
    
    if ! command -v cwebp &> /dev/null; then
        missing_tools+=("webp")
    fi
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        echo -e "${RED}Missing required tools: ${missing_tools[*]}${NC}"
        echo -e "${YELLOW}Install with: brew install ${missing_tools[*]}${NC}"
        exit 1
    fi
}

# Function to get human-readable file size
human_readable_size() {
    local size=$1
    local units=("B" "KB" "MB" "GB")
    local unit=0
    
    while (( size > 1024 && unit < ${#units[@]} - 1 )); do
        size=$((size / 1024))
        ((unit++))
    done
    
    echo "$size${units[$unit]}"
}

# Function to optimize a single image
optimize_image() {
    local input_file="$1"
    local max_width="$2"
    local quality="$3"
    local category="$4"
    
    # Skip if already optimized
    if [[ "$input_file" == *"-optimized"* ]]; then
        return
    fi
    
    local dir=$(dirname "$input_file")
    local filename=$(basename "$input_file")
    local name="${filename%.*}"
    local ext="${filename##*.}"
    
    # Get original file size
    local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)
    
    echo -e "\n${YELLOW}Processing: ${filename}${NC}"
    echo -e "Category: ${category} | Original size: $(human_readable_size $original_size)"
    
    # Create optimized version
    local optimized_file="${dir}/${name}-optimized.${ext}"
    
    convert "$input_file" \
        -resize "${max_width}x>" \
        -quality "$quality" \
        -strip \
        -interlace Plane \
        -colorspace sRGB \
        "$optimized_file" 2>/dev/null
    
    # Get optimized size
    local optimized_size=$(stat -f%z "$optimized_file" 2>/dev/null || stat -c%s "$optimized_file" 2>/dev/null)
    
    # Generate WebP version
    local webp_file="${dir}/${name}.webp"
    cwebp -q "$quality" "$optimized_file" -o "$webp_file" 2>/dev/null
    
    # Get WebP size
    local webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null)
    
    # Replace original with optimized version
    mv "$optimized_file" "$input_file"
    
    # Calculate savings
    local jpg_savings=$((original_size - optimized_size))
    local jpg_percentage=$((jpg_savings * 100 / original_size))
    local webp_savings=$((original_size - webp_size))
    local webp_percentage=$((webp_savings * 100 / original_size))
    
    echo -e "${GREEN}✓ JPG: $(human_readable_size $optimized_size) (${jpg_percentage}% smaller)${NC}"
    echo -e "${GREEN}✓ WebP: $(human_readable_size $webp_size) (${webp_percentage}% smaller)${NC}"
    
    # Update global statistics
    ((total_images++))
    ((total_original_size += original_size))
    ((total_optimized_size += optimized_size))
    ((total_webp_size += webp_size))
}

# Check requirements
check_requirements

# Create backup directory
BACKUP_DIR="./public/images/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}Creating backup of all images in: ${BACKUP_DIR}${NC}"

# Copy all images to backup
find ./public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) \
    -not -path "*/backup_*" -exec cp {} "$BACKUP_DIR/" \;

# Initialize statistics
total_images=0
total_original_size=0
total_optimized_size=0
total_webp_size=0

# Define optimization settings for different image categories
declare -A image_settings=(
    ["hero"]="2400:85"           # Hero images: max 2400px wide, 85% quality
    ["gallery"]="1600:80"        # Gallery images: max 1600px wide, 80% quality
    ["team"]="1200:80"           # Team photos: max 1200px wide, 80% quality
    ["services"]="1200:80"       # Service images: max 1200px wide, 80% quality
    ["testimonials"]="800:75"    # Testimonial images: max 800px wide, 75% quality
    ["icons"]="400:90"           # Icons: max 400px wide, 90% quality
    ["logos"]="600:85"           # Logos: max 600px wide, 85% quality
    ["default"]="1600:80"        # Default for other images
)

echo -e "\n${BLUE}Starting optimization...${NC}"

# Process images by category
for category in "${!image_settings[@]}"; do
    if [[ "$category" == "default" ]]; then continue; fi
    
    IFS=':' read -r max_width quality <<< "${image_settings[$category]}"
    
    # Find images in category folder
    if [ -d "./public/images/$category" ]; then
        echo -e "\n${BLUE}=== Optimizing ${category^} Images ===${NC}"
        
        while IFS= read -r -d '' image; do
            optimize_image "$image" "$max_width" "$quality" "$category"
        done < <(find "./public/images/$category" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -not -name "*-optimized*" -print0)
    fi
done

# Process any remaining images not in specific categories
echo -e "\n${BLUE}=== Optimizing Other Images ===${NC}"
IFS=':' read -r max_width quality <<< "${image_settings[default]}"

while IFS= read -r -d '' image; do
    # Skip if in a category folder or backup
    skip=false
    for category in "${!image_settings[@]}"; do
        if [[ "$category" != "default" && "$image" == *"/images/$category/"* ]]; then
            skip=true
            break
        fi
    done
    
    if [[ "$image" == *"/backup_"* ]]; then
        skip=true
    fi
    
    if [ "$skip" = false ]; then
        optimize_image "$image" "$max_width" "$quality" "other"
    fi
done < <(find ./public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -not -name "*-optimized*" -print0)

# Generate summary report
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}         Optimization Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Total images processed: ${GREEN}${total_images}${NC}"
echo -e "Original total size: ${RED}$(human_readable_size $total_original_size)${NC}"
echo -e "Optimized JPG/PNG size: ${YELLOW}$(human_readable_size $total_optimized_size)${NC}"
echo -e "WebP total size: ${GREEN}$(human_readable_size $total_webp_size)${NC}"

if [ $total_original_size -gt 0 ]; then
    jpg_total_savings=$((total_original_size - total_optimized_size))
    jpg_total_percentage=$((jpg_total_savings * 100 / total_original_size))
    webp_total_savings=$((total_original_size - total_webp_size))
    webp_total_percentage=$((webp_total_savings * 100 / total_original_size))
    
    echo -e "\nTotal savings:"
    echo -e "JPG/PNG: ${GREEN}$(human_readable_size $jpg_total_savings) (${jpg_total_percentage}% reduction)${NC}"
    echo -e "WebP: ${GREEN}$(human_readable_size $webp_total_savings) (${webp_total_percentage}% reduction)${NC}"
fi

# Create optimization report
REPORT_FILE="./image-optimization-report-$(date +%Y%m%d_%H%M%S).txt"
{
    echo "Image Optimization Report"
    echo "Generated: $(date)"
    echo "========================"
    echo ""
    echo "Summary:"
    echo "- Total images: $total_images"
    echo "- Original size: $(human_readable_size $total_original_size)"
    echo "- Optimized size: $(human_readable_size $total_optimized_size)"
    echo "- WebP size: $(human_readable_size $total_webp_size)"
    echo "- JPG savings: ${jpg_total_percentage}%"
    echo "- WebP savings: ${webp_total_percentage}%"
    echo ""
    echo "Backup location: $BACKUP_DIR"
} > "$REPORT_FILE"

echo -e "\n${GREEN}✓ Optimization complete!${NC}"
echo -e "${YELLOW}Report saved to: ${REPORT_FILE}${NC}"
echo -e "${YELLOW}Original images backed up to: ${BACKUP_DIR}${NC}"

# Provide Next.js configuration suggestion
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}    Next Steps for Implementation${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "\n1. Update your Next.js components to use WebP with fallback:"
echo -e "${YELLOW}   <picture>
     <source srcSet=\"/images/hero/academy-hero.webp\" type=\"image/webp\" />
     <img src=\"/images/hero/academy-hero.jpg\" alt=\"Academy\" />
   </picture>${NC}"

echo -e "\n2. Or use Next.js Image component (automatically serves WebP when supported):"
echo -e "${YELLOW}   import Image from 'next/image'
   <Image src=\"/images/hero/academy-hero.jpg\" ... />${NC}"

echo -e "\n3. Clear your Next.js cache:"
echo -e "${YELLOW}   rm -rf .next${NC}"

echo -e "\n4. Test the site performance again!"

# Optional: Create a simple HTML test page
echo -e "\n${BLUE}Creating test page to compare image formats...${NC}"
cat > "./public/image-comparison.html" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Image Format Comparison</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .comparison { display: flex; gap: 20px; margin-bottom: 30px; }
        .image-box { flex: 1; text-align: center; }
        img { max-width: 100%; height: auto; }
        .stats { background: #f0f0f0; padding: 10px; margin-top: 10px; }
    </style>
</head>
<body>
    <h1>Image Format Comparison</h1>
    <p>Compare original JPG vs WebP formats. Check network tab for size differences.</p>
    
    <div class="comparison">
        <div class="image-box">
            <h3>Original JPG</h3>
            <img src="/images/hero/academy-hero.jpg" alt="JPG version">
            <div class="stats">Check Network tab for size</div>
        </div>
        <div class="image-box">
            <h3>WebP Format</h3>
            <img src="/images/hero/academy-hero.webp" alt="WebP version">
            <div class="stats">Check Network tab for size</div>
        </div>
    </div>
</body>
</html>
EOF

echo -e "${GREEN}✓ Test page created at: /public/image-comparison.html${NC}"
echo -e "\n${GREEN}All done! Your site images are now optimized for maximum performance! 🚀${NC}"
