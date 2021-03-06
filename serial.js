/*
SCRIPT TO REMOTELY ACCESS TO MG3D DAS

Must be launched on the server
node server.js

Requirements(on the server):
- Node.js
- serialport
- socket.io

*/

var http = require('http');                         // used for webserver
var fs = require('fs');                             // used to read file
var serialport = require("serialport");             // used to access serialport
var settings = require('./settings').settings;

var sp = new  serialport.SerialPort("/dev/ttyUSB0", {
    baudrate: 9600,
    parser: serialport.parsers.readline(settings.EOL)
});

var webserver = http.createServer(function (request, response) {
    fs.readFile("serial.html", 'utf-8', function (error, data) {
        response.writeHead(200, {'Content-Type':'text/html'});
        response.write(data);
        response.end();
    });
}).listen(settings.localPort, settings.localHost);

var io = require('socket.io').listen(webserver);
var readData = '';
io.sockets.on('connection', function (socket) {
    console.log("Socket connected");
    socket.on('messaqe_to_server', function (command) {
        sp.write(command + settings.EOL);
        if (command == 'exit') {
            sp.close();
            process.exit(code=0);
        }
        console.log(command);
    });

    sp.on("data", function (data) {
        readData += data.toString();
        console.log("Readdata :" + readData);
//        if (readData.indexOf('*') >= 0 && readData.indexOf('\r') >= 0) {
            sendData = readData .substring(readData .indexOf('*'), readData.indexOf('\r'));
            io.sockets.emit("message_to_client",{ response: sendData});
            console.log(sendData);
            readData = '';
//        }
//        console.log(data);
//        io.sockets.emit("message_to_client",{ response: data});
    });

    sp.on("open", function () {
        sp.flush(); // Flushes data received but not read.
        console.log('port opened…');
    });

    sp.on("error", function (msg ){
        console.log("error" + msg);
    });

    sp.on("close", function (err) {
        console.log('port closed');
    });
});