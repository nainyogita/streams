var ss = require('socket.io-stream');
var fs = require('fs');
var path = require('path');

module.exports = function(io) {

    var numUsers = 0;
    var connUsers = [];
    io.on('connection', function(socket) {
        var addedUser = false;

        // when the client emits 'new message', this listens and executes
        socket.on('new message', function(data) {
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
        });

        ss(socket).on("file", function(stream, data) {

            var filename = path.basename(data.name);
            var filepath = path.join(__dirname, '..', 'public', path.sep, 'uploads', filename);
            stream.pipe(fs.createWriteStream(filepath));
            //var msg = '<a href="/upload?filenames=' + filename + '" class="download" link=' + filename + '>' + filename + '</a>';
            //  socket.to(data.sender).emit('receiveMsg', msg);
            var msg = '<a href="/uploads/' + filename + '" class="download" link=' + filename + 'target="_blank">  A file has been received <img src="/images/download_icon.png" height="50" width="50"/></a>';
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: msg,
                type: "file"
            });
            //  saveData(data.sender, data.receiver, filename);

        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', function(username) {
            if (addedUser) return;

            // we store the username in the socket session for this client
            socket.username = username;
            ++numUsers;
            connUsers.push(socket.username);
            addedUser = true;
            socket.emit('login', {
                numUsers: numUsers,
                connUsers: connUsers
            });
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                username: socket.username,
                numUsers: numUsers,
                connUsers: connUsers
            });
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', function() {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', function() {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function() {
            if (addedUser) {
                --numUsers;
                connUsers.splice(connUsers.indexOf(socket.username), 1);
                //  console.log(connUsers);
                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers,
                    connUsers: connUsers
                });
            }
        });
    });

}
