async function generateQR() {
    const url = document.getElementById("urlInput").value;
    if (!url) return alert("Please enter a URL");
  
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  
    const svg = await res.text(); // SVG metin olarak gelir!
  
    document.getElementById("result").innerHTML = `
      <p>Your QR Code:</p>
      <div id="qrSvg">${svg}</div>
      <a href="data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}"
         download="qreator_qr.svg">📥 Download SVG</a>
    `;
  }
  