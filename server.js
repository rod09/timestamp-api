// node modules
var express = require("express");
var app = express();
var moment = require('moment');
var path = require("path");


// send the index.html file to the main route
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'), (err) => {
       if (err) {
           res.status(err.status).end();
       }
   });
});

// check the validity of the string param
// and return the unix and natural date format
// depending on the initial format
app.get('/:string', (req, res) => {
    // date string param
    var dateString = req.params.string;
    
    // if it is a string
    if (isNaN(dateString)) {
        var date = moment(dateString);
        // if it is valid
        if (date.isValid()) {
            // status code 200 ok
            res.status(200);
            // send response as json
            res.send(JSON.stringify({
                unix: date.unix(),
                natural: dateString
            }));
        } else {
            // bad request
            res.status(400);
            // send message
            res.send(JSON.stringify({
                unix: null,
                timestamp: null
            }));
        }
    } else {
        // unix timestamp
        dateString = parseInt(dateString, 10);
        // response code 200 ok
        res.status(200);
        // send response as json
        res.send(JSON.stringify({
            unix: dateString,
            natural: require("moment").unix(dateString).format('MMMM D, YYYY')
        }));
    }
       
});

// listen to port 8080
app.listen(8080, () => {
    console.log('Timestamp Api Running on port 8080');
});