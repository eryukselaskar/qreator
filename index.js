const express = require('express');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use('/qrs', express.static(path.join(__dirname, 'qrs')));

// QR kod oluşturma endpoint'i
app.post('/generate', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const fileName = `qr_${Date.now()}.png`;
  const filePath = path.join(__dirname, 'qrs', fileName);

  try {
    await QRCode.toFile(filePath, url);
    res.json({ downloadUrl: `/qrs/${fileName}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR', details: err });
  }
});

module.exports = app;
