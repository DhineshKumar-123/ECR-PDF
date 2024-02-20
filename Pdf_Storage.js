import React, { useState ,useEffect} from 'react';
// import { onTable ,onComplete} from './connect';
// import './sty.css';
import { format } from 'date-fns';
// import Select from 'react-select';
import axios from 'axios';


export const EcrInput = () => {

    
  
const [selectedFilePdf, setSelectedFilePdf] = useState(null);
const [newFileName, setNewFileName] = useState('');
const handleFileChange1 = (e) => {
  setSelectedFilePdf(e.target.files[0]);
  
};

const handleUpload = () => {

  if (selectedFilePdf ) {
    const formData1 = new FormData();
    const currentDate = new Date();

const dd = String(currentDate.getDate()).padStart(2, '0');
const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
const yyyy = currentDate.getFullYear();

const hh = String(currentDate.getHours()).padStart(2, '0');
const min = String(currentDate.getMinutes()).padStart(2, '0');
const ss = String(currentDate.getSeconds()).padStart(2, '0');

const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
// Maximum value for the random number
let random =Math.random()*Math.random()*1;
    const name1='Pdf'+'1_'+dateTimeString+'_'+random+'.pdf';
    
    formData1.append('file', selectedFilePdf,name1 );
    // alert("Hello");
    // setFormData({
    //   ...formData,
    //   event_photo_1: name1,

    // });
    
    fetch('http://localhost:5000/api/upload1', {
      method: 'POST',
      body: formData1,
  })
  
//     fetch('http://localhost:5000/upload1', {
//       mode: 'no-cors',
//   method: 'POST',
//   body: formData1,
// })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then((data) => {
    alert(data);
  })
  .catch((error) => {
    console.error('Error uploading the file:', error);
  });

     
  }
  // console.log(formData);
  // alert("File uploaded")
  
  // submit();
}


return (
  <form>
  <label htmlFor="event_photo_1">Photo 1: (To be displayed in the front page)</label>
  <input type="file" onChange={handleFileChange1} id="event_photo_1" name=""  /><br />
  <input type="button" onClick={handleUpload} id="event_photo_1" value="Submit" />
  
  </form>
);
}

export default EcrInput;
