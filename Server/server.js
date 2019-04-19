var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.sendfile("index.html");
});

app.post('/command',function(req,res){
	var clNum = req.body.num;
	var cmdRes = req.body.cmd;

	var timeStamp = getDateTime();
	var data = timeStamp + ":: Client: " + clNum + " Response: " + cmdRes;


	console.log(data);
	fs.writeFile("/home/davidpruitt/Desktop/Files/data.txt", data, function(err){
		if(err){
			return console.log(err);
		}
	})
	res.end("yes");
});

//Gets data from file, file contains one line
//time:xx,xx,xx cnum:xxx cmd:xxxxx
app.get('/newCmd',function(req,res){
	res.sendfile("cmd.txt");
});

app.listen(3000, function(){
	console.log("started on port 3000");
});

function getDateTime()
{
	var date = new Date();

	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;

	//add rest of time stamp

	return hour;
}