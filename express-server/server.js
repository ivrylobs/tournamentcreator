const express = require("express");

const app = express();

app.get("/", function(request, response) {
	response.send("Server is running");
});

app.get("/test", function(request, response) {
    response.send("Testing process")
})

app.listen(3000, function() {
	console.log("Server started on port 3000");
});
