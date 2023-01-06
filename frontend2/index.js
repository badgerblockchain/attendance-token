const express = require("express");
const bodyParser = require("body-parser")
const fs = require('fs');
const app = express();

let accounts = {};
let locked = true;


// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
	console.log("Application started and Listening on port 3000");
});

app.get("/accounts", (req, res) => {
	res.send({ accounts: Object.keys(accounts) });
});

app.get("/send", (req, res) => {
	if(locked) {
		res.sendFile(__dirname + "/pages/lock/index.html");
	} else {
		res.sendFile(__dirname + "/pages/send/index.html");
	}
});

app.post("/send", (req, res) => {
	locked = true;
	accounts = {}; 	// clear the addresses
    res.send("Thank you for using the application!");
});

app.get("/clear", (req, res) => {
	accounts = {};
	res.send("Cleared!")
})

app.get("/unlock", (req, res) => {
	locked = false;
	res.send("Unlocking!");
})

app.get("/request", (req, res) => {
	if(locked) {
		res.send("Application closed.")
	} else {
		res.sendFile(__dirname + "/pages/request/index.html");
	}
});

app.post("/request", (req, res) => {
	let pubKey = req.body.pubKey;
	accounts[pubKey] = 1;	// add address to map for checking
	res.send("Thank you for coming to this meeting! You are now in the queue to receive your BT reward!")
})
