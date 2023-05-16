export default class TicketRespository {
    constructor(dao) {
        this.dao = dao
    }

    async getTicketById(id) {
        const ticket = await this.dao.getTicketById(id);
        return ticket;
    }

    async addTicket(propsNewTicket){
        const ticket = await this.dao.addTicket(propsNewTicket);
        return ticket;
    }
}