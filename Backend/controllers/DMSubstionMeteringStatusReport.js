import substationModel from "../models/distributionSubstationModel.js";
import incommingModel from "../models/distributionIncommingModel.js";

export const SubstionMeteringStatusReport = async (req, res) => {
    try {
      const {
        page,
        limit,
        discomName,
        zoneName,
        circleName,
        divisionName,
        substationName,
        monthId,
        yearId
      } = req.body;
  
      // Define the aggregation pipeline
      const aggregateQuery = substationModel.aggregate([
        {
          $match: {
            isDeleted: 0,
            discomName: discomName,
            zoneName: zoneName,
            circleName: circleName,
            divisionName: divisionName,
            substationName: substationName
          }
        },
        {
          $lookup: {
            from: 'dm-incomming-feeders', // The collection to join with
            localField: 'substationName',  // Field in substationModel
            foreignField: 'substationName', // Field in dm-incomming-feeders
            as: 'incomingFeederDetails'    // Alias for the joined data
          }
        },
        {
          $unwind: '$incomingFeederDetails' // Unwind the array to get individual documents
        },
        // Lookup on dm-outgoing-feeders based on multiple fields from incomingFeederDetails
        {
          $lookup: {
            from: 'dm-outgoing-feeders', // Another collection to join
            let: {
              feederName: '$incomingFeederDetails.feederName',
              substationName: '$incomingFeederDetails.substationName',
              divisionName: '$incomingFeederDetails.divisionName'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$feederName', '$$feederName'] },
                      { $eq: ['$substationName', '$$substationName'] },
                      { $eq: ['$divisionName', '$$divisionName'] }
                    ]
                  }
                }
              },
              {
                $project: {
                  feederDetails: 1,
                  isDeleted: 1
                }
              }
            ],
            as: 'incomingFeederDetails.outgoingFeederDetails' // Attach to the incomingFeederDetails
          }
        },
        {
          $project: {
            discomName: 1,
            zoneName: 1,
            circleName: 1,
            divisionName: 1,
            substationName: 1,
            // Keep incomingFeederDetails along with nested outgoingFeederDetails
            incomingFeederDetails: 1
          }
        }
      ]);
  
      // Pagination options
      const options = {
        page: Number(page),
        limit: Number(limit)
      };
  
      // Execute the aggregate with pagination
      const result = await substationModel.aggregatePaginate(aggregateQuery, options);
  
      return res.status(200).json({ status: 200, result: result });
    } catch (error) {
      return res.status(500).send({
        result: {},
        statusCode: '500',
        message: 'Error occurred in listing discom',
        error
      });
    }
  };
  
