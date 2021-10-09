//Server template credit to Alessio Bonti - found at: https://github.com/alexbonti/deakin-crowds/blob/master/server.js
var dbConnection = require('./services/database/dbConnection')
var express = require("express");
var app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// socket chatroom integration

const socketio = require('socket.io');
const formatMessage = require('./util/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./util/users');

// let dbConnection = require('./dbConnection.js');


let http = require('http').createServer(app);
//const server = http.createServer(app);
const io = socketio();

var sockets = require('./util/sockets');
sockets.connect(io);




var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname + '/public'));


let userRoute = require('./routes/users/user');
let propertyRoute = require('./routes/users/landlord/property');
let renterProfileRoute = require('./routes/users/renter/renterProfile');
let applicationRoute = require('./routes/transactions/application');
let applicationRequirementSorter = require ('./routes/transactions/applicationRequirementSorter');


app.use('/user', userRoute);
app.use('/property', propertyRoute);
app.use('/renter_profile', renterProfileRoute);
app.use('/application', applicationRoute)
app.use('/filter/application_requirements', applicationRequirementSorter);





//Sockets extended inputs
const botName = 'Support Bot';

//Display when someone connects
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room})=> {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);
        
    //Tell single client that is connecting = personal message
    socket.emit('message', formatMessage(botName, 'Welcome to Lets Chat Support! Please wait while we connect you to support staff...'));

    //Tell everyone a client has connected except the client connecting
    socket.broadcast
    .to(user.room)
    .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );
    //Send users and room info
    io.to(user.room).emit('roomUsers',{
         room: user.room,
         users: getRoomUsers(user.room)
        });
  
    });


  
   //listen for chatMessage
   socket.on('chatMessage', (msg)=>{
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
   });

    //This runs when client disconnects
    socket.on('disconnect', ()=>{
        const user = userLeave(socket.id);

        if(user){
            //Tells everyone a client has connected including client connecting
            io.to(user.room).emit(
                'message', 
                formatMessage(botName, `${user.username} has left the chat`)) 
        };

        //Send users and room info
        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoomUsers(user.room)
           });

        
       
     });
 
});


http.listen(port,()=>{
  console.log("Listening on port ", port);
});