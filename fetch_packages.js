const https = require('https');
const urls = [
  'https://kotanabi.com/listings/umroh-awal-ramadhan-13-februari-2027-dxqaaxzme4',
  'https://kotanabi.com/listings/umroh-pertengahan-ramadhan-17-februari-2027-xqadmgd5b1?ref=7282',
  'https://kotanabi.com/listings/umroh-gold-tengah-ramadhan-20-februari-2027-wdplvgbxeb?ref=7282',
  'https://kotanabi.com/listings/umroh-itikaf-27-februari-2027-bus-1-loqwlxkjox?ref=7282',
  'https://kotanabi.com/listings/umroh-itikaf-ramadhan-2027-rqwkdorxwb?ref=7282',
  'https://kotanabi.com/listings/umroh-ittikaf-madinah-01-maret-2027-12-hari-kvobpqrww0?ref=7282'
];

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  for (const url of urls) {
    try {
      const html = await fetchHtml(url);
      // look for image
      const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const priceMatch = html.match(/Rp\s*[\d,\.]+/);
      
      console.log('URL:', url);
      console.log('Title:', titleMatch ? titleMatch[1] : null);
      console.log('Image:', imgMatch ? imgMatch[1] : null);
      console.log('Price:', priceMatch ? priceMatch[0] : null);
      console.log('---');
    } catch(e) {
      console.error('Error fetching', url, e);
    }
  }
}
run();
