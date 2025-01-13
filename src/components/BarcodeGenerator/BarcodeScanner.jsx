import React, { useState, useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const BarcodeScanner = () => {
  const [barcodeInput, setBarcodeInput] = useState(""); // For manual barcode generation
  const barcodeCanvasRef = useRef(null);


  // Generate barcode using jsbarcode
  useEffect(() => {
    if (barcodeInput && barcodeCanvasRef.current) {
      JsBarcode(barcodeCanvasRef.current, barcodeInput, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true,
      });
    }
  }, [barcodeInput]);

  // Download Barcode as Image
  const downloadBarcode = () => {
    if (barcodeCanvasRef.current) {
      const canvas = barcodeCanvasRef.current;
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${barcodeInput || "barcode"}.png`;
      link.click();
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Barcode Generator</h2>

      {/* Barcode Generator Section */}
      <div>
        <h3>Generate Barcode</h3>
        <input
          type="text"
          value={barcodeInput}
          placeholder="Enter text or number"
          onChange={(e) => setBarcodeInput(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />
        <div style={{ marginTop: "20px" }}>
          <canvas ref={barcodeCanvasRef} style={{ border: "1px solid #ddd" }}></canvas>
        </div>
        <button
          onClick={downloadBarcode}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#28A745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Download Barcode
        </button>
      </div>
    </div>
  );
};

export default BarcodeScanner;
