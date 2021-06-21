const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        //Crear la instancia del ticket-list
        this.ticketList = new TicketList();


        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');

            //Pedir nuevo ticket
            socket.on('request-ticket', ( data, callback ) => {
                const newTicket = this.ticketList.createTicket();
                callback( newTicket );
            });

            //Siguiente ticket
            socket.on('next-ticket-work', ( {agent, desk}, callback ) =>{
                const yourTicket = this.ticketList.assignTicket( agent, desk );
                callback( yourTicket );

                this.io.emit('ticket-assigned', this.ticketList.last12 );
            });
            
        
        });
    }


}


module.exports = Sockets;