import { ticketModel } from "../../mongoDB/models/ticket.model.js";

export default class TicketManager{
    async getTicketById(id) {
        const ticket = await ticketModel.findById(id);
        return ticket;
    }

    async addTicket(propsNewTicket){
        const ticket = await ticketModel.create(propsNewTicket);
        return ticket;
    }
}