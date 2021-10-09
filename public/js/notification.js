var socket = io();
socket.on('notification', function (message) { 

  console.log(message);
});


const userId = "61602014a84d268b9ba8d825";

const socket = io();



const setUserId = (argUserId) => { userId = argUserId;}



socket.on(`${userId}`, function(message){

console.log(message);
},

$.ajax({
    url: '/user',
      contentType: 'application/json',
      data: JSON.stringify(userID), 
      type: 'POST',
      success: function(result){
        console.log(result)
      }
  }))



