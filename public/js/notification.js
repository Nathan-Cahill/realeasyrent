const io = require('socket.io');
const socket = io();


const message = String;
const setUserId = (argUserId) => { userId = argUserId;}


socket.on(message ,function (message) { 
  console.log(id,message);
  socket.emit(id, message);
});






// socket.on(`${userId}`, function(message){

// console.log(message);
// },

// $.ajax({
//     url: '/user',
//       contentType: 'application/json',
//       data: JSON.stringify(userID), 
//       type: 'POST',
//       success: function(result){
//         console.log(result)
//       }
//   }))


module.exports = {
setUserId
}
