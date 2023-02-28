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
const photoInput = document.querySelector('.photoInput');
const photoButton = document.querySelector('.photoButton');


let DataURL;

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

socket.on('send-message', ({message, user, image}) => {
    messagesList.insertAdjacentHTML('beforeend',`<li>${user}: ${message}</li>`);
    if(image!== undefined){
        const imagen = document.createElement("img")
        imagen.src = image
        messagesList.appendChild(imagen);
    }
    window.scrollTo(0, document.body.scrollHeight);
});

usernameButton.addEventListener('click', ()=>{
    let username = usernameInput.value;
    socket.emit('register', username);
});

inputMessageButton.addEventListener('click', ()=>{
    let props = {
        message: inputMessage.value,
        image: DataURL
    }

    socket.emit('send-message', props);
    inputMessage.value = '';
    DataURL = undefined;
});

photoButton.addEventListener('click', ()=>{
    photoInput.click();
})

photoInput.addEventListener('change', (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        DataURL = reader.result
    };
    reader.readAsDataURL(file);
    DataURL ? alert('Foto Adjuntada') : alert('Adjunte una vez mas para confirmar');
})