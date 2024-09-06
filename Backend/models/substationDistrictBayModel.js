import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const outgoingFeederSchema = new mongoose.Schema({     
    zoneName: String,
    circleName: String, 
    divisionName: String,
    substationName: String,
    districtName: String,  
    feederBayName: String,  
   
});

outgoingFeederSchema.plugin(mongoosePaginate);

export default mongoose.model('tm-substation-district-feederbays', outgoingFeederSchema);
