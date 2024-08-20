import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import argon2 from 'argon2';

const divisionSchema = new mongoose.Schema({
    circle_ID: {
        type: mongoose.ObjectId,
        required: true,
        ref: "dm-circles"
    },
    divisionName: String,
    isDeleted:{
        type: Number,
        default: 0
    },
    password: {
        type: String,
        default: "123456"
    },
    isAdmin:{
        type:Number,
        default: 0
    }
});

divisionSchema.methods.comparePassword = function(candidatePassword) {
    return argon2.verify(this.password, candidatePassword);
  };
  

divisionSchema.plugin(mongoosePaginate);
divisionSchema.plugin(aggregatePaginate);

export default mongoose.model('dm-divisions', divisionSchema);


