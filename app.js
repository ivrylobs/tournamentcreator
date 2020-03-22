const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));

const adminPwd = "weLMkubRUUCM5k44";
const cnnStrAdmin =
	"mongodb+srv://admin-public:" +
	adminPwd +
	"@cluster0-4onrp.gcp.mongodb.net/tournament-creatorDB";

mongoose.connect(cnnStrAdmin, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const fruitScheme = new mongoose.Schema({
	name: String,
	rating: Number,
	review: String
});

const Fruit = mongoose.model("Fruite", fruitScheme);

const fruit = new Fruit({
	name: "Apple",
	rating: 7,
	review: "Pretty solid as a fruit."
});

fruit.save();

app.listen(process.env.PORT || 3000, function() {
	console.log(
		"Server is running at port 3000 or dynamically by Heroku Server."
	);
});

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});
