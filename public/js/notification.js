var socket = io();
const socket = io();
const setUserId = (argUserId) => { userId = argUserId;}

socket.on(id, function (message) { 

  console.log(message);
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



