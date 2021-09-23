var schemas = require('./_schemas');
var mongoose = require('mongoose')
const renterProfileModel = mongoose.model('renter_profile', schemas.renterProfile);




const insertRenterProfile = async (renterProfileData)=>{
    if(!renterProfileData){
        return false;
    }

    let existingUser = await renterProfileModel.findOne({userId: renterProfileData.userId});
    if (existingUser == null){

        const renterProfile = new renterProfileModel(renterProfileData);
        let savedRenterProfile = await renterProfile.save();
        if (savedRenterProfile == renterProfile){
            return renterProfileData;
        }
        else {
            return false;
        }
        
    } 
    else {
        return false;
    }    
  

}

const getRenterProfileWithUserId = async (id) => {
    let renterProfile = await renterProfileModel.findOne({userId: id});
    return renterProfile;
}





module.exports = {insertRenterProfile, getRenterProfileWithUserId} 