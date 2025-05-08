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
        const logoSvg = `
          <image xlink:href="${logoBase64}" x="35%" y="35%" height="30%" width="30%"/>
        `;
        svg = svg.replace('</svg>', `${logoSvg}</svg>`);
      }

      res.setHeader('Content-Type', 'image/svg+xml');
      res.status(200).send(svg);
    } else {
      const png = await QRCode.toDataURL(url, options);
      res.status(200).json({ image: png });
    }
  } catch (err) {
    res.status(500).json({ error: 'QR generation failed', details: err });
  }
}
