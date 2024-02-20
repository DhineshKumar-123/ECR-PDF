import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { getDocument } from 'pdfjs-dist/webpack';
import Image from './logo.png';
import Image2 from './logo2.png';
import Image3 from './logo3.jpg';
import Image4 from './logo4.jpg';

const MergedComponent = () => {
  const [id, setId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  const handleGenerateAndDownload = async () => {
    try {
      // Fetch PDF name from the database based on id
      const res = await axios.get(`http://localhost:3100/data/${id}`);
    
      const data = res.data;
      const picture1 = `/Images/${data.event_photo_1}.jpeg`;
      const picture2 = `/Images/${data.event_photo_2}.jpeg`;
      const pdfName = data.pdf_name; // Replace 'pdf_name' with the actual field name from your database

      // Fetch the PDF from the public folder
      //   const picture2 = `/Images/${data.event_photo_2}.jpeg`;
      const pdfUrl = `/StorePdf/${data.pdf}.pdf`;
      const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });

      const pdfData = pdfResponse.data;

      const pdfDocument = await getDocument({ data: pdfData }).promise;

      const newPdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
      });

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
const fontSize = Math.min(12, (maxWidth / contentWidth) * 30, (maxHeight / contentHeight) * 30);
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

////////////////////////////////////// ECR ENCLOSURE /////////////////////////////////////


newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 7, 25, 25);
newPdf.setFontSize(18);
newPdf.setFont("times", "bold");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
newPdf.setFontSize(10);
newPdf.setFont("times", "");
newPdf.text('(An Autonomous Institution)', 80, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);

 
newPdf.setFontSize(13);
newPdf.setFont('times', 'bold');
newPdf.text("ECR-Enclosures", 90, 40);
newPdf.text("Name of the Event:", 10, 50);
newPdf.setFont('times', '');
newPdf.text(`${data.event_name}`, 50, 50); //name of the event
newPdf.setFont('times', 'bold');
newPdf.text("Date of the Event Conducted:", 10, 57);
newPdf.setFont('times', '');
newPdf.text(`${data.event_date}`, 70, 57); //Date

newPdf.rect(10, 65, 10, 10).stroke();
newPdf.text('S.no', 11, 71);
newPdf.rect(20, 65, 90, 10).stroke();
newPdf.text('Description', 50, 71);
newPdf.rect(110, 65, 90, 10).stroke();
newPdf.text('Please tick Enclosure', 140, 71);

newPdf.setFont('times', '');
newPdf.rect(10, 75, 10, 10).stroke();
newPdf.text('1.', 13, 81);
newPdf.rect(20, 75, 90, 10).stroke();
newPdf.text('Event Proposal (EP)', 22, 81);
newPdf.rect(110, 75, 90, 10).stroke();
newPdf.text('', 155, 81);

newPdf.rect(10, 85, 10, 10).stroke();
newPdf.text('2.', 13, 91);
newPdf.rect(20, 85, 90, 10).stroke();
newPdf.text('Budget Proposed', 22, 91);
newPdf.rect(110, 85, 90, 10).stroke();
newPdf.text('', 155, 91);

newPdf.rect(10, 95, 10, 10).stroke();
newPdf.text('3.', 13, 101);
newPdf.rect(20, 95, 90, 10).stroke();
newPdf.text('Event Planner', 22, 101);
newPdf.rect(110, 95, 90, 10).stroke();
newPdf.text('', 155, 101);

newPdf.rect(10, 105, 10, 10).stroke();
newPdf.text('4.', 13, 111);
newPdf.rect(20, 105, 90, 10).stroke();
newPdf.text('Resource Person Invitation & Thanks letter', 22, 111);
newPdf.rect(110, 105, 90, 10).stroke();
newPdf.text('', 155, 111);

newPdf.rect(10, 115, 10, 10).stroke();
newPdf.text('5.', 13, 121);
newPdf.rect(20, 115, 90, 10).stroke();
newPdf.text('Acceptance Letter from Resource Person', 22, 121);
newPdf.rect(110, 115, 90, 10).stroke();
newPdf.text('', 155, 121);

newPdf.rect(10, 125, 10, 10).stroke();
newPdf.text('6.', 13, 131);
newPdf.rect(20, 125, 90, 10).stroke();
newPdf.text('Resource Person\'s Profile', 22, 131);
newPdf.rect(110, 125, 90, 10).stroke();
newPdf.text('', 155, 131);

newPdf.rect(10, 135, 10, 10).stroke();
newPdf.text('7.', 13, 141);
newPdf.rect(20, 135, 90, 10).stroke();
newPdf.text('Invitation', 22, 141);
newPdf.rect(110, 135, 90, 10).stroke();
newPdf.text('', 155, 141);

newPdf.rect(10, 145, 10, 10).stroke();
newPdf.text('8.', 13, 151);
newPdf.rect(20, 145, 90, 10).stroke();
newPdf.text('Agenda', 22, 151);
newPdf.rect(110, 145, 90, 10).stroke();
newPdf.text('', 155, 151);

newPdf.rect(10, 155, 10, 10).stroke();
newPdf.text('9.', 13, 161);
newPdf.rect(20, 155, 90, 10).stroke();
newPdf.text('Handouts of the Talk', 22, 161);
newPdf.rect(110, 155, 90, 10).stroke();
newPdf.text('', 155, 161);


newPdf.rect(10, 165, 10, 10).stroke();
newPdf.text('10.', 13, 171);
newPdf.rect(20, 165, 90, 10).stroke();
newPdf.text('Participants Attendance', 22, 171);
newPdf.rect(110, 165, 90, 10).stroke();
newPdf.text('', 155, 171);

newPdf.rect(10, 175, 10, 10).stroke();
newPdf.text('11.', 13, 181);
newPdf.rect(20, 175, 90, 10).stroke();
newPdf.text('Resource Person\'s Feedback', 22, 181);
newPdf.rect(110, 175, 90, 10).stroke();
newPdf.text('', 155, 181);

newPdf.rect(10, 185, 10, 10).stroke();
newPdf.text('12.', 13, 191);
newPdf.rect(20, 185, 90, 10).stroke();
newPdf.text('Participants Feedback', 22, 191);
newPdf.rect(110, 185, 90, 10).stroke();
newPdf.text('', 155, 191);

newPdf.rect(10, 195, 10, 10).stroke();
newPdf.text('13.', 13, 201);
newPdf.rect(20, 195, 90, 10).stroke();
newPdf.text('Event Photos', 22, 201);
newPdf.rect(110, 195, 90, 10).stroke();
newPdf.text('', 155, 201);

newPdf.rect(10, 205, 10, 10).stroke();
newPdf.text('14.', 13, 211);
newPdf.rect(20, 205, 90, 10).stroke();
newPdf.text('Budget Utilization', 22, 211);
newPdf.rect(110, 205, 90, 10).stroke();
newPdf.text('', 155, 211);

newPdf.rect(10, 215, 10, 10).stroke();
newPdf.text('15.', 13, 221);
newPdf.rect(20, 215, 90, 10).stroke();
newPdf.text('News published in Papers', 22,221);
newPdf.rect(110, 215, 90, 10).stroke();
newPdf.text('', 155, 221);

newPdf.rect(10, 225, 10, 10).stroke();
newPdf.text('16.', 13, 231);
newPdf.rect(20, 225, 90, 10).stroke();
newPdf.text('News published in College Website)', 22, 231);
newPdf.rect(110, 225, 90, 10).stroke();
newPdf.text('', 155, 231);

newPdf.rect(10, 235, 10, 10).stroke();
newPdf.text('17.', 13, 241);
newPdf.rect(20, 235, 90, 10).stroke();
newPdf.text('One PPT slide about the program', 22, 241);
newPdf.rect(110, 235, 90, 10).stroke();
newPdf.text('', 155, 241);

newPdf.setFont('times', 'bold');
newPdf.text('Event Coordinator', 20, 267);
newPdf.text('HoD', 160, 267);
///////////////////////////////////////////Event Proposal //////////////////////////////
newPdf.addPage();
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


newPdf.setFontSize(12);
newPdf.setFont("times", "bold");
newPdf.rect(10, 40, 20, 7);
newPdf.text(`${data.event_organizer}`, 15, 45);///Department

newPdf.rect(80, 40, 50, 7);
newPdf.text('EVENT PROPOSAL', 85, 45);

newPdf.rect(170, 40, 30, 7);
newPdf.text(`${data.acdyr_id}`, 173, 45);//academic year

newPdf.setFont("times","")
newPdf.rect(10, 55, 10, 20).stroke();
newPdf.text('1.', 12, 65);
newPdf.rect(20, 55, 90, 20).stroke();
newPdf.text('Nature of the Event:\nConference/Technical Symposium/Workshop/\nSeminar/Guest/Lecture/FDP/Any other',22, 61);
newPdf.rect(110, 55, 90, 20).stroke();
newPdf.text(`${data.event_name}`, 113, 65);//Nature of the Event

newPdf.rect(10, 75, 10, 10).stroke();
newPdf.text('2.', 12, 81);
newPdf.rect(20, 75, 90, 10).stroke();
newPdf.text('Title of the event',22, 81);
// newPdf.rect(110, 75, 90, 10).stroke();
// newPdf.text(`${data.event_title}`, 113, 81);//Event Title
const X = 110;
let Y = 75;

const contentWidth1 = newPdf.getStringUnitWidth(event_title) * 12; // Initial font size: 12
const contentHeight1 = newPdf.getTextDimensions(event_title, { fontSize: 12 }).h;

// Determine font size to fit within specified dimensions
const maxWidth1 = 100; // Adjust based on your requirements
const maxHeight1 = 100; // Adjust based on your requirements
const fontSize1 = Math.min(12, (maxWidth1 / contentWidth1) * 30, (maxHeight1 / contentHeight1) * 30);
 // Adjust the width as needed
// Set font size and add text to the PDF
newPdf.setFontSize(fontSize1);

console.log(contentHeight);

const textLines1 = newPdf.splitTextToSize(event_title, 80);
newPdf.rect(X , Y , maxWidth1-10  , maxHeight1 - 90);
newPdf.text(X+2, Y+5, textLines1);


newPdf.setFontSize(12);
newPdf.rect(10, 85, 10, 10).stroke();
newPdf.text('3.', 12, 91);
newPdf.rect(20, 85, 90, 10).stroke();
newPdf.text('Organized by',22, 91);
newPdf.rect(110, 85, 90, 10).stroke();
newPdf.text(`${data.event_organizer}`, 113, 91);//Event Organizer



newPdf.rect(10, 95, 10, 10).stroke();
newPdf.text('4.', 12, 101);
newPdf.rect(20, 95, 90, 10).stroke();
newPdf.text('Collaboration/Sponsoring Agency',22, 101);
newPdf.rect(110, 95, 90, 10).stroke();
newPdf.text(`${data.event_sponsor}`, 113, 101);//Sponsor Name


newPdf.rect(10, 105, 10, 10).stroke();
newPdf.text('5.', 12, 111);
newPdf.rect(20, 105, 90, 10).stroke();
newPdf.text('Date of the Event Planned',22, 111);
newPdf.rect(110, 105, 90, 10).stroke();
newPdf.text(`${data.proposal_date}`, 113, 111);//Event Date

newPdf.rect(10, 115, 10, 10).stroke();
newPdf.text('6.', 12, 121);
newPdf.rect(20, 115, 90, 10).stroke();
newPdf.text('Venue',22, 121);
newPdf.rect(110, 115, 90, 10).stroke();
newPdf.text(`${data.event_venue}`, 113, 121);


newPdf.rect(10, 125, 10, 50).stroke();
newPdf.text('7.', 12, 141);
newPdf.rect(20, 125, 90, 50).stroke();
newPdf.text('Details of the Guest',22, 141);

newPdf.rect(110, 125, 23, 10).stroke();
newPdf.text('Name', 111, 131);
newPdf.rect(133, 125,67, 10).stroke();
newPdf.text(`${data.guest_name}`, 135, 131);///Name of the Guest 
newPdf.rect(110, 135, 23, 10).stroke();
newPdf.text('Designation', 111, 141);
newPdf.rect(133, 135,67, 10).stroke();
newPdf.text(`${data.guest_designation }`, 135, 141);///Guest Designation
newPdf.rect(110, 145, 23, 10).stroke();
newPdf.text('Address', 111, 151);
newPdf.rect(133, 145,67, 10).stroke();
newPdf.text(textLines, 135, 149);//Guest Address
newPdf.rect(110, 155, 23, 10).stroke();
newPdf.text('Contact No', 111, 161);
newPdf.rect(133, 155,67, 10).stroke();
newPdf.text(`${data.guest_mobile_number}`, 135, 161);//Contact no
newPdf.rect(110, 165, 23, 10).stroke();
newPdf.text('Mail-id', 111, 171);
newPdf.rect(133, 165,67, 10).stroke();
newPdf.text(`${data.guest_email}`, 135, 171);/////Guest Mail id

newPdf.rect(10, 175, 10, 30).stroke();
newPdf.text('8.', 12, 190);
newPdf.rect(20, 175, 90, 30).stroke();
newPdf.text('Total Participants expected',22, 190);

newPdf.rect(110, 175, 23, 10).stroke();
newPdf.text('MEC\nStudents', 110.5, 179);
newPdf.rect(133, 175,67, 10).stroke();
newPdf.text(`${data.student_count}`, 135, 181);//Count of the Student

newPdf.rect(110, 185, 23, 10).stroke();
newPdf.text('MEC\nFaculty', 110.5, 189);
newPdf.rect(133, 185,67, 10).stroke();
newPdf.text(`${data.faculty_count}`, 135, 191);//COunt of the Faculty

newPdf.rect(110, 195, 23, 10).stroke();
newPdf.text('Others', 110.5, 201);
newPdf.rect(133, 195,67, 10).stroke();
newPdf.text(`${data.others_count}`, 135, 201);//Count of Others

newPdf.rect(10, 205, 10, 10).stroke();
newPdf.text('9.', 12, 211);
newPdf.rect(20, 205, 90, 10).stroke();
newPdf.text('Proposed Budget',22, 211);
newPdf.rect(110, 205, 90, 10).stroke();
newPdf.text(`${data.event_budget}`, 113, 211);//Event Budget



newPdf.rect(10, 215, 10, 10).stroke();
newPdf.text('10.', 12, 220);
newPdf.rect(20, 215, 180, 10).stroke();
newPdf.text('Co-ordinator of the Event',22, 220);

newPdf.rect(10, 225, 70, 5).stroke();
newPdf.text('Name', 35, 229);

newPdf.rect(80, 225, 60, 5).stroke();
newPdf.text('Designation', 100, 229);

newPdf.rect(140, 225, 60, 5).stroke();
newPdf.text('Phone Number', 155, 229);


newPdf.rect(10, 230, 70, 35).stroke();


newPdf.rect(80, 230, 60, 35).stroke();


newPdf.rect(140, 230, 60, 35).stroke();newPdf.setFont("times","bold");

newPdf.text('HoD', 15, 290);

newPdf.text('Principal', 155, 290);

      
     

      // Add pages from the original PDF
      for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
        const page = await pdfDocument.getPage(pageNumber);
        const pdfWidth = page.view[2];
        const pdfHeight = page.view[3];

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = pdfWidth;
        canvas.height = pdfHeight;

        await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 1 }) }).promise;

        const imageDataUrl = canvas.toDataURL('image/jpeg');
        newPdf.addPage();
        newPdf.addImage(imageDataUrl, 'JPEG', 5, 0, 200, 300);
      }
      // newPdf.addPage();
      /////////////////////////////////////////////// BUDGET PROPOSAL //////////////////////////
newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 7, 25, 25);
newPdf.setFontSize(18);
newPdf.setFont("times", "bold");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
newPdf.setFontSize(10);
newPdf.setFont("times", "");
newPdf.text('(An Autonomous Institution)', 80, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
newPdf.setFont("times", "bold");
newPdf.setFontSize(19);
newPdf.text('Budget Proposal', 80, 45);
newPdf.setFontSize(18);
newPdf.text('Date of the Event:', 15, 60);
newPdf.text(`${data.event_date}`,67, 60);
newPdf.setFont("times", ""); 
newPdf.setFontSize(10);
newPdf.text('To the Management through Principle', 15, 70);
newPdf.setFontSize(15);
newPdf.setFont("times", "bold");
newPdf.text('Total Paticipants:', 15, 90);
newPdf.text(`${data.student_count}`, 58, 90);

newPdf.rect(15, 100, 15, 12).stroke();
newPdf.text('S.no', 17, 106);
newPdf.rect(30, 100, 125, 12).stroke();
newPdf.text('Details', 60, 106);
newPdf.rect(155, 100, 45, 12).stroke();
newPdf.text('Cost (in Rs)', 157, 106);
newPdf.setFont("times", "");
newPdf.rect(15, 112, 15, 12).stroke();
newPdf.text('1.', 19, 120);
newPdf.rect(30, 112, 125, 12).stroke();
newPdf.text('Overall Budget', 35, 120);
newPdf.rect(155, 112, 45, 12).stroke();
newPdf.text(`${data.event_budget}`, 157, 120);// budget amount
newPdf.rect(15, 124, 15, 12).stroke();
newPdf.text('', 19, 132);
newPdf.rect(30, 124, 125, 12).stroke();
newPdf.text('Total', 35, 132);
newPdf.rect(155, 124, 45, 12).stroke();
newPdf.text(`${data.event_budget}`, 157, 132);// total budget amount
newPdf.rect(15, 136, 185, 12).stroke();
newPdf.text('In Words:', 19, 144);
newPdf.text(`${data.budget_words}`,45,144);//In words budget
newPdf.setFontSize(12);
newPdf.setFont('times','bold');
newPdf.text('Event Coordinator(s)', 15, 234);
newPdf.text('HOD', 90, 234);
newPdf.text('Principal', 167, 234);


/////////////////////////////////////////////////EventPlanner/////////////////////////////////////////////

newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 7, 25, 25);
newPdf.setFontSize(18);
newPdf.setFont("times", "bold");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
newPdf.setFontSize(10);
newPdf.setFont("times", "");
newPdf.text('(An Autonomous Institution)', 80, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);

newPdf.setFontSize(13);
newPdf.setFont('times', 'bold');
newPdf.text('Event Planner',83,45 );
newPdf.setFontSize(14);
var Dept = `DEPARTMENT OF ${data.event_organizer}`
const textWidth = newPdf.getStringUnitWidth(Dept) ;
var pageWidth = newPdf.internal.pageSize.getWidth();
const centerX = (pageWidth - textWidth) / 2;
// Set text at the calculated center position
// pdf.text(centerX, 50, text);

let roundedValue = Math.round(pageWidth); // Result: 4
console.log(roundedValue);
console.log(textWidth);
console.log(centerX);
// newPdf.text(Dept,centerX,54);//dept full name
newPdf.setFont('times', 'roman');
newPdf.rect(8,58,50,10).stroke();
newPdf.text('Event Date:',10,65);
newPdf.text(`${data.event_date}`,35,65);////Event Date 
newPdf.rect(165,58,30,10);
newPdf.text(`${data.acdyr_id}`,170,65);///Academic Year

 
var plan = '\tThis is to inform the Faculty member that,the following committees have been formed for smooth conductance of '+`${data.event_name}`+' has organize by our Department of '+`${data.event_organizer}`+' and ,the commitee member are requested to carry out their resposibilities to perfection.';
const planner = newPdf.splitTextToSize(plan,150);
newPdf.text(planner,30,75);
newPdf.rect(15,110,15,12).stroke()
newPdf.text('S.NO',17,117)
newPdf.rect(30,110,70,12).stroke();
newPdf.text('Name of the committee',40,117)
newPdf.rect(100,110,60,12).stroke()
newPdf.text('In charge(s)',110,117)
newPdf.rect(160,110,40,12).stroke()
newPdf.text('Remark',170,117)
newPdf.rect(15,122,15,15).stroke()
newPdf.text('1',19,129)
newPdf.rect(30,122,70,15).stroke()
newPdf.text('Organization Secretary',34,130)

newPdf.rect(100,122,60,15).stroke()
newPdf.text(`${data.event_organizing_secretary}`,103,130)//////Event Organization seretary
newPdf.rect(160,122,40,32).stroke()
newPdf.text('',163,130)

newPdf.rect(15,137,15,17).stroke()
newPdf.text('2',19,144)
newPdf.rect(30,137,70,17).stroke()
newPdf.text('permission & Report Preparation \nInvitation Flux Designing',33,143)
newPdf.rect(100,137,60,17).stroke()
newPdf.text(`${data.event_organizing_secretary}`,102,146)////Event Report Preparation

newPdf.setFont('times', 'bold');
newPdf.text('Coordinated',30,220)
newPdf.text('HOD',170,220)


//////////////////////////////////////////////// Invitation ////////////////////////////////////////

newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 7, 25, 25);
newPdf.setFontSize(18);
newPdf.setFont("times", "bold");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
newPdf.setFontSize(10);
newPdf.setFont("times", "");
newPdf.text('(An Autonomous Institution)', 80, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
newPdf.setFontSize(13);
newPdf.setFont("times", "bold");
newPdf.text('Department of Computer Science and Engineering',58,50);
newPdf.setFont("times", "roman");
newPdf.text('in Association with',85,57);
newPdf.text(``,72,64);//sponsoring agency
newPdf.setFont("times", "italic");
newPdf.text('The Management, Principal, Faculty and Students Cardially Invite you to the',38,74);
newPdf.setFont("times", "roman");

var tittle = ` ${data.event_title}`
const titleWidth = newPdf.getStringUnitWidth(tittle) ;
var pageWidth = newPdf.internal.pageSize.getWidth();
const centreX = Math.round(((pageWidth - titleWidth) / 2));
newPdf.text(tittle,centreX,90);
// console.log(centreX);
// console.log(pageWidth);
// console.log(titleWidth);
newPdf.setFont("times", "bold");
newPdf.text(`    ${data.event_name}`,centerX,84);//event name



newPdf.setFont("times", "roman");
newPdf.text('  On',100,92);
// newPdf.text(`${data.event}`,98,100);//event_title


newPdf.text('   Resource Person',89,110);
newPdf.setFont("times", "bold");
newPdf.text(`${data.guest_name}`,90,117);//Name of resource person
newPdf.setFont("times", "italic");
newPdf.text(`${data.guest_designation}`,98,127);//designation
newPdf.setFont("times", "roman");
newPdf.setFont("times", "bold");
newPdf.text('Dr.K.Gunasekaran',88,137);
newPdf.setFont("times", "italic");
newPdf.text('Secretary & Managing Trustee',80,144);
newPdf.text('Muthayammal Educational Trust and Research Foundation',55,151);
newPdf.text('will preside over the function',82,158);
newPdf.setFont("times", "roman");
newPdf.setFont("times", "bold");
newPdf.text('Dr.M.Madheshwaran',87,168);
newPdf.setFont("times", "italic");
newPdf.text('Principal',98,175);
newPdf.text('Muthayammal Engineering College',73,182);
newPdf.text('will feliciate the function',86,189);


newPdf.setFont("times", "roman");
newPdf.setFont("times", "bold");
newPdf.text(`${data.event_organizing_secretary}`,94,199);//organizing_secretary
newPdf.setFont("times", "italic");

newPdf.text('Will Welcome The Gathering',80,205);
newPdf.setFont("times", "bold");
newPdf.text('Date:',20,240);
newPdf.text(`${data.event_date}`,32,240);//date
newPdf.text('Time:',80,240);
newPdf.text(`${data.event_time}`,96,240);//time
newPdf.text('Venue:',140,240);
newPdf.text(`${data.event_venue}`,155,240);//place
newPdf.setFont("times", "roman");
newPdf.setFont("times", "italic");

newPdf.text(` ${data.event_organizing_secretary}`,20,268);//coordinator
newPdf.text('Co-Ordinator',20,272);


////////////////////////////////////////Event photos///////////////////////////////////

newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 7, 25, 25);

newPdf.setFontSize(18);
newPdf.setFont("times", "bold");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
newPdf.setFontSize(10);
newPdf.setFont("times", "");
newPdf.text('(An Autonomous Institution)', 80, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);

newPdf.setFontSize(12);
newPdf.setFont("times", "bold");

newPdf.rect(10,40,25,10)
newPdf.text(`${data.event_organizer}`,17.5, 46); //department

newPdf.rect(60,40,75,10)
newPdf.text(`${data.event_title}`,65, 46,'center');//topic

newPdf.rect(165,40,25,10)
newPdf.text(    `${data.acdyr_id}`,168.5, 46);//academic year

newPdf.setFontSize(15)
newPdf.text("Event Photos",85,65,'center')

newPdf.rect(10,90,95,105)
newPdf.addImage(picture2,"JPEG",15,103,83,80);
newPdf.rect(105,90,95,105)
newPdf.addImage(picture1,"JPEG",110,103,83,80);

////////////////////////////////////////Budget Utilized//////////////////////////////////


newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 7, 25, 25);

newPdf.setFontSize(18);
newPdf.setFont("times", "bold");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
newPdf.setFontSize(10);
newPdf.setFont("times", "");
newPdf.text('(An Autonomous Institution)', 80, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);

newPdf.setFont("times", "bold");
newPdf.setFontSize(19);
newPdf.text('Budget Utilized', 80, 45);
newPdf.setFontSize(18);
newPdf.text('Date of the Event:', 15, 60);
newPdf.setFont("times","");
newPdf.text(`${data.event_date}`,65, 60);//date

newPdf.setFont("times", "");
newPdf.setFontSize(15);
newPdf.text('To the Management through Principle', 15, 70);
newPdf.setFont("times", "bold");
newPdf.text('Total Paticipants:', 15, 90);
newPdf.text(`${data.student_count}`, 58, 90);
newPdf.setFont("times","");
newPdf.text('',57, 90);
newPdf.setFont("times", "bold");
newPdf.rect(15, 100, 15, 12).stroke();
newPdf.text('S.no', 17, 108);
newPdf.rect(30, 100, 125, 12).stroke();
newPdf.text('Details', 80, 108);
newPdf.rect(155, 100, 45, 12).stroke();
newPdf.text('Cost (in Rs)', 165, 108);

newPdf.setFont("times", "");
newPdf.rect(15, 112, 15, 12).stroke();
newPdf.text('1', 19, 120);
newPdf.rect(30, 112, 125, 12).stroke();
newPdf.text('Overall Budget', 35, 120);
newPdf.rect(155, 112, 45, 12).stroke();
newPdf.text(`${data.event_budget_utilized}`, 157, 120); // budget


newPdf.rect(15, 124, 15, 12).stroke();
newPdf.text('', 19, 132);
newPdf.rect(30, 124, 125, 12).stroke();
newPdf.text('Total', 35, 132);
newPdf.rect(155, 124, 45, 12).stroke();
newPdf.text(`${data.event_budget_utilized}`, 157, 132); //total budget
newPdf.rect(15, 136, 185, 12).stroke();
newPdf.text('In Words', 19, 144);
newPdf.text(`${data.budget_words}`,45,144);//In words budget

newPdf.setFont("times","bold");
newPdf.text('Event Coordinator(s)', 15, 234);
newPdf.text('HOD', 100, 234);
newPdf.text('Principal', 167, 234);

      // Save or display the final PDF
      const pdfDataUri = newPdf.output('datauristring');
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<iframe width="100%" height="100%" src="${pdfDataUri}" frameborder="0" allowfullscreen></iframe>`);
      }
    } catch (err) {
      const res = await axios.get(`http://localhost:3100/data/${id}`);
    
      const data = res.data;
      alert(`There is no such file stored in this ${data.report_id}`);
    }
  };

  return (
    <div>
      <label>
        Id:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <br />
      <br />
      {/* <input type="file" accept=".pdf" onChange={handleFileChange} /> */}
      <button onClick={handleGenerateAndDownload}>Generate and View PDF</button>
    </div>
  );
};

export default MergedComponent;
