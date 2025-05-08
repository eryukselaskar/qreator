async function generateQR() {
    const url = document.getElementById("urlInput")?.value.trim();
    const format = document.getElementById("format")?.value || "svg";
    const fgColor = document.getElementById("fgColor")?.value || "#000000";
    const bgColor = document.getElementById("bgColor")?.value || "#ffffff";
  
    if (!url) return alert("Please enter a URL.");
  
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, format, fgColor, bgColor }),
    });
  
    const result = document.getElementById("result");
  
    if (format === 'svg') {
      const svg = await res.text();
      result.innerHTML = `
        <p>Your QR Code:</p>
        <div id="qrSvg">${svg}</div>
        <a href="data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}"
           download="qreator_qr.svg">📥 Download SVG</a>
      `;
    } else {
      const data = await res.json();
      result.innerHTML = `
        <p>Your QR Code:</p>
        <img src="${data.image}" alt="QR Code"/>
        <br/>
        <a href="${data.image}" download="qreator_qr.png">📥 Download PNG</a>
      `;
    }
  }
  