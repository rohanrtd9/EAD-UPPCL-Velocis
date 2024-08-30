import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const yearSchema = new mongoose.Schema({
    yearName: Number    
});
yearSchema.plugin(mongoosePaginate);
export default mongoose.model('years', yearSchema);

