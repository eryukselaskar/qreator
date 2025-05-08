async function generateQR() {
    const urlInput = document.getElementById("urlInput").value.trim();
    const campaign = document.getElementById("campaign").value.trim();
    const format = document.getElementById("format").value;
    const fgColor = document.getElementById("fgColor").value;
    const bgColor = document.getElementById("bgColor").value;
  
    if (!urlInput) return alert("Please enter a URL.");
  
    let url = urlInput;
    if (campaign) {
      url += (url.includes('?') ? '&' : '?') +
        `utm_source=qreator&utm_medium=qr&utm_campaign=${encodeURIComponent(campaign)}`;
    }
  
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, format, fgColor, bgColor }),
    });
  
    if (format === 'svg') {
      const svg = await res.text();
      document.getElementById("result").innerHTML = `
        <p>Your QR Code:</p>
        <div id="qrSvg">${svg}</div>
        <a href="data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}"
           download="qreator_qr.svg">📥 Download SVG</a>
      `;
    } else {
      const data = await res.json();
      document.getElementById("result").innerHTML = `
        <p>Your QR Code:</p>
        <img src="${data.image}" alt="QR Code"/>
        <br/>
        <a href="${data.image}" download="qreator_qr.png">📥 Download PNG</a>
      `;
    }
  }
  