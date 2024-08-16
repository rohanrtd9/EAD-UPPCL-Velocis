import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const circleSchema = new mongoose.Schema({  
    zone_ID: {
        type: mongoose.ObjectId,        
        ref: "tm-zones"
    },     
    circle_ID: {
        type: mongoose.ObjectId,        
        ref: "tm-circles"
    },     
    division_ID: {
        type: mongoose.ObjectId,        
        ref: "tm-divisions"
    },
    substation_ID: {
        type: mongoose.ObjectId,        
        ref: "tm-substations"
    },
    
    voltageLevel:String,   
    baySubstationName:String,   
    interfaceType: String,
    transactionType: String,
    discom: String,      
    isDeleted:{
        type: Number,
        default: 0
    }
});
circleSchema.plugin(mongoosePaginate);
circleSchema.plugin(aggregatePaginate);

export default mongoose.model('tm-bayNames', circleSchema);

