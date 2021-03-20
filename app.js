
// --------- STEPS ------------ to build a dynamic - not static - application

// STEP 1 - set the const - remember to  initialize the project   - npm int -    and install expressm, body-parser and request - npm i express bodyparser request -
// STEP 2 - GET the HTML
//STEP 3 - GET THE STATIC - CSS AND IMAGES - create a folder to put the static things and reference to it on the source in the html
//STEP 4 - Posting the data from the format
//STEP 5 - Sending data to mailchimp ( external)
// STEP 6 - REDERCTIONING USER TO SUCCESS AND FAILURE PAGES DEPENDING ON THE STATUS CODE (ex: 200, 400 )
// STEP 6.2 - REDERCTIONING USER homepage throught a button





const express = require("express");                    // STEP 1
const bodyParser = require("body-parser");              // STEP 1
const request = require("request");                    // STEP 1

 //  STEP 5   requesting the https module
const https = require("https")                          // STEP 5



const app = express()                                 // STEP 1


app.use(express.static("public"));                    // STEP 3  // JUST THIS LINE OF CODE +create a folder("this one mamed public") WILL ENVOQUE IMAGES AND CSS - ALL OF THE STATIC DRIZZLE
app.use(bodyParser.urlencoded ({extended:true}));     // STEP 4


// GETTING THE HTML                                   // STEP 2
app.get("/", function(req,res){                       // STEP 2
res.sendFile(__dirname + "/signup.html");            // STEP 2
});


// Getting THE POST                                    // STEP 4
app.post("/", function (req, res){                     // STEP 4      // STEP 5 changing the var into a constant
  const firstName = req.body.fName;                      // STEP 4    // STEP 5 changing the var into a constant
  const  lastName = req.body.sName;                     // STEP 4      // STEP 5 changing the var into a constant
  const  email = req.body.email;                          // STEP 4    // STEP 5 changing the var into a constant


// STEP 5.1 - this is for mailchimp  - all whhats written here down is from there
const data = {                                                 // STEP 5
members: [                                                   // STEP 5
{
  email_address: email,                                      // STEP 5
  status:"subscribed",                                      // STEP 5
  merge_fields: {                                           // STEP 5
    FNAME: firstName,                                        // STEP 5
    LNAME: lastName                                         // STEP 5
  }
}
  ]
};

//STEP 5.2  - TRANSFORMING TO JSON - RIGHT FORMAT TO MAILCHIMP
const jsonData = JSON.stringify(data);   // ypu have to send to mailchim in the Json format

//STEP 5.3  - THE URL THAT THE DATA WILL BE POST + MY API KEY

const url = "https://us1.api.mailchimp.com/3.0/lists/956eaa366a"; //url endpount mail chimp - post the members here

//STEP 5.4  - USE THE METHOD POST - but we need an  API KEY AUTHENTICATION
const options = {
  method:"POST",
  auth: "prospkt:b8993a3cd7534d7f562ce68d7097fa10-us1" // this is the authentication - any name:APYkey
  }


// STEP 5.5 - Making an HTTPS request to get response  with the data we are sending
const request = https.request(url, options, function(response){      //posting that to external here mailchim

//STEP 6 - Responding user with some text
if (response.statusCode == 200) {
  res.sendFile(__dirname + "/success.html");
} else{
  res.sendFile(__dirname + "/failure.html");
}

// CONTINUING STEP 5.5 - Making an HTTPS request to get response  with the data we are sending

response.on("data", function(data){
 console.log(JSON.parse(data));
  })
  })

  // STEP 5.6  -SPECYFYING WHAT WE GONNA SEND ON THE REQUEST (email , first and last name )

request.write(jsonData);   // this is passing the json Data to the mailchimp server
request.end();
});

//STEP 6.2 - Adding a route on the failure.html to the homepage
app.post("/failure", function(req, res){
res.redirect("/");
});



//SERVER SPIN UP                                        // STEP 1
  app.listen(process.env.PORT || 3000, function() { // first config is the app spinup  //STEP 7 - CONFIG HEROKU
  console.log("User is running on port 3000")

});


//API KEY FROM MAILCHIMP
//  b8993a3cd7534d7f562ce68d7097fa10-us1   ---  us1 is the number of my server it has to be substituded in the place of X  - "https://us-->X<--.api.mailchimp.com/3.0/lists/956eaa366a";
//AUDIENCE KEY
//  956eaa366a FROMMAICHIMP
