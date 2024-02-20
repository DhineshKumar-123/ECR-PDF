// PdfGenerator.js
import React from 'react';
import jsPDF from 'jspdf';
import Image from './logo.png';
import Image2 from './logo2.png';
const PdfGenerator = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage(Image, 'PNG', 10, 7, 25, 25);
    doc.addImage(Image2, 'PNG', 173, 7, 25, 25);
    doc.setFontSize(18);
    doc.setFont("times", "bold");
    doc.setTextColor(0, 32, 96);
    doc.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
    doc.setFontSize(10);
    doc.setFont("times", "");
    doc.text('(An Autonomous Institution)', 80, 20);
    doc.setTextColor(0,0,0);
    doc.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
    doc.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
    // Use a monospaced font
    doc.setFont('times', 'bold');
    // Set font size
    doc.setFontSize(13);
    doc.setTextColor(254,0,102);
    const dept = ' Department of Electrical and Electronics Engineering';
    const deptwidth = (doc.getStringUnitWidth(dept) * doc.internal.getFontSize())/2.83465;
    const deptcenter = (doc.internal.pageSize.width-deptwidth)/2;
    doc.text(dept,deptcenter,50);
    doc.setTextColor(0,0,0);
    doc.text('in association with',85,57);
    doc.setFont('times', 'bold');
    // Set font size
    doc.setFontSize(13);
    const sponsor = ' COMPUTER SOCIETY OF INDIA';
    const sponwidth = (doc.getStringUnitWidth(sponsor) * doc.internal.getFontSize())/2.83465;
    const sponcenter = (doc.internal.pageSize.width-sponwidth)/2;
    doc.text(sponsor,sponcenter,64);
    // Your text content
    // const text = 'Hello, this is centered text! what is the name of the text ';
    doc.setFont("times", "italic");
    doc.setTextColor(0, 0, 128);
    doc.text('The Management, Principal, Faculty and Students Cardially Invite you to the',38,74);
    //////////////////// Event Name  ///////////////////////
    doc.setFont('times','bold');
    doc.setFontSize(16);
    const evname = ' Workshop';
    const evnamewidth = (doc.getStringUnitWidth(evname) * doc.internal.getFontSize())/2.83465;
    const evnamecenter = (doc.internal.pageSize.width-evnamewidth)/2;
    doc.setTextColor(150,6,6);
    doc.text('Resource Person',89,110);
    doc.text(evname,evnamecenter,84);
    doc.setTextColor(202, 37, 197);
    doc.text ('on',100,90);
  ///////////////////////////////// Event Title///////////////
  doc.setFont('times','bold');
  doc.setFontSize(17);
  const evtitle = 'Soft Computing';
    const evtitlewidth = (doc.getStringUnitWidth(evtitle) * doc.internal.getFontSize())/2.83465;
    const evtitlecenter = (doc.internal.pageSize.width-evtitlewidth)/2;
   doc.setTextColor(202, 37, 197);
    doc.text(evtitle,evtitlecenter,100);
///////////////////////////////// Resource Person ///////////////
doc.setFont('times','bold');
doc.setFontSize(17);
const reso_name = 'M. Vijayaprakash';
  const reso_namewidth = (doc.getStringUnitWidth(reso_name) * doc.internal.getFontSize())/2.83465;
  const reso_namecenter = (doc.internal.pageSize.width-reso_namewidth)/2;
  doc.setTextColor(0, 32, 96);
  doc.text(reso_name,reso_namecenter,117);
  doc.setFontSize(12);
  doc.setFont('times','bolditalic')
  doc.setTextColor(0, 102, 0);
  doc.text('Student',98,125);////Designation
  //////////////////////////////// Secretary ///////////////////////





    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Calculate center position
    // const textWidth = (doc.getStringUnitWidth(text) * doc.internal.getFontSize())/2.83465;
    // const centerX = (doc.internal.pageSize.width - textWidth) / 2;

    // Add text to the center
    // doc.text(text, centerX, 10);

    // Save the PDF
    const pdfDataUri = doc.output('datauristring');

    // Open the PDF in a new tab or window
    const newWindow = window.open();
    newWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
  
  }
  return (
    <div>
      <h1>PDF Generator</h1>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PdfGenerator;



