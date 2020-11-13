var socket = require('socket.io-client')('http://192.168.1.131:4001');
console.log('running')
socket.on('connect', function(){console.log('connectedn')});
socket.on('event', function(data){});
socket.on('disconnect', function(){});