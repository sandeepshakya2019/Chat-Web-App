const io = require("socket.io")(3001)

const users={}
io.on('connection',socket => {
	//console.log(socket)
	socket.on('new-user-joined',name => {
		console.log("New User : ",name);
		users[socket.id] = name;
		socket.broadcast.emit('user-joined',name)
		//console.log(san);

	});

	socket.on('send',message => {
		socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
		//console.log(message)
	});
	socket.on('disconnect',message => {
		socket.broadcast.emit('left',users[socket.id])
		delete users[socket.id];
	});
})
