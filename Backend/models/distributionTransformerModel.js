import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const transformerSchema = new mongoose.Schema({   
    T_ID: String,
    distributionSubstationName: String,
    transformerCapacity: String, // in MVA
    transformerQuantity: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});

transformerSchema.plugin(mongoosePaginate);
transformerSchema.plugin(aggregatePaginate);

export default mongoose.model('dm-transformers', transformerSchema);
