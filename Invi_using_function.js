// PdfGenerator.js
import React from 'react';
import jsPDF from 'jspdf';
import Image from './logo.png';
import Image2 from './logo2.png';
const PdfGenerator = () => {
  const doc = new jsPDF();
  const generateCenteredText = (doc,text,fontsize,y,font,style,color)=>{
    doc.setFontSize(fontsize);
    const textwidth = (doc.getStringUnitWidth(text) * doc.internal.getFontSize())/2.83465;
    const textcenter = (doc.internal.pageSize.width-textwidth)/2;
    doc.setFont(font,style);
    doc.setTextColor(color[0],color[1],color[2]);
    doc.text(text,textcenter,y);
  }
  const generatePDF = () => {
    const doc = new jsPDF();
    ///// Example (doc,'text','fontsize','y-axis','font-type','font-style','[r,g,b]');///////////
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
    generateCenteredText(doc,'Department of Electrical and Communication Engineering',15,45,'times','bold',[254,0,102]);
    generateCenteredText(doc,'in Association with',12,50,'times','bolditalic',[151, 92, 203]);
    generateCenteredText(doc,'Computer Society of India(CSI)',15,55,'times','bold',[151, 92, 203]);
    generateCenteredText(doc,'The Management, Principal, Faculty and Students Cardially Invite you to the',14,65,'times','bolditalic',[0, 0, 255]);
    generateCenteredText(doc,'Workshop',16,75,'times','bold',[150, 6, 6]);
    generateCenteredText(doc,'On',14,80,'times','regular',[202, 37, 197]);
    generateCenteredText(doc,'All India Council for Technical Education - Soft Computing',17,85,'times','bold',[202, 37, 197]);
    generateCenteredText(doc,'Resource Person',16,95,'times','bold',[150,6,6]);
    generateCenteredText(doc,'M.Vijayaprakash',17,105,'times','bold',[0, 0, 153]);
    generateCenteredText(doc,'Student',15,112,'times','bolditalic',[0, 102, 0]);
    generateCenteredText(doc,'Dr.K.Gunasekaran',17,125,'times','bold',[0, 0, 153]);/////Secretary
    generateCenteredText(doc,'Secretary & Managing Trustee ',15,132,'times','bolditalic',[0, 102, 0]);
    generateCenteredText(doc,'Muthayammal Educational Trust and Research Foundation ',15,138,'times','bolditalic',[0, 102, 0]);
    generateCenteredText(doc,'will preside over the function',15,144,'times','bolditalic',[0, 102, 0]);
    generateCenteredText(doc,'Dr.M. Madheshwaran',17,157,'times','bold',[0, 0, 153]);/////Principal
    generateCenteredText(doc,'Principal',15,164,'times','bolditalic',[0, 102, 0]);
    generateCenteredText(doc,'Muthayammal Engineering College',15,170,'times','bolditalic',[0, 102, 0]);
    generateCenteredText(doc,'will feliciate the function',15,176,'times','bolditalic',[0, 102, 0]);
    generateCenteredText(doc,'Dr.G. Kavitha',17,190,'times','bold',[0, 0, 153]);/////HOD
    generateCenteredText(doc,'HoD-CSE',15,197,'times','bolditalic',[0, 102, 0]);
    generateCenteredText(doc,'Will Welcome The Gathering',15,203,'times','bolditalic',[0, 102, 0]);
    generateCenteredText(doc,'Time: 10:00 AM to 4:30 PM',12,220,'times','bolditalic',[180, 0, 0]);//////Time of the Event
    doc.setFont('times','bolditalic');
    doc.setFontSize(12);
    doc.setTextColor(180, 0, 0);
    doc.text('Date:',15,220);
    doc.text('2023-09-12',30,220);////// Date of the Event
    doc.text('Venue:',150,220);////////Venue
    const venue = 'Seminar Hall I';
    const venueline = doc.splitTextToSize(venue, 50);//////////////Venue Variable store
    doc.text(165,220,venueline);
    //////////////// Last Left Green wordings /////
    doc.setFont('times','bolditalic');
    doc.setFontSize(14);
    doc.setTextColor(0,102,0);
    doc.text('Dr. G.Kavitha, Professor & Head',15,245);
    doc.text('Dr. G.Kavitha',15,250);
    doc.text('Co-Ordinator',15,255);
    


    //////////////////////////////// Save or View the PDF  //////////////////////////
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



