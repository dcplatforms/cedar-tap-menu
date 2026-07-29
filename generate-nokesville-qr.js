const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function generateQRCodes() {
  const qrCodes = [
    {
      url: 'https://www.nokesvillewinery.com',
      filename: 'qr-nokesville-wine-list.svg',
      label: 'Nokesville Winery - Wine List'
    },
    {
      url: 'https://cedartaps.com/nokesville',
      filename: 'qr-nokesville-cedar-tap.svg',
      label: 'Cedar Tap - Nokesville Partnership'
    }
  ];

  for (const qr of qrCodes) {
    try {
      const svgString = await QRCode.toString(qr.url, {
        type: 'image/svg+xml',
        width: 300,
        margin: 2,
        color: {
          dark: '#3d1a1a',  // Wine dark burgundy
          light: '#f8f7f4'  // Cream background
        }
      });

      const filepath = path.join(__dirname, 'img', qr.filename);
      fs.writeFileSync(filepath, svgString);
      console.log(`✅ Generated ${qr.filename}`);
    } catch (err) {
      console.error(`❌ Error generating ${qr.filename}:`, err.message);
    }
  }
}

generateQRCodes();
