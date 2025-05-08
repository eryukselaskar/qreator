// public/script.js
async function generateQR() {
    const url = document.getElementById("urlInput").value;
    if (!url) return alert("Lütfen bir URL girin!");
  
    const res = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  
    const data = await res.json();
  
    if (data.downloadUrl) {
      document.getElementById("result").innerHTML = `
        <p>İndir veya tarat:</p>
        <img src="${data.downloadUrl}" alt="QR Code"/>
        <br/>
        <a href="${data.downloadUrl}" download="qreator_qr.png">📥 İndir</a>
      `;
    } else {
      alert("QR kod oluşturulamadı.");
    }
  }
  