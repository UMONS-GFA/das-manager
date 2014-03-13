das-manager
===========

Realtime application to interact with Data Acquisition System

### Requirements

* Node.js
* serialport
* socket.io

### Settings 

```
var settings = {};

settings.localHost = 'LOCAL_SERVER_ADRESS';
settings.localPort = LOCAL_SERVER_PORT;
settings.remoteHost = 'REMOTE_SERVER_ADRESS';
settings.remotePort = REMOTE_SERVER_PORT;
settings.EOL = '\r';

exports.settings = settings;
```

### Serial 

Edit serial.html
```
var socketio = io.connect("LOCAL_SERVER_ADRESS:LOCAL_SERVER_PORT");
```

Launch
```
node serial.js
```

### TCP 

Edit serial.html
```
var socketio = io.connect("REMOTE_SERVER_ADRESS:REMOTE_SERVER_PORT");
```

Launch
```
node tcp.js
```


