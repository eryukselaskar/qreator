const QRCode = require('qrcode');

export default async function handler(req, res) {
  const { url, format, fgColor, bgColor, logoBase64 } = req.body;

  if (!url || !format) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const options = {
    color: {
      dark: fgColor || '#000000',
      light: bgColor || '#FFFFFF'
    }
  };

  try {
    if (format === 'svg') {
      let svg = await QRCode.toString(url, { type: 'svg', ...options });

      if (logoBase64) {
        const escapedLogo = logoBase64.replace(/"/g, '&quot;');

        // SVG'yi aç, içine logo ekle ama <svg ...> tagine dokunma
        const indexOfSvgClose = svg.indexOf('</svg>');
        const logoSvg = `<image href="${escapedLogo}" x="35%" y="35%" width="30%" height="30%" />`;

        // Yeni içerikli SVG üret
        svg = svg.slice(0, indexOfSvgClose) + logoSvg + svg.slice(indexOfSvgClose);
      }

      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
      res.status(200).send(svg);
    } else {
      const png = await QRCode.toDataURL(url, options);
      res.status(200).json({ image: png });
    }
  } catch (err) {
    res.status(500).json({ error: 'QR generation failed', details: err.message });
  }
}
