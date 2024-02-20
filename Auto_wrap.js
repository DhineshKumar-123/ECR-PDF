import React, { useState } from 'react';
import jsPDF from 'jspdf';

function PDFGenerator() {
  const [inputText, setInputText] = useState('');

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.ellipse(12,20,85,78);
    // Generate a data URI for the PDF
    const pdfDataUri = doc.output('datauristring');

    // Open the PDF in a new tab or window
    const newWindow = window.open();
    newWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
  };

  return (
    <div>
      <label>
        Input Text:
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      </label>
      <button onClick={generatePDF}>View PDF</button>
    </div>
  );
}

export default PDFGenerator;
