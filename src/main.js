//HTML SCREENS
const loginScreen = document.querySelector('.login-screen');
const chatScreen = document.querySelector('.chat-screen');
chatScreen.style.display = 'none';

//HTML REFERENCES
const usernameInput = document.querySelector('.usernameInput');
const usernameButton = document.querySelector('.usernameButton');
const inputMessage = document.querySelector('.inputMessage');
const inputMessageButton = document.querySelector('.inputMessageButton');
const messagesList = document.querySelector('.messages');

const socket = io();

socket.on('login', () => {
    alert('Bienvenido al Chat, respeta las reglas!')
    loginScreen.style.display = 'none';
    chatScreen.style.display = 'block';
})

socket.on('login-issue', () => {
    alert('El nombre que intentas usar no esta disponible, intenta uno nuevo');
    usernameInput.value = '';
})

socket.on('send-message', ({message, user}) => {
    messagesList.insertAdjacentHTML('beforeend',`<li>${user}: ${message}</li>`);
    window.scrollTo(0, document.body.scrollHeight);
});

usernameButton.addEventListener('click', ()=>{
    let username = usernameInput.value;
    socket.emit('register', username);
});

inputMessageButton.addEventListener('click', ()=>{
    let message = inputMessage.value;
    socket.emit('send-message', message);
    inputMessage.value = '';
});