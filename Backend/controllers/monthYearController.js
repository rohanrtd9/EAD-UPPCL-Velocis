import monthsModel from "../models/monthModel.js";
import yearsModel from "../models/yearModel.js";


export const addMonth = async (req,res) => {
  try {
      const {monthName} = req.body;
      if (!monthName) {
        return res.status(400).send({ result:{},statusCode:"400", message: 'Month name is required.' });
      }
      const result = await monthsModel.create(req.body)
      return res.status(200).send({ result:result,statusCode:"200", message: 'Month created sucessfully' });
  } catch (error) {
      return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in adding discom',error });
  }
}

export const listMonth = async (req,res) => {
  try {
    const {page, limit} = req.body;
      const query = { }; 
      const options = {
          page: page,
          limit: limit,
          sort: { _id: 1 } 
      };
      const result = await monthsModel.paginate(query, options);
      return res.status(200).json({status:200,result:result});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in listing discom',error });
  }
};

export const addYear = async (req,res) => {
    try {
        const {yearName} = req.body;
        if (!yearName) {
          return res.status(400).send({ result:{},statusCode:"400", message: 'Year name is required.' });
        }
        const result = await yearsModel.create(req.body)
        return res.status(200).send({ result:result,statusCode:"200", message: 'Year created sucessfully' });
    } catch (error) {
        return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in adding discom',error });
    }
  }
  
export const listYear = async (req,res) => {
    try {
      const {page, limit} = req.body;
        const query = { }; 
        const options = {
            page: page,
            limit: limit,
            sort: { _id: -1 } 
        };
        const result = await yearsModel.paginate(query, options);
        return res.status(200).json({status:200,result:result});
    } catch (error) {
      return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in listing discom',error });
    }
  };
