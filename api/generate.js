const QRCode = require('qrcode');

export default async function handler(req, res) {
  const { url, format, fgColor, bgColor } = req.body;

  if (!url || !format) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const options = {
    color: {
      dark: fgColor || '#000000',
      light: format === 'png' ? undefined : bgColor || '#FFFFFF'
    }
  };

  try {
    if (format === 'svg') {
      const svg = await QRCode.toString(url, { type: 'svg', ...options });
      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
      res.status(200).send(svg);
    } else {
      const png = await QRCode.toDataURL(url, {
        ...options,
        width: 500 //
      });
      res.status(200).json({ image: png });
    }
  } catch (err) {
    res.status(500).json({ error: 'QR generation failed', details: err.message });
  }
}
