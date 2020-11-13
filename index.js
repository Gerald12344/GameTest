var app = require('express')();
let express = require('express')
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    headers: {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": '*', //or the specific origin you want to give access to,
        "Access-Control-Allow-Credentials": true,
    }
});

let arraydata = {
    1: {
        '325328935893258329': {
            location: { x: 50, y: 50 },
            health: 100,
            weapons: [],
            name: "Hello"
        }
    }
}

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id)
    io.to(socket.id).emit('WelcomePacket', arraydata[1])
    socket.on('connect_failed', function (err) {
        console.log(err)
    })
});



app.use(express.static('./game-client/build'))

app.get('*', (req, res) => {
    const origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.end('Hello welcome to my backend *laughs* in computer')
})


http.listen(4001, () => {
    console.log('listening on *:4002');
});