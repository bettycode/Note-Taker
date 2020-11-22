var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 6000;

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.

// ================================================================================

require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);


// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });