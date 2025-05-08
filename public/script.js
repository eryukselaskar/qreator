async function generateQR() {
    const url = document.getElementById("urlInput").value;
    if (!url) return alert("Please enter a URL");
  
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  
    const data = await res.json();
  
    if (data.image) {
      document.getElementById("result").innerHTML = `
        <p>Scan or save your QR code:</p>
        <img src="${data.image}" alt="QR Code"/>
        <br/>
        <a href="${data.image}" download="qreator_qr.png">📥 Download</a>
      `;
    } else {
      alert("Failed to generate QR.");
    }
  }
  