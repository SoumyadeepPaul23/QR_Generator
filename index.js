/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";



inquirer
  .prompt([
    /* Pass your questions in here */ 
    // it is an object so we put curly braces 
    {
        "message":"Enter your URL",
        "name" : "URL"
}])
  .then((answers) => {
    // Use user feedback for... whatever!!
    // console.log(answers.URL);
    const url = answers.URL;
    var name = url.split("."); 
    var filename = name[1]+".png";

// qr-image module 
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(filename));

// the flag is used to append the text to the file. If we do not use the flag then each time the text in the file will be overwritten.
// the "\n" is used to get a new line after each entry.
    fs.writeFile("URL.txt",url+"\n",{flag: 'a+'},(err)=>{ 
        if(err)
        {
            throw err;
        }
        console.log("The file have been saved");
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });



