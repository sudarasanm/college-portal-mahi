// import express from "express"
// import { getBatch, getBranchCache, getCurriculum, getElectives, getRegulation } from "../controllers/AdminController.js"

import { uploadCA } from "../controllers/FAController";
import router from "./admin";


// import {  } from "../controllers/HODController.js"

// const router = express.Router()


// ///////////////////////  CACHE ///////////////////////

// // Batch cache
// router.get("/batch", getBatch)

// router.get("/branch/cache", getBranchCache)

// router.get("/regulation", getRegulation)


// ///////////////////////  ADMIN MODULE ///////////////////////
// router.get("/electives", getElectives)



// ///////////////////////  USERS MODULE ///////////////////////



// ///////////////////////  STUDENTS MODULE ///////////////////////



// ///////////////////////  FACULTY MODULE ///////////////////////



// /////////////////////// CURRICULUM MODULE ///////////////////////
// router.get("/curriculum", getCurriculum)



// /////////////////////// TIMETABLE MODULE ///////////////////////



// /////////////////////// ATTENDANCE MODULE ///////////////////////



// /////////////////////// HALLTICKET MODULE ///////////////////////



// /////////////////////// ENROLLMENT MODULE ///////////////////////



// /////////////////////// RESULT MODULE ///////////////////////



// /////////////////////// REGISTRATION MODULE ///////////////////////



// /////////////////////// EXAM FEE MODULE ///////////////////////



// /////////////////////// EXAMINERS PANEL MODULE ///////////////////////



// /////////////////////// COURSE ATTAINMENT MODULE ///////////////////////

router.post("/COA",uploadCA)

// /////////////////////// INTERNALS MODULE ///////////////////////



// /////////////////////// FEEDBACK MODULE ///////////////////////




// export default router