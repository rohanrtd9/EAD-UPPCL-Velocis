import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const outgoingFeederSchema = new mongoose.Schema({  
    discomName: String,
    zoneName: String,
    circleName: String, 
    divisionName: String,
    substationName: String,
    feederName: String,
    outgoingFeederName:String,
    feederCode:String,
    feederVoltage:String,
    feederCategory:String,
    supplyArea:String,
    projectArea:String,    
    meterMake:String,
    meterSLNo:String,
    overallMF:String,
    mappedEDD:String,
    status:String,
    noOfConsumers:String
   
});

outgoingFeederSchema.plugin(mongoosePaginate);

export default mongoose.model('dm-temp-outgoing-feeders', outgoingFeederSchema);
