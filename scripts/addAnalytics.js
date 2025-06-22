const fs = require('fs');
const path = require('path');

// Function to recursively find all HTML files
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      fileList = findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to add analytics script to HTML file
function addAnalyticsToFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if analytics script is already present
    if (content.includes('analytics.js')) {
      console.log(`✓ Analytics already present in: ${filePath}`);
      return;
    }
    
    // Calculate relative path to analytics.js
    const relativePath = path.relative(path.dirname(filePath), 'js/analytics.js');
    const scriptTag = `  <!-- Google Analytics -->
  <script src="${relativePath}"></script>
</head>`;
    
    // Replace closing head tag with analytics script
    if (content.includes('</head>')) {
      content = content.replace('</head>', scriptTag);
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Added analytics to: ${filePath}`);
    } else {
      console.log(`⚠ No </head> tag found in: ${filePath}`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

// Main execution
console.log('🔍 Finding HTML files...');
const htmlFiles = findHtmlFiles('.');
console.log(`Found ${htmlFiles.length} HTML files`);

console.log('\n📊 Adding analytics script to HTML files...');
htmlFiles.forEach(file => {
  addAnalyticsToFile(file);
});

console.log('\n✅ Analytics setup complete!');
console.log('\n📝 Next steps:');
console.log('1. Create a Google Analytics 4 account at https://analytics.google.com/');
console.log('2. Get your Measurement ID (starts with G-)');
console.log('3. Update js/analytics.js - replace G-XXXXXXXXXX with your actual ID');
console.log('4. Deploy your website and test the analytics'); 