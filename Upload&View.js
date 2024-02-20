import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { getDocument } from 'pdfjs-dist/webpack';
import Image from './logo.png';
import Image2 from './logo2.png';
import Image3 from './logo3.jpg';
import Image4 from './logo4.jpg';

// ... (imports)

const MergedComponent = () => {
  //////// Function for invitation ///////////
  const doc = new jsPDF();
  const generateCenteredText = (doc,text,fontsize,y,font,style,color)=>{
    doc.setFontSize(fontsize);
    const textwidth = (doc.getStringUnitWidth(text) * doc.internal.getFontSize())/2.83465;
    const textcenter = (doc.internal.pageSize.width-textwidth)/2;
    doc.setFont(font,style);
    doc.setTextColor(color[0],color[1],color[2]);
    doc.text(text,textcenter,y);
  }
  const [id, setId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleGenerateAndDownload = async () => {
    try {
      // Convert PDF to images
      const res = await axios.get(`http://localhost:3100/data/${id}`);
      const data = res.data;
      const picture1 = `/Images/${data.event_photo_1}.jpeg`;
      const picture2 = `/Images/${data.event_photo_2}.jpeg`;

      const fileReader = new FileReader();
      const imageData = await new Promise((resolve) => {
        fileReader.onload = (event) => resolve(new Uint8Array(event.target.result));
        fileReader.readAsArrayBuffer(selectedFile);
      });

      const pdfDocument = await getDocument({ data: imageData }).promise;
      
      const newPdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
      });

      // Add content from jsPDF
      newPdf.addImage(Image, 'PNG', 10, 3, 20, 20);
      newPdf.addImage(Image2, 'PNG', 12,23, 15, 15);
      newPdf.addImage(Image3, 'JPG', 175, 3, 20, 15);
      newPdf.addImage(Image4, 'JPG', 175, 20, 20, 15);
      
      newPdf.setFontSize(18);
      newPdf.setFont("times", "bold");
      newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
      newPdf.setFontSize(10);
      newPdf.setFont("times", "");
      newPdf.text('(An Autonomous Institution)', 80, 20);
      newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
      newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
      // newPdf.rect(10,40,20,7);
      // newPdf.text('hello',15,45);
      newPdf.setFontSize(12);
      newPdf.setFont("times", "bold");
      newPdf.rect(10, 40, 20, 7);
      newPdf.text(`${data.event_organizer}`, 15, 45);//Department
      newPdf.rect(70, 40, 65, 7);
      newPdf.text('EVENT COMPLETION REPORT', 71  , 45);

newPdf.rect(170, 40, 30, 7);
newPdf.text(`   ${data.acdyr_id}`, 173, 45);//Academic year

newPdf.setFont("times","")
newPdf.setFontSize(10);
newPdf.rect(10, 55, 10, 15).stroke();
newPdf.text('1.', 12, 65);
newPdf.rect(20, 55, 90, 15).stroke();
newPdf.text('Nature of the Event:\nConference/Technical Symposium/Workshop/\nSeminar/Guest/Lecture/FDP/Any other',22, 61);
newPdf.rect(110, 55, 90, 15).stroke();
newPdf.text(`${data.event_name}`, 113, 65);///Nature of the Event 
newPdf.setFontSize(11);


newPdf.rect(10, 70, 10, 10).stroke();
newPdf.text('2.', 12, 78);
newPdf.rect(20, 70, 90, 10).stroke();
newPdf.text('Title of the event',22, 78);
newPdf.rect(110, 70, 90, 10).stroke();

const event_title = `${data.event_title}`; 
const title = newPdf.splitTextToSize(event_title, 80);
newPdf.text(title, 113, 74);///Title of the Event


newPdf.rect(10, 80, 10, 10).stroke();
newPdf.text('3.', 12, 88);
newPdf.rect(20, 80, 90, 10).stroke();
newPdf.text('Organized by',22, 88);
newPdf.rect(110, 80, 90, 10).stroke();
newPdf.text(`${data.event_organizer}`, 113, 88);//Event Organizer



newPdf.rect(10, 90, 10, 10).stroke();
newPdf.text('4.', 12, 98);
newPdf.rect(20, 90, 90, 10).stroke();
newPdf.text('Collaboration/Sponsoring Agency',22, 98);
newPdf.rect(110, 90, 90, 10).stroke();
newPdf.text(`${data.event_sponsor}`, 113, 98);///Event Sponsor


newPdf.rect(10, 100, 10, 10).stroke();
newPdf.text('5.', 12, 108);
newPdf.rect(20, 100, 90, 10).stroke();
newPdf.text('Date of the Event Planned',22, 108);
newPdf.rect(110, 100, 90, 10).stroke();
newPdf.text(`${data.event_date}`, 113, 108);////Date of the Event 

newPdf.rect(10, 110, 10, 10).stroke();
newPdf.text('6.', 12, 118);
newPdf.rect(20, 110, 90, 10).stroke();
newPdf.text('Venue',22, 118);
newPdf.rect(110, 110, 90, 10).stroke();
newPdf.text(`${data.event_venue}`, 113, 118);//////Event Venue


newPdf.rect(10, 120, 10, 50).stroke();
newPdf.text('7.', 12, 145);
newPdf.rect(20, 120, 90, 50).stroke();
newPdf.text('Details of the Guest',22, 145);

newPdf.rect(110, 120, 23, 10).stroke();
newPdf.text('Name', 111, 128);
newPdf.rect(133, 120,67, 10).stroke();
newPdf.text(`${data.guest_name}`, 135, 128);//Name of the Guest
newPdf.rect(110, 130, 23, 10).stroke();
newPdf.text('Designation', 111, 138);
newPdf.rect(133, 130,67, 10).stroke();
newPdf.text(`${data.guest_designation}`, 135, 138);//////Designation
newPdf.rect(110, 140, 23, 10).stroke();

newPdf.text('Address', 111, 148);

//////////////////////////////////text//////////////////////////////
const x = 133;
let y = 140;
const address = `${data.guest_address}`;
const contentWidth = newPdf.getStringUnitWidth(address) * 12; // Initial font size: 12
const contentHeight = newPdf.getTextDimensions(address, { fontSize: 12 }).h;

// Determine font size to fit within specified dimensions
const maxWidth = 100; // Adjust based on your requirements
const maxHeight = 100; // Adjust based on your requirements
const fontSize = Math.min(12, (maxWidth / contentWidth) * 35, (maxHeight / contentHeight) * 35);
 // Adjust the width as needed
// Set font size and add text to the PDF
newPdf.setFontSize(fontSize);

console.log(contentHeight);

const textLines = newPdf.splitTextToSize(address, 60);
newPdf.rect(x , y , maxWidth-33  , maxHeight - 90);
newPdf.text(x+2, y+5, textLines);
// newPdf.rect(133, 140,67, 10).stroke();
// newPdf.text(textLines,135, 145);/////Address
newPdf.setFontSize(12);
newPdf.rect(110, 150, 23, 10).stroke();
newPdf.text('Contact No', 111, 158);
newPdf.rect(133, 150,67, 10).stroke();
newPdf.text(`${data.guest_mobile_number}`, 135, 158);
newPdf.rect(110, 160, 23, 10).stroke();
newPdf.text('Mail-id', 111, 168);
newPdf.rect(133, 160,67, 10).stroke();
newPdf.text(`${data.guest_email}`, 135, 168);

newPdf.rect(10, 170, 10, 21).stroke();
newPdf.text('8.', 12, 180);
newPdf.rect(20, 170, 90, 21).stroke();
newPdf.text('Total Participants expected',22, 180);

newPdf.setFontSize(10);
newPdf.rect(110, 170, 23, 7).stroke();
newPdf.text('MEC Students', 110.5, 175);
newPdf.rect(133, 170,67, 7).stroke();
newPdf.text(`${data.student_count}`, 135, 175);

newPdf.rect(110, 177, 23, 7).stroke();
newPdf.text('MEC Faculty', 110.5, 182);
newPdf.rect(133, 177,67, 7).stroke();
newPdf.text(`${data.faculty_count}`, 135, 182);

newPdf.rect(110, 184, 23, 7).stroke();
newPdf.text('Others', 110.5, 189);
newPdf.rect(133, 184,67, 7).stroke();
newPdf.text(`${data.others_count}`, 135, 189);

newPdf.setFontSize(11);
newPdf.rect(10, 191, 10, 10).stroke();
newPdf.text('9.', 12, 200);
newPdf.rect(20, 191, 90, 10).stroke();
newPdf.text('Proposed Budget\n (Attach Details in Annexure)',22, 195 );
newPdf.rect(110, 191, 90, 10).stroke();
newPdf.text(`${data.event_budget}`, 113, 199);////Event Budget

newPdf.rect(10, 201, 100, 50).stroke();
newPdf.addImage(picture1,"JPEG",12,205,85,45);
newPdf.rect(110, 201, 90, 50).stroke();
newPdf.addImage(picture2,"JPEG",112,205,85,45);

newPdf.rect(10, 251, 190, 7).stroke();
newPdf.text('POs and PSOs Mapping',90,255)


newPdf.rect(10, 258, 12, 9).stroke();
newPdf.text('PO1',13,264);
newPdf.rect(22, 258, 12, 9).stroke();
newPdf.text('PO2',25,264);
newPdf.rect(34, 258, 12, 9).stroke();
newPdf.text('PO3',37,264);
newPdf.rect(46, 258, 12, 9).stroke();
newPdf.text('PO4',49,264);
newPdf.rect(58, 258, 12, 9).stroke();
newPdf.text('PO5',61,264);
newPdf.rect(70, 258, 12, 9).stroke();
newPdf.text('PO6',73,264);
newPdf.rect(82, 258, 12, 9).stroke();
newPdf.text('PO7',85,264);
newPdf.rect(94, 258, 12, 9).stroke();
newPdf.text('PO8',97,264);
newPdf.rect(106, 258, 12, 9).stroke()
newPdf.text('PO9',109,264);
newPdf.rect(118, 258, 12, 9).stroke()
newPdf.text('PO10',120,264);
newPdf.rect(130, 258, 12, 9).stroke()
newPdf.text('PO11',132,264);
newPdf.rect(142, 258, 12, 9).stroke()
newPdf.text('PO12',144,264);
newPdf.rect(154, 258, 15, 9).stroke()
newPdf.text('PSO1',156,264);
newPdf.rect(169, 258, 15, 9).stroke()
newPdf.text('PSO2',171,264);
newPdf.rect(184, 258, 16, 9).stroke()
newPdf.text('PSO3',186,264);

newPdf.rect(10,267,12,9).stroke();
newPdf.text('',13,273);
newPdf.rect(22, 267, 12, 9).stroke();
newPdf.text('',25,273);
newPdf.rect(34, 267, 12, 9).stroke();
newPdf.text('',37,273);
newPdf.rect(46, 267, 12, 9).stroke();
newPdf.text('',49,273);
newPdf.rect(58, 267, 12, 9).stroke();
newPdf.text('',61,273);
newPdf.rect(70, 267, 12, 9).stroke();
newPdf.text('',73,273);
newPdf.rect(82, 267, 12, 9).stroke();
newPdf.text('',85,273);
newPdf.rect(94, 267, 12, 9).stroke();
newPdf.text('',97,273);
newPdf.rect(106, 267, 12, 9).stroke();
newPdf.text('',109,273);
newPdf.rect(118, 267, 12, 9).stroke();
newPdf.text('',120,273);
newPdf.rect(130, 267, 12, 9).stroke();
newPdf.text('',132,273);
newPdf.rect(142, 267, 12, 9).stroke();
newPdf.text('',144,273);
newPdf.rect(154, 267, 15, 9).stroke();
newPdf.text('',156,273);
newPdf.rect(169, 267, 15, 9).stroke();
newPdf.text('',171,273);
newPdf.rect(184, 267, 16, 9).stroke();
newPdf.text('',186,273);


newPdf.setFont("times");
newPdf.setFontSize(8);

// newPdf.text('* Attach enclosures', 15, 280);
newPdf.setFont("times","bold");
newPdf.setFontSize(11);
newPdf.text('HoD', 100, 295);
newPdf.text('Event Coordinator(s)', 10, 295);
newPdf.text('Principal', 170, 295);