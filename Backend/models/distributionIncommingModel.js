import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const incommingFeederSchema = new mongoose.Schema({   
    discom_ID: {
        type: mongoose.ObjectId,
        ref: "discoms"
    },
    zone_ID: {
        type: mongoose.ObjectId,
        ref: "dm-zones"
    },
    circle_ID: {
        type: mongoose.ObjectId,
        ref: "dm-circles"
    },
    division_ID: {
        type: mongoose.ObjectId,
        ref: "dm-divisions"
    },
    discomName: String,
    zoneName: String,
    circleName: String,
    divisionName: String,
    substationName: String,
    feederName: String,
    feederVoltage: String,
    meterMake: String,
    meterSLNo: String,
    overAllMF:String,
    isDeleted:{
        type: Number,
        default: 0
    },
    status:{
        type: String,
        default: 'Active'
    }
});

incommingFeederSchema.plugin(mongoosePaginate);

export default mongoose.model('dm-incomming-feeders', incommingFeederSchema);
