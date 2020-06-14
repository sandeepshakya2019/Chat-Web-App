const socket = io("http://localhost:3001");
const name = prompt("Enter your name");
const form = document.getElementById('sendContainer');
let messageInput = document.getElementById('msgInput');
const messageContainer = document.querySelector(".container");

var audio = new Audio('resource/ring.mp3');

const append = (message,position) =>{
	const messageElement = document.createElement('div');
	messageElement.innerText = message;
	messageElement.classList.add('message');
	messageElement.classList.add(position);
	messageContainer.append(messageElement);
	if (position == 'left'){
		audio.play();	
	}
	
}

form.addEventListener('submit',(e)=>{
	e.preventDefault();
	const message = messageInput.value;
	append(`👉 : ${message}`,'right');
	socket.emit('send',message);
	messageInput.value = ' ';
})

socket.emit('new-user-joined',name);

socket.on('user-joined',name =>{
	append(`${name} joined the chat`,'right');
})
socket.on('recieve',data => {
	append(`${data.name} : ${data.message}`,'left')
})
socket.on('left',name => {
	append(`${name} Left the chat`,'left')
})