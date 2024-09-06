import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const independentFeederSchema = new mongoose.Schema({   
    discomName: String,
    zoneName: String,
    divisionName: String,
    circleName: String,
    consumerName: String,
    feederVoltage: String,
    feederCategory: String,
    projectArea: String,
    supplyArea: String,
    feederCode: String,
    meterMake:String,
    meterSLNo:String,
    overallMF:String,
    consumerID:String,
    lengthOfFeeder:String,
    isDeleted:{
        type: Number,
        default: 0
    },
    transmissionsDetails: [{
        actionName:String,
        zone: String,
        circle: String,
        division: String,
        district: String,
        substationName: String,
        tdInterfacePoint: String
        }]
});

independentFeederSchema.plugin(mongoosePaginate);

export default mongoose.model('dm-33kv-independent-feeders', independentFeederSchema);
