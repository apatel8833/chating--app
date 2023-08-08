const io = require( "socket.io" )();
var user = [];
var userid = [];
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( user[userid.indexOf(socket.id)] +" connected" );
   

    socket.on('disconnect', () => {
        // console.log( user[userid.indexOf(socket.id)] +" disconnected" );
        user.splice(userid.indexOf(socket.id) , 1);
        userid.splice(userid.indexOf(socket.id), 1);
        console.log(user[userid.indexOf(socket.id)] +  " disconnected" );

     });
     socket.on('msg' , function(message){
        io.emit('msg' , {message , username : user[userid.indexOf(socket.id)] });
     })

     socket.on('naam' , function(naam){
        user.push(naam);
        userid.push(socket.id);
        console.log( user[userid.indexOf(socket.id)] +" connected" );
        io.emit('online' , {data : user});
    })
});
// end of socket.io logic

module.exports = socketapi;
