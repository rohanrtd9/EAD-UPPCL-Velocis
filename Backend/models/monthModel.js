import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';

const monthSchema = new mongoose.Schema({
    monthName: String,
    shortName: String    
});
monthSchema.plugin(mongoosePaginate);
export default mongoose.model('months', monthSchema);

