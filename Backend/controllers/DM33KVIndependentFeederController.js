import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import independentModel from "../models/distribution33KVIndependentModel.js";

export const import33kvIndependentController = async (req,res,next) => {

  try{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const results = [];
    const filePath = path.join(__dirname, '../data/distribution/33kvIndependence/IndependentFeeder_33KV.csv');
    
    fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data',  async(data) => {
      try {       
        
          let payload = {
             "discomName":data['Discom'],
             "zoneName":data['Zone'],
             "circleName":data['Circle'],
            "divisionName":data['Division'],
            "consumerName":data['33KV-AboveConsumerFeeder'],
            "feederVoltage":data['FeederVoltage'],
            "feederCategory":data['Category'],
            "projectArea":data['ProjectArea'],
            "supplyArea":data['SupplyArea'],
            "feederCode":data['FeederCode'],
            "meterMake":data['Meter-MakeType'],
            "meterSLNo":data['Meter-SlNo'],
            "overallMF":data['OverallMF'],
            "status":data['Status'],
            "consumerID":"",
            "lengthOfFeeder":"",
            "isDeleted":0,
            "transmissionsDetails":[],
          }
          let INDEPENDENT =  await  independentModel.create(payload);                       
              

      } catch (error) {
        console.error('Error processing data:', error);
        // Optionally, you can add error handling logic here.
      }
    })
    .on('end', () => {
      //console.log(results)
     res.status(200).json({ message: "Successfully processed", results });
    });


}catch(error){
    return res.status(500).send({message:"Export issue "+error,status:false,statusCode:500,user:[],errorMessage:error});
}
}

export const getIndependentFeeders = async (req, res) => {
  try {

    const {page, limit} = req.body;
      const query = { isDeleted: 0 }; // Only fetch non-deleted discoms
      const options = {
          page: page,
          limit: limit,
          sort: { _id: -1 } // Sort by discomName in ascending order
      };
      const result = await independentModel.paginate(query, options);
      return res.status(200).json({status:200,result:result});

  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing ', error });
  }
}




export const createIndependentFeeder = async (req,res) => {
  try {
      const {divisionName,consumerName,feederVoltage,feederCategory,projectArea,supplyArea,feederCode,meterMake,meterSLNo,overallMF,consumerID} = req.body;
      if (!divisionName || !consumerName ||!feederVoltage ||!feederCategory ||!projectArea ||!supplyArea || !feederCode  || !meterMake  || !meterSLNo || !overallMF  || !consumerID  ) {
        return res.status(400).send({ result:{},statusCode:"400", message: '* marked fields are required' });
      }
      const result = await independentModel.create(req.body)
      return res.status(200).send({ result:result,statusCode:"200", message: 'Created sucessfully' });
  } catch (error) {
      return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in adding incomming Feeder',error });
  }
}

export const updateIndependentFeeder = async (req,res) => {
  try {
    const {id,divisionName,consumerName,feederVoltage,feederCategory,projectArea,supplyArea,feederCode,meterMake,meterSLNo,overallMF,consumerID} = req.body;
    if (!id || !divisionName || !consumerName ||!feederVoltage ||!feederCategory ||!projectArea ||!supplyArea || !feederCode  || !meterMake  || !meterSLNo || !overallMF  || !consumerID  ) {
      return res.status(400).send({ result:{},statusCode:"400", message: '* marked fields are required' });
    }
      var resultCheck = await independentModel.findById(id);
      if(!resultCheck){
          return res.status(404).json({result:{},status:404,message: "ID not found"});
      }
      const result = await independentModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result:result,statusCode:"200", message: 'updated sucessfully' });
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in updating',error });
  }
}


export const deleteIndependentFeeder = async (req,res) => {
  try {

    const {id} = req.body;
    if (!id ){
        return res.status(400).json({status:400,message: "ID required"})
    }
    var resultCheck = await independentModel.findById(id);
    if(!resultCheck){
        return res.status(404).json({status:404,message: "ID not found"});
    }

      const deletedDiscom = await independentModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({status:200,message:"deleted successfully"});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in deleting ',error });
  }
}

export const update33kvFeedersStatus = async (req,res) => {
  try {
    const {id,status} = req.body;
    if (!id || !status ) {
      return res.status(400).send({ result:{},statusCode:"400", message: '* marked fields are required' });
    }
      var resultCheck = await independentModel.findById(id);
      if(!resultCheck){
          return res.status(404).json({result:{},status:404,message: "ID not found"});
      }
      const result = await independentModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result:result,statusCode:"200", message: 'updated sucessfully' });
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in updating',error });
  }
}

