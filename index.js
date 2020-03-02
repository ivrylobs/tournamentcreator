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

const Username = mongoose.model("UserData", userDataSchema)



app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
	res.sendfile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	res.send("Thanks you for registeration")
	console.log(req.body)
	const newUser = new Username ( {
		email: req.body.email,
		password: req.body.psw
	})
	
	newUser.save()
})

app.post("/login/", function(req, res) {
	res.sendfile(__dirname + "/index.html")
})

app.listen(3000, function() {
	console.log("Server is running on port 3000");
});