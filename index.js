const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/colosseumDB", {
	useNewUrlParser: true
});

const userDataSchema = new mongoose.Schema ({
	email: String,
	password: String
})

app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
	res.sendfile(__dirname + "/index.html");
});

app.listen(3000, function() {
	console.log("Server is running on port 3000");
});
