var schemas = require('./_schemas');
var mongoose = require('mongoose')
const supportTicketModel = mongoose.model('supportTicket', schemas.supportTicket);




const getSupportTickerWithId = async (ticketId) => {
    let supportTicket = await supportTicket.findById(ticketId);
    return supportTicket;
}


const insertsupportTicket = async (supportTicketData)=>{
    
    if(!supportTicketData){
        return false;
    }

    let existingsupportTicket = await userModel.findOne(supportTicketData);
    
    if (existingsupportTicket == null){
        const supportTicket = new userModel(supportTicketData);
        let savedsupportTicket = await supportTicket.save();
        if (savedsupportTicket == supportTicket){
            return supportTicket;
        }
        else {
            return false;
        }
        
    } 
    else {
        return false;
    }    
  

}

const updatesupportTicket = async (supportTicket) => {
    let updatedsupportTicket = await supportTicketModel.findOneAndUpdate({ticketId: supportTicket.ticketId}, ticketId, {new: true});
    if (updatedsupportTicket) {
        return true;
    } else {
        return false;
    }


}

module.exports = {getSupportTickerWithId, insertsupportTicket, updatesupportTicket}