const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const md5 = require("md5");

const app = express();

//Assign public directory for static file.
//Define using body Request parser.

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Initiate Database parameter.

const adminPwd = "weLMkubRUUCM5k44";
const cnnStrAdmin =
	"mongodb+srv://admin-public:" +
	adminPwd +
	"@cluster0-4onrp.gcp.mongodb.net/tournament-creatorDB";

//MongoDB connection establish.
mongoose.connect(
	cnnStrAdmin,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	function(error) {
		if (error) {
			console.log("There is error", error);
		} else {
			console.log("MongdoDB Connection: successful");
		}
	}
);

//Create Data Schemes
//Create Mongoose Data model.

const tournamentSceheme = new mongoose.Schema({
	name: String,
	gameType: String,
	teams: Number,
	user: String,
	participants: []
});

const userScheme = new mongoose.Schema({
	username: String,
	password: String,
	isLogin: false
});

const Tournament = mongoose.model("Tournament", tournamentSceheme);
const Username = mongoose.model("Username", userScheme);

//HTTPRequest GET Method API.

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/pages/index.html");
});

app.get("/tournament", function(req, res) {
	res.sendFile(__dirname + "/pages/tournament.html");
});

app.get("/communities", function(req, res) {
	res.sendFile(__dirname + "/pages/communities.html");
});

app.get("/about", function(req, res) {
	res.sendFile(__dirname + "/pages/about.html");
});

app.get("/register", function(req, res) {
	res.sendFile(__dirname + "/pages/register.html");
});

app.get("/login", function(req, res) {
	res.sendFile(__dirname + "/pages/login.html");
});

app.get("/createtournament", function(req, res) {
	res.sendFile(__dirname + "/pages/createtournament.html");
});

app.get("/homeuser", function(req, res) {
	res.sendFile(__dirname + "/pages/homeuser.html")
})

//HTTPRequest POST Method API.

app.post("/user/signin", function(req, res) {
	
})

app.post("/user/signup", function(req, res) {
	const newUser = new Username({
		username: req.body.username,
		password: md5(req.body.password),
		isLogin: false
	});

	newUser.save();
	console.log("Username: added successfull")
	res.sendFile(__dirname + "/pages/homeuser.html")
});

app.post("/user/uservalidate", function(req, res) {
	var resValue = "";

	Username.find(function(err, data) {
		if (err) {
			console.log("There is error on validating username", err);
		} else {
			if (data.length == 0) {
				res.send("successful");
			} else {
				data.forEach(function(result) {
					if (req.body.username == result.username) {
						console.log("Username: username is exist")
						resValue = "username exist";
					} else {
						console.log("Username: username is valid")
						resValue = "successfull";
					}
				});
				res.send(resValue);
			}
		}
	});
});

app.post("/tournament/add", function(req, res) {
	const newTournament = new Tournament({
		name: String,
		gameType: String,
		teams: Number,
		user: String,
		participants: []
	});
});

//Define running port of server-side.

app.listen(process.env.PORT || 3000, function() {
	console.log(
		"Server is running at port 3000 or dynamically by Heroku Server."
	);
});
