const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'assets';
const outputDir = 'assets/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const files = fs.readdirSync(inputDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
});

async function optimizeImage(file) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        // Resize if image is too large
        if (metadata.width > 1920) {
            image.resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }
        
        // Optimize based on file type
        if (file.toLowerCase().endsWith('.png')) {
            await image
                .png({ quality: 80, compressionLevel: 9 })
                .toFile(outputPath);
        } else {
            await image
                .jpeg({ quality: 80, progressive: true })
                .toFile(outputPath);
        }
        
        console.log(`Optimized: ${file}`);
    } catch (error) {
        console.error(`Error processing ${file}:`, error);
    }
}

// Process all images
async function processImages() {
    console.log('Starting image optimization...');
    for (const file of files) {
        await optimizeImage(file);
    }
    console.log('Image optimization complete!');
}

processImages(); 