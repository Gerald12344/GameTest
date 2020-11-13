var app = require('express')();
let express = require('express')
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id)
    io.to(socket.id)
});
app.use(express.static('./game-client/build'))

app.get('*', (req,res) => {
    res.end('Hello welcome to my backend *laughs* in computer')
})


http.listen(8080, () => {
    console.log('listening on *:4001');
});