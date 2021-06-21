const Ticket = require('./ticket');


class TicketList{

    constructor(){
        this.lastNumber = 0;

        this.pending = [];
        this.assigned = [];
    }

    get nextNumber(){
        this.lastNumber ++;
        return this.lastNumber;
    }

    //2 que se veran en las tarjetas y 10 en el historial

    get last12(){
        return this.assigned.slice( 0, 12 );
    }

    createTicket(){
        const newTicket = new Ticket( this.nextNumber );
        this.pending.push( newTicket );
        return newTicket;
    }

    assignTicket( agent, desk ){

        if( !this.pending.length ){
            return null;
        }

        const nextTicket = this.pending.shift();

        nextTicket.agent = agent;
        nextTicket.desk = desk;

        this.assigned.unshift( nextTicket );

        return nextTicket;
    }

}

module.exports = TicketList;