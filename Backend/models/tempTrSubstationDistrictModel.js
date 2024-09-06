import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const outgoingFeederSchema = new mongoose.Schema({     
    zoneName: String,
    circleName: String, 
    divisionName: String,
    substationName: String,
    districtName: String
   
});

outgoingFeederSchema.plugin(mongoosePaginate);

export default mongoose.model('tr-temp-substation-districts', outgoingFeederSchema);
