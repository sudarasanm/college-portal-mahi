 import express from "express"
// import { getBatch, getBranchCache, getCurriculum, getElectives, getRegulation } from "../controllers/AdminController.js"

// import { getAttendance, getAttendancePercent, getCourses, getMasterAttendance, getStaffTimetable, getStudentTimetable, postAttendance } from "../controllers/CIController.js"

import { getFaculty ,uploadDetials,downloadDetials} from "../controllers/CIController.js"
 const router = express.Router()


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

// router.get("/masterAttendance", getMasterAttendance);
// router.get("/attendance", getAttendance);
// router.post("/attendance", postAttendance);
// router.get("/courses", getCourses);
// router.get("/attendancePercent", getAttendancePercent);
// router.get("/staffTimetable", getStaffTimetable);
// router.get("/studentTimetable", getStudentTimetable);   
// //router.get("/demo", demo);

// /////////////////////// HALLTICKET MODULE ///////////////////////



// /////////////////////// ENROLLMENT MODULE ///////////////////////



// /////////////////////// RESULT MODULE ///////////////////////



// /////////////////////// REGISTRATION MODULE ///////////////////////



// /////////////////////// EXAM FEE MODULE ///////////////////////



// /////////////////////// EXAMINERS PANEL MODULE ///////////////////////



// /////////////////////// COURSE ATTAINMENT MODULE ///////////////////////

router.get("/getfaculty",getFaculty)
router.post("/uploadDetials",uploadDetials)
router.post("/DownloadeDetials",downloadDetials)

// /////////////////////// INTERNALS MODULE ///////////////////////



// /////////////////////// FEEDBACK MODULE ///////////////////////

//router.get("/feedback",getStudentFeedback)



export default router