import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import outgoingModel from "../models/distributionOutgoingModel.js";
import tempOutgoingModel from "../models/distributionTempOutgoingModel.js";

// export const importOutGoingFeederController = async (req,res,next) => {

//   try{
//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = path.dirname(__filename);    
//     const results = [];
//     const filePath = path.join(__dirname, '../data/distribution/outgoingFeeder/csv/DAKSHINANCHAL-OutgoingMasterData.csv');
    
//     fs.createReadStream(filePath)
//     .pipe(csvParser())
//     .on('data',  async(data) => {
//       try {       
        
//         const outgoingResponse =   await  tempOutgoingModel.findOne({divisionName:data['Division'],substationName:data['DistributionSub-StationName'],feederName:data['NameIncomingFeeder']}); 
       
//         if(outgoingResponse){
//           // console.log("data found")
//           let payload = {
           
//             "feederDetails":[
//               {
//                 "feederVoltage":data['FeederVoltage'],
//                 "outgoingFeederName":data['NameOutgoingFeeder'],
//                 "feederCategory":data['CategoryFeeder'],
//                 "projectArea":data['ProjectArea'],
//                 "supplyArea":data['SupplyArea'],
//                 "feederCode":data['FeederCode'],
//                 "meterMake":data['MeterMakeType'],
//                 "meterSLNo":data['MeterSlNo'],
//                 "noOfConsumers":'',
//                 "overallMF":data['OverallMF'],
//                 "mappedEDD":data['MappedEDD'],
//                 "status":data['Status']
//               }
//             ]
//           }
//           let substation = await outgoingModel.findByIdAndUpdate(
//             outgoingResponse._id,
//             { $push: { feederDetails: payload } },
//             { new: true } // To return the updated document
//           );

//         }else{
//           // console.log("data not found")
//           let payload = {
//             "discomName":data['Discom'],
//             "zoneName":data['Zone'],
//             "circleName":data['Circle'],
//             "divisionName":data['Division'],
//             "substationName":data['DistributionSub-StationName'],
//             "feederName":data['NameIncomingFeeder'],
//             "feederDetails":[
//               {
//                 "feederVoltage":data['FeederVoltage'],
//                 "outgoingFeederName":data['NameOutgoingFeeder'],
//                 "feederCategory":data['CategoryFeeder'],
//                 "projectArea":data['ProjectArea'],
//                 "supplyArea":data['SupplyArea'],
//                 "feederCode":data['FeederCode'],
//                 "meterMake":data['MeterMakeType'],
//                 "meterSLNo":data['MeterSlNo'],
//                 "noOfConsumers":'',
//                 "overallMF":data['OverallMF'],
//                 "mappedEDD":data['MappedEDD'],
//                 "status":data['Status']
//               }
//             ]
//           }
//           let substation =  await  outgoingModel.create(payload);             
//         }  

//       } catch (error) {
//         console.error('Error processing data:', error);
//         // Optionally, you can add error handling logic here.
//       }
//     })
//     .on('end', () => {
//       //console.log(results)
//      res.status(200).json({ message: "Successfully processed", results });
//     });


// }catch(error){
//     return res.status(500).send({message:"Export issue "+error,status:false,statusCode:500,user:[],errorMessage:error});
// }
// }

export const importTempOutGoingFeederController = async (req, res, next) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, '../data/distribution/outgoingFeeder/csv/PASCHIMANCHAL-OutgoingMasterData-3.csv');

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', async (data) => {
        try {
          // import temp feeders object from CSV data
          const feederDetails = {
            discomName: data['Discom'],
            zoneName: data['Zone'],
            circleName: data['Circle'],
            divisionName: data['Division'],
            substationName: data['DistributionSub-StationName'],
            feederName: data['NameIncomingFeeder'],
            outgoingFeederName: data['NameOutgoingFeeder'],
            feederCode: data['FeederCode'],
            feederVoltage: data['FeederVoltage'],
            feederCategory: data['CategoryFeeder'],
            supplyArea: data['SupplyArea'],
            projectArea: data['ProjectArea'],
            meterMake: data['MeterMakeType'],
            meterSLNo: data['MeterSlNo'],
            overallMF: data['OverallMF'],
            mappedEDD: data['MappedEDD'],
            status: data['Status'],
            noOfConsumers: ''
          };
          await tempOutgoingModel.create(feederDetails);

        } catch (error) {
          console.error('Error processing data:', error);
        }
      })
      .on('end', () => {
        res.status(200).json({ message: "Successfully processed" });
      });

  } catch (error) {
    return res.status(500).send({ message: "Export issue " + error, status: false, statusCode: 500, user: [], errorMessage: error });
  }
};

export const importOutGoingFeederController = async (req, res, next) => {
  const resultData = await tempOutgoingModel.find({});
    try {
      
        for (const record of resultData) {
            const {
              discomName,zoneName,circleName, 
              divisionName,
              substationName,
              feederName,
              feederVoltage,
              outgoingFeederName,
              feederCategory,
              projectArea,
              supplyArea,
              feederCode,
              meterMake,
              meterSLNo,
              overallMF,
              mappedEDD,
              status
            } = record;
        const existingRecord = await outgoingModel.findOne({
          discomName,
          divisionName,
          substationName,
          feederName
        });
        let payload = {
          feederVoltage,
          outgoingFeederName,
          feederCategory,
          projectArea,
          supplyArea,
          feederCode,
          meterMake,
          meterSLNo,
          noOfConsumers: '', // This value remains empty as per your requirement
          overallMF,
          mappedEDD,
          status,
        };
  
        if (existingRecord) {          
          let responseDataa = await outgoingModel.findByIdAndUpdate(
            existingRecord._id,
            { $push: { feederDetails: payload } },
            { new: true } // To return the updated document
          );

        } else {
          // If it doesn't exist, insert a new document
          const newRecord = new outgoingModel({
            discomName,zoneName,circleName, divisionName,substationName,feederName,feederDetails: payload
          });
          await newRecord.save();
          console.log(`Inserted new record for ${divisionName}, ${substationName}, ${feederName}`);
        }
      }
      res.status(200).json({ message: "Data imported" });
    } catch (error) {
      console.error("Error inserting/updating records:", error);
    }    
    return false;    
};

export const getOutgoingFeeders = async (req, res) => {
  try {

    const {page, limit,discomName,zoneName, circleName, divisionName,substationName} = req.body;
      const query = { discomName:discomName,zoneName:zoneName, circleName:circleName, divisionName:divisionName,substationName:substationName,isDeleted: 0 }; // Only fetch non-deleted discoms
      const options = {
          page: page,
          limit: limit,
          sort: { _id: -1 } // Sort by discomName in ascending order
      };
      const result = await outgoingModel.paginate(query, options);
      return res.status(200).json({status:200,result:result});

  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing ', error });
  }
}

export const createOutgoingFeeder = async (req,res) => {
  try {
      const {divisionName,substationName,feederName} = req.body;
      if (!divisionName || !substationName ||!feederName ) {
        return res.status(400).send({ result:{},statusCode:"400", message: '* marked fields are required' });
      }
      const result = await outgoingModel.create(req.body)
      return res.status(200).send({ result:result,statusCode:"200", message: 'Created sucessfully' });
  } catch (error) {
      return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in adding Outgoing Feeder',error });
  }
}

export const updateOutgoingFeeder = async (req,res) => {
  try {
    const {divisionName,substationName,feederName,id} = req.body;
    if (!id, !divisionName || !substationName ||!feederName ) {
      return res.status(400).send({ result:{},statusCode:"400", message: '* marked fields are required' });
    }
      var resultCheck = await outgoingModel.findById(id);
      if(!resultCheck){
          return res.status(404).json({result:{},status:404,message: "ID not found"});
      }
      const result = await outgoingModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result:result,statusCode:"200", message: 'updated sucessfully' });
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in updating',error });
  }
}


export const deleteOutgoingFeeder = async (req,res) => {
  try {

    const {id} = req.body;
    if (!id ){
        return res.status(400).json({status:400,message: "ID required"})
    }
    var resultCheck = await outgoingModel.findById(id);
    if(!resultCheck){
        return res.status(404).json({status:404,message: "ID not found"});
    }

      const deletedDiscom = await outgoingModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({status:200,message:"deleted successfully"});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in deleting ',error });
  }
}




// export const listDMSubStationController = async(req,res,next)=>{
//   try{
//     const pageNumber = req.body.page || 1;
//     const pageSize = req.body.pageSize || 200;
   
//     var searchStr = {}

//     await substationModel.paginate(searchStr , { page: pageNumber, limit: pageSize,sort:{_id:-1}  }, (err, result) => {
//     if (err) {
//         return res.status(404).send({message:"Error occurred while fetching records",status:404,records:[]});
//     }
//     const { docs, totalDocs, limit, page, totalPages,prevPage,nextPage    } = result;
//     return res.status(200).send({ status:200,records: docs, Total:totalDocs, Limit:limit, Page:page, pages:totalPages,prevPage:prevPage, nextPage:nextPage});
//     });

// }catch(error){
//     return res.status(500).send({message:"error occured",status:500,errorMessage:error,records:[]});
// }


// }