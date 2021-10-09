const { eventNames } = require('process');
const io = require('socket.io');


const receiver = (message, id) => {
  
  console.log(message, id);
    socket.emit(id, message);
}

//toast notifications
const Toast = {
  init(){
    this.hideTimeout = null;

    this.el = document.createElement('div');
    this.el.classname = 'toast';
    document.body.appendChild(this.el);
  },

   show(message, state){
   clearTimeout(this.hideTimeout);

    this.el.textContent = message;
    this.el.className = 'toast toast--visible';

  if(state){
       this.el.classList.add(`toast--${state}`)
   }

    this.hideTimeout = setTimeout(() => {
       this.el.classList.remove('toast--visible')
    } ,3000);
  }
};

// Bring up notification toast
const showMessage = (message) =>{
   show(message, state);{
    clearTimeout(this.hideTimeout);

    this.el.textContent = message;
    this.el.className = 'toast toast--visible';
    this.el.classList.add(`toast--success`)
    
    this.hideTimeout = setTimeout(() => {
        this.el.classList.remove('toast--visible')
    } ,3000);
   }
}
document.addEventListener('DOMContentLoaded', ()=> Toast.init());

const socket = io();

// Message from server
socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);
  });
  


  module.exports = {
    socket, 
    receiver
};






