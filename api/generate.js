// api/generate.js
const QRCode = require('qrcode');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const qr = await QRCode.toDataURL(url);
    res.status(200).json({ image: qr });
  } catch (err) {
    res.status(500).json({ error: 'QR generation failed', details: err });
  }
}
