//JS Libraries import (require)
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const userDataSchema = new mongoose.Schema({
	email: String,
	password: String
});
const Username = mongoose.model("UserData", userDataSchema);


//App using libraries.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/"));

mongoose.connect("mongodb://localhost:27017/colosseumDB", {
	useNewUrlParser: true
});

app.get("/", function(req, res) {
	res.sendfile(__dirname + "/index.html");
});

app.post("/register", function(req, res) {
	var userName = req.body
	const userAndPsw = new Username({
		email: userName.email,
		password: userName.psw
	})

	userAndPsw.save()
	res.sendFile(__dirname + "/login.html")
});

app.listen(3000, function() {
	console.log("Server is running on port 3000");
});
