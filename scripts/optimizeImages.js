const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, '../assets');
const targetDir = path.join(sourceDir, 'optimized');

async function optimizeImage(sourcePath, targetPath) {
    try {
        const image = sharp(sourcePath);
        const metadata = await image.metadata();
        
        // Determine the output format based on the input format
        const outputFormat = metadata.format === 'jpeg' ? 'jpeg' : 'png';
        
        // Set optimization options
        const options = {
            quality: 80, // Adjust quality (0-100)
            progressive: true, // Use progressive loading for JPEGs
        };

        // Add format-specific options
        if (outputFormat === 'jpeg') {
            options.mozjpeg = true; // Use mozjpeg for better JPEG compression
        } else if (outputFormat === 'png') {
            options.png = {
                compressionLevel: 9, // Maximum compression
                palette: true, // Use palette for better compression
            };
        }

        // Process and save the image
        await image
            .toFormat(outputFormat, options)
            .toFile(targetPath);

        console.log(`Optimized: ${path.basename(sourcePath)}`);
    } catch (error) {
        console.error(`Error optimizing ${sourcePath}:`, error);
    }
}

async function main() {
    try {
        // Ensure the optimized directory exists
        await fs.mkdir(targetDir, { recursive: true });

        // Get list of files in source directory
        const files = await fs.readdir(sourceDir);
        
        // Filter out directories and already optimized files
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return !file.startsWith('.') && 
                   !file.includes('optimized') && 
                   (ext === '.jpg' || ext === '.jpeg' || ext === '.png');
        });

        // Process each image
        for (const file of imageFiles) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);
            
            // Check if the file already exists in the optimized directory
            try {
                await fs.access(targetPath);
                console.log(`Skipping ${file} - already optimized`);
            } catch {
                await optimizeImage(sourcePath, targetPath);
            }
        }

        console.log('Image optimization complete!');
    } catch (error) {
        console.error('Error:', error);
    }
}

main(); 