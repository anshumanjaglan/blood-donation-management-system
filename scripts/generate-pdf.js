const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '..');
const outPdf = path.join(rootDir, 'Blood_Donation_Management_System_Presentation.pdf');
const publicPdf = path.join(rootDir, 'public', 'Blood_Donation_Management_System_Presentation.pdf');
const desktopDir = path.join(process.env.USERPROFILE || 'C:\\Users\\jagla', 'OneDrive', 'Desktop');
const desktopPdf = path.join(desktopDir, 'Blood_Donation_Management_System_Presentation.pdf');

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const url = "http://localhost:3000/print.html";

console.log('Generating pixel-perfect 14-page presentation PDF...');
try {
  const cmd = `"${chromePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${outPdf}" "${url}"`;
  execSync(cmd, { stdio: 'inherit' });

  if (fs.existsSync(outPdf)) {
    fs.copyFileSync(outPdf, publicPdf);
    if (fs.existsSync(desktopDir)) {
      fs.copyFileSync(outPdf, desktopPdf);
    }
    console.log('SUCCESS: High-resolution PDF generated at:');
    console.log(' - Project Root: ', outPdf);
    console.log(' - Public Web:   ', publicPdf);
    console.log(' - User Desktop: ', desktopPdf);
  }
} catch (err) {
  console.error('Error rendering PDF:', err.message);
}
