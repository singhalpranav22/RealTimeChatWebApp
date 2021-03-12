const socket = io('http://localhost:8000');
const form = document.querySelector(".send-container");
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector('.container');
const nameP = prompt("Please Enter your name to Join the chat !");
var audio = new Audio('assets/ring.mp3');
const append = (message,position) =>{
  const msgElement = document.createElement("div");
  msgElement.innerText=message;
  msgElement.classList.add('message');
  msgElement.classList.add(position);
  messageContainer.append(msgElement);
  if(position!="left") audio.play();
};
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);    
    messageInput.value='';
});
socket.emit('new-user-joined',nameP);

socket.on('user-joined', data => {
append(`${data} joined the chat !`,'left');
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`,'left');
});

socket.on('left' , data  => {
  append(`${data} left the chat`,'left');
});