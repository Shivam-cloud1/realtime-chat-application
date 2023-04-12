const express = require('express');
const socketIO = require('socket.io');
const http = require('http')
const port = process.env.PORT || 3000
var app = express();
let server = http.createServer(app);
var io = socketIO(server);

// const users = {}

// io.on("connecton", socket => {
//     socket.on("new user joined",name => {
//         users[socket.id] = name
//         socket.broadcast.emit("user-joined",name)
//     })
//     socket.on("send", message => {
//         socket.broadcast.emit("receive",{message : message , name : users[socket.id]})
//     })
// })



server.listen(port, () => {
	console.log(`server connected at port number ${port}`)
});

app.use(express.static(__dirname + ""))

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/client-side.html");
});

io.on("connection", socket => {
	console.log("connection established")
	socket.on("sendmessage", (data) => {
		socket.broadcast.emit("sendmessage", data)
		console.log("bbj", data)
	})
})

