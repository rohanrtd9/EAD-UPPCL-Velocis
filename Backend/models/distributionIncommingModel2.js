import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const incommingFeederSchema = new mongoose.Schema({   
    discomName: String,
    zoneName: String,
    circleName: String, 
    divisionName: String,
    incomingFeederDetails: [{
        substationName:String,
        feederName:String,
        feederVoltage:String,
        meterMake:String,
        meterSLNo:String,
        overAllMF:String,
        status:String        
    }],
    isDeleted:{
        type: Number,
        default: 0
    }
});

incommingFeederSchema.plugin(mongoosePaginate);

export default mongoose.model('dm-incomming2-feeders', incommingFeederSchema);
