const express = require("express")

const app = express()

app.use(express.static("public"))

app.listen(process.env.PORT || 3000, function() {
	console.log("Server is running at port 3000 or dynamically by Heroku Server.")
})

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html")
})