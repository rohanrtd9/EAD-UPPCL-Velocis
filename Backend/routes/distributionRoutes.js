import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {exportController,createSubstation,updateSubstation,getSubstations,getDivisionSubstations,deleteSubstation} from "../controllers/DMSubstationController.js";
import {listDMSubdivisionController} from "../controllers/DMSubdivisionController.js";
import {exportDistrictController,createDistrict,updateDistrict,getDistricts,deleteDistricts} from "../controllers/DMDistrictsController.js";
import {exportZonesController,createZone,updateZone,deleteZone,getZones,getDiscomZones,exportZoneToCsv} from "../controllers/DMZonesController.js";
import {exportCircleController,createCircle,updateCircle,getCircles,getZoneCircles,deleteCircle,exportCircleToCsv} from "../controllers/DMCircleController.js";
import {exportDiscomController,addDiscom,editDiscom,listDiscoms,softDeleteDiscom} from "../controllers/DiscomController.js";
import {exportDivisionController,createDivision,updateDivision,getDivisions,getCircleDivisions,deleteDivision,exportDivisionToCsv} from "../controllers/DMDivisionController.js";
import { importIncomingFeederController,createIncommingFeeder, deleteIncommingFeeder, getIncommingFeeders, updateIncommingFeeder,updateIncommingFeedersStatus } from "../controllers/DMIncommingFeederController.js";
import { importTempOutGoingFeederController,importOutGoingFeederController,createOutgoingFeeder, deleteOutgoingFeeder, getOutgoingFeeders, updateOutgoingFeeder,importTempBaypointController,importBayspointController } from "../controllers/DMOutgoingFeederController.js";
import { import33kvIndependentController,createIndependentFeeder, deleteIndependentFeeder, getIndependentFeeders, updateIndependentFeeder,update33kvFeedersStatus } from "../controllers/DM33KVIndependentFeederController.js";
import { addTransformer, editTransformer, softDeleteTransformer, listTransformer } from "../controllers/DMTransformerController.js";
 
import {loginController,changePasswordController} from "../controllers/userController.js";
import {addMonth,listMonth,addYear,listYear} from "../controllers/monthYearController.js";

import {SubstionMeteringStatusReport} from "../controllers/DMSubstionMeteringStatusReport.js";



const router = express.Router();

router.post("/login",  loginController);
router.post('/change-password', changePasswordController);



// router.get("/dm-substation/list",  listDMSubStationController);
// router.get("/dm-subdivision/list",  listDMSubdivisionController);
//router.post("/import-discom",  exportDiscomController);
router.post("/add-discom",  addDiscom);
router.put("/edit-discom",  editDiscom);
router.post("/list-discom",  listDiscoms);
router.delete("/delete-discom",  softDeleteDiscom);

//router.post("/import-zones",  exportZonesController);
router.post("/add-zone",  createZone);
router.put("/edit-zone",  updateZone);
router.post("/list-zone",  getZones);
router.post("/list-discom-zone",  getDiscomZones);
router.delete("/delete-zone",  deleteZone);
router.post("/export-zone-to-csv",  exportZoneToCsv); 


//router.post("/import-circle",  exportCircleController);
router.post("/add-circle",  createCircle);
router.put("/edit-circle",  updateCircle);
router.post("/list-circle",  getCircles);
router.post("/list-zone-circle",  getZoneCircles);
router.delete("/delete-circle",  deleteCircle);
router.post("/export-circle-to-csv",  exportCircleToCsv); 



//router.post("/import-division",  exportDivisionController);
router.post("/add-division",  createDivision);
router.put("/edit-division",  updateDivision);
router.post("/list-division",  getDivisions);
router.post("/list-circle-division",  getCircleDivisions);
router.delete("/delete-division",  deleteDivision);
router.post("/export-division-to-csv",  exportDivisionToCsv); 


//router.post("/import-district",  exportDistrictController);
router.post("/add-district",  createDistrict);
router.put("/edit-district",  updateDistrict);
router.post("/list-districts",  getDistricts);
router.delete("/delete-district",  deleteDistricts);

//router.post("/import-substation",  exportController);
router.post("/add-substation",  createSubstation);
router.put("/edit-substation",  updateSubstation);
router.post("/list-substation",  getSubstations);
router.post("/list-division-substation",  getDivisionSubstations);
router.delete("/delete-substation",  deleteSubstation);


router.post("/import-incoming-feeder",  importIncomingFeederController);
router.post("/add-incomming-feeder",  createIncommingFeeder);
router.put("/edit-incomming-feeder",  updateIncommingFeeder);
router.delete("/delete-incomming-feeder",  deleteIncommingFeeder);
router.post("/list-incomming-feeder",  getIncommingFeeders);

router.post("/import-temp-all-outgoing-feeder",  importTempOutGoingFeederController);
router.post("/import-outgoing-feeder",  importOutGoingFeederController);
router.post("/add-outgoing-feeder",  createOutgoingFeeder);
router.put("/edit-outgoing-feeder",  updateOutgoingFeeder);
router.delete("/delete-outgoing-feeder",  deleteOutgoingFeeder);
router.post("/list-outgoing-feeder",  getOutgoingFeeders);
router.post("/import-33KVIndependent-feeder",  import33kvIndependentController);
router.post("/add-33KVIndependent-feeder",  createIndependentFeeder);
router.put("/edit-33KVIndependent-feeder",  updateIndependentFeeder);
router.delete("/delete-33KVIndependent-feeder",  deleteIndependentFeeder);
router.post("/list-33KVIndependent-feeder",  getIndependentFeeders);
router.post("/update-33KV-feeder-status",  update33kvFeedersStatus);

router.post("/add-transformer",  addTransformer);
router.put("/edit-transformer",  editTransformer);
router.delete("/delete-transformer",  softDeleteTransformer);
router.post("/list-transformer",  listTransformer);

router.post("/add-month",  addMonth);
router.post("/add-year",  addYear);
router.post("/monthList",  listMonth);
router.post("/yearList",  listYear);

router.post("/update-incoming-feeder-status",  updateIncommingFeedersStatus);
router.post("/import-temp-bay-point",  importTempBaypointController);
router.post("/import-bay-point",  importBayspointController);

router.post("/report/_SubstionMeteringStatusReport",  SubstionMeteringStatusReport);



export default router;