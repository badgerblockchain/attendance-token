const express = require("express");
const bodyParser = require("body-parser")
const fs = require('fs');
const app = express();

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
	console.log("Application started and Listening on port 3000");
});

app.get("/", (req, res) => {
	res.send("<h1>Home</h1>");
});

app.get("/data/addrs.txt", (req, res) => {
	res.sendFile(__dirname + "/data/addrs.txt");
});

app.get("/drop", (req, res) => {
	res.sendFile(__dirname + "/drop-page/index.html");
});

app.post("/drop", (req, res) => {
	console.log("Request for Payment")
    fs.writeFileSync("data/addrs.txt", "");
    res.send("Sent?");
});

app.get("/get", (req, res) => {
	res.sendFile(__dirname + "/queue-page/index.html");
});

app.post("/get", (req, res) => {
	let pubKey = req.body.pubKey;
    fs.appendFileSync("data/addrs.txt", pubKey + "\n");
    res.send("Thank you for coming to this meeting! You are now in the queue to receive your BT reward!")
})
