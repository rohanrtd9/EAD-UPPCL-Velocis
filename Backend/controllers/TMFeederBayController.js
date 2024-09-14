import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import zoneModel from "../models/transmissionZones.js";
import circleModel from "../models/transmissionCircleModel.js";
import divisionModel from "../models/transmissioDivision.js";
import substationsModel from "../models/transmissionSubstations.js";
import feederByModel from "../models/transmissionFeederBayModel.js";

export const exportFeedersController = async (req,res,next) => {

  try{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const results = [];
    const filePath = path.join(__dirname, '../data/transmission/feederBay-SOUTH-CENTRAL-ZONE-Masters6.csv');//SOUTH-CENTRAL-ZONE
    //const filePath = path.join(__dirname, '../data/transmission/feederBay-NORTH-EAST-ZONE-Masters5.csv');//NORTH-EAST-ZONE
    //const filePath = path.join(__dirname, '../data/transmission/feederBay-CENTRAL-ZONE-Masters4.csv');//CENTRAL-ZONE
    //const filePath = path.join(__dirname, '../data/transmission/feederBay-SOUTH-EAST-ZONE-Masters3.csv');//SOUTH-EAST-ZONE
    //const filePath = path.join(__dirname, '../data/transmission/feederBay-SOUTH-WEST-ZONE-Masters2.csv');//SOUTH-WEST-ZONE
    //const filePath = path.join(__dirname, '../data/transmission/feederBay-WEST-ZONE-Masters1.csv');//WEST-ZONE
    
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data',  async(data) => {
        try {
         
          const result1 =   await  zoneModel.findOne({zoneName:data['Zone']}); 
          const result2 =   await  circleModel.findOne({circleName:data['Circle']}); 
          const result3 =   await  divisionModel.findOne({divisionName:data['Division']}); 
          const result4 =   await  substationsModel.findOne({substationName:data['Substation']}); 
          if(result1 !==null && result1 !=""){
            let payload = {
              "zone_ID":result1._id,
              "circle_ID":result2._id,
              "division_ID":result3._id,
              "substation_ID":result4._id,
              "voltageLevel":"",
              "baySubstationName":data['FeederBay'],
              "interfaceType":data['InterfaceType'],
              "transactionType":"",
              "discom":""

            }
            let divisionns =  await  feederByModel.create(payload);   

          }else{
            //results.push(data['Division'])
            //console.log(data['Circle'])
          }               
                

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


export const createBays = async (req, res) => {
  try {
 
      const { zone_ID, circle_ID, division_ID, substation_ID, voltageLevel, baySubstationName,interfaceType,transactionType,discom } = req.body;
      if (!zone_ID || !circle_ID || !division_ID || !substation_ID || !voltageLevel || !baySubstationName|| !interfaceType || !transactionType || !discom ) {
          return res.status(400).send({ result: {}, statusCode: '400', message: '* marked fields are required' });
      }
      const result = await feederByModel.create(req.body);
      return res.status(200).send({ result, statusCode: '200', message: 'Bay created successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in adding zone', error });
  }
};

export const updateBay = async (req, res) => {
  try {
    const { id,zone_ID, circle_ID, division_ID, substation_ID, voltageLevel, baySubstationName,interfaceType,transactionType,discom } = req.body;
      if (!id || !zone_ID || !circle_ID || !division_ID || !substation_ID || !voltageLevel || !baySubstationName|| !interfaceType || !transactionType || !discom ) {
          return res.status(400).send({ result: {}, statusCode: '400', message: '* marked fields are required' });
      }
      const resultCheck = await feederByModel.findById(id);
      if (!resultCheck) {
          return res.status(404).json({ result: {}, statusCode: 404, message: 'ID not found' });
      }
      const result = await feederByModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result, statusCode: '200', message: 'Updated successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in updating substation', error });
  }
};

export const deleteBay = async (req, res) => {
  try {
      const { id } = req.body;
      if (!id) {
          return res.status(400).json({ statusCode: 400, message: 'ID required' });
      }
      const resultCheck = await feederByModel.findById(id);
      if (!resultCheck) {
          return res.status(404).json({ statusCode: 404, message: 'ID not found' });
      }
      const deletedDiscom = await feederByModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({ statusCode: 200, message: 'Deleted successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in deleting bay', error });
  }
};

export const getbaylist = async (req, res) => { 

    try {
      const { page = 1, limit = 10 } = req.body;
     
      const aggregateQuery = feederByModel.aggregate([
        { $match: { isDeleted: 0 } },
        { $lookup: {
            from: 'tm-circles',
            localField: 'circle_ID',
            foreignField: '_id',
            as: 'circleDetails'
        }}, 
        { $lookup: {
          from: 'tm-zones',
          localField: 'zone_ID',
          foreignField: '_id',
          as: 'zoneDetails'
      }}, 
      { $lookup: {
        from: 'tm-divisions',
        localField: 'division_ID',
        foreignField: '_id',
        as: 'divisionDetails'
      }},      
      { $lookup: {
        from: 'tm-substations',
        localField: 'substation_ID',
        foreignField: '_id',
        as: 'substationDetails'
      }},      
        { $unwind: { path: '$circleDetails', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$zoneDetails', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$divisionDetails', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$substationDetails', preserveNullAndEmptyArrays: true } },
        { $sort: { _id: -1 } }
    ]);

    const options = {
        page: Number(page),
        limit: Number(limit)
    };

    const result = await feederByModel.aggregatePaginate(aggregateQuery, options);

      return res.status(200).json({ statusCode: 200, result });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing zones '+error, error });
  } 


}

