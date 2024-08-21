import transformerModel from "../models/distributionTransformerModel.js";

export const addTransformer = async (req,res) => {
  try {
      const {distributionSubstationName} = req.body;
      if (!distributionSubstationName) {
        return res.status(400).send({ result:{},statusCode:"400", message: 'distributionSubstationName is required' });
      }
      const result = await transformerModel.create(req.body)
      return res.status(200).send({ result:result,statusCode:"200", message: 'Created sucessfully' });
  } catch (error) {
      return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in adding discom',error });
  }
}

export const editTransformer = async (req,res) => {
  try {
      const {id,distributionSubstationName} = req.body;
      if (!distributionSubstationName || !id) {
        return res.status(400).send({ result:{},statusCode:"400", message: 'distributionSubstationName and ID required' });
      }
      var resultCheck = await transformerModel.findById(id);
      if(!resultCheck){
          return res.status(404).json({result:{},status:404,message: "ID not found"});
      }
      const result = await transformerModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result:result,statusCode:"200", message: 'updated sucessfully' });
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in updating discom',error });
  }
}


export const softDeleteTransformer = async (req,res) => {
  try {

    const {id} = req.body;
    if (!id ){
        return res.status(400).json({status:400,message: "ID required"})
    }
    var resultCheck = await transformerModel.findById(id);
    if(!resultCheck){
        return res.status(404).json({status:404,message: "ID not found"});
    }

      const deletedTransformer = await transformerModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({status:200,message:"deleted successfully"});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in deleting discom',error });
  }
}


export const listTransformer= async (req,res) => {
  try {
    const {page, limit} = req.body;
      const query = { isDeleted: 0 }; // Only fetch non-deleted discoms
      const options = {
          page: page,
          limit: limit,
          sort: { distributionSubstationName: 1 } // Sort by distributionSubstationName in ascending order
      };
      const result = await transformerModel.paginate(query, options);
      return res.status(200).json({status:200,result:result});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in listing discom',error });
  }
};



