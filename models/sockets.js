const Markers = require("./markers");


class Sockets {

    constructor( io ) {
        this.io = io;
        this.markers = new Markers();
        this.socketEvents();

    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('Client connected!');

            socket.emit('markers-active', this.markers.actives);

            socket.on('new-marker', ( marker ) => {
                this.markers.addMarker( marker );
                socket.broadcast.emit('new-marker', marker);
            })

            socket.on('markers-update', (marker) => {
                this.markers.updateMarker(marker);
                socket.broadcast.emit('markers-update', marker);
            })

            socket.on('delete-marker', (id) => {
                this.markers.deleteMarker(id);
                socket.broadcast.emit('delete-marker', id);
            })
        
        });
    }

}


module.exports = Sockets;