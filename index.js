const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
	res.sendfile(__dirname + "/index.html");
});

app.listen(3000, function() {
	console.log("Server is running on port 3000");
});
