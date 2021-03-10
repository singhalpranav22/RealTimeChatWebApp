

const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector('.container');
const nameP = prompt("Please Enter your name to Join the chat !");
socket.emit('new-user-joined',nameP);
