

// ///////////////////////  ADMIN MODULE ///////////////////////

// import { EnrollmentModel } from "../models/EnrollmentModel.js";
// import { SemesterMetadataModel } from "../models/SemesterMetadataModel.js";
// import { MasterTimetableModel } from "../models/MasterTimetableModel.js";
// import { AttendanceModel } from "../models/AttendanceModel.js";
import { COAttainment } from "../models/CofileModel.js"

 import { CourseDetailsModel } from "../models/CourseDetailsModel.js";
 import {FacultyModel} from "../models/FacultyModel.js"
// import { CurriculumModel } from "../models/CurriculumModel.js";
// import { StudentsModel } from "../models/StudentsModel.js";

// ///////////////////////  USERS MODULE ///////////////////////



// ///////////////////////  STUDENTS MODULE ///////////////////////



// ///////////////////////  FACULTY MODULE ///////////////////////



// /////////////////////// CURRICULUM MODULE ///////////////////////



// /////////////////////// TIMETABLE MODULE ///////////////////////



// /////////////////////// ATTENDANCE MODULE ///////////////////////


// export const demo = async (req,res) => {
//     try{
//         res.status(200).json(await MasterTimetableModel.find({_id:"63faea970fbbb6e187cba951"}))
//     } catch(err) { res.status(400).send("Failed: " + err.message) }
// }

// //Completed
// export const getAttendance = async (req,res) => {

//     try{
        
//         let result = []
//         let { date, batch, branch } = req.query
        
//         //Get all periods of the day..
//         let data = await MasterTimetableModel.find({date:date,batch:batch,branch:branch}, {marked:1,period:1,courseId:1,branch:1, batch:1}).populate("courseId", {courseId:1, courseCode:1})
//         await CurriculumModel.populate(data, {path:"courseId.courseId", select:{title:1}})
//         data = data.map(period => ( period.toObject() ) )
        
//         //Iterate for each period...
//         for(let period of data){
//             console.log(period)
//             //Check if Data exist...
//             if (period.marked==0){

//                 //Get data from EnrollmentModel
//                 let students = await EnrollmentModel.find({courseId:period.courseId, batch:batch, branch:branch}, {_id:0, studentId:1, courseId:1 }).populate("studentId", {register:1, firstName:1, lastName:1})
//                 students = students.map( student => student.toObject() )

//                 //Regularize data for front-end
//                 //Sending all data to push easier at save...
//                 for(let student of students){
//                     student.masterTimetableId = period._id
//                     student.courseCode = period.courseId.courseCode
//                     student.courseName = period.courseId.courseId.title
//                     student.branch = period.branch
//                     student.batch = period.batch
//                     student.register = student.studentId.register
//                     student.studetName = student.studentId.firstName+" "+student.studentId.lastName
//                     student.studentId = student.studentId._id
//                     student.date = date
//                     student.period = period.period
//                     student.present = true
//                     student.onduty = false
//                     result.push({...student})
//                 }

//             }else{

//                 //Get exist data...
//                 let students = await AttendanceModel.find({batch:batch, branch:branch, date:date, period:period.period}).populate("studentId", {register:1, firstName:1, lastName:1})
//                 students = students.map(student => student.toObject())
//                 for(let student of students){
//                     student.register = student.studentId.register
//                     student.studentName = student.studentId.firstName+" "+student.studentId.lastName
//                     student.studentId = student.studentId._id
//                     result.push({...student})
//                 }

//             }

//         }

//         res.status(200).json(result);

//     } catch(err) { res.status(400).send("Request Failed: " + err.message); }

// }


// //Completed
// export const postAttendance = async (req,res) => {

//     try{

//         let data = req.body
//         let result = []

//         //Iterate over each student
//         for(let student of data){

//             //Check if Document exist
//             if(student.hasOwnProperty("_id")){
//                 await AttendanceModel.updateOne({_id:student._id}, {present:student.present, onduty:student.onduty})
//             }else{
//                 delete student.courseName
//                 delete student.studentName
//                 delete student.register
//                 result.push({...student})
//             }

//         }

//         //Create new entries if needed
//         if(result.length!=0){
//             await AttendanceModel.insertMany(result);
//         }

//         await MasterTimetableModel.updateMany({branch:data[0].branch, batch:data[0].batch, date:data[0].date}, {marked:true})
        
//         res.status(200).send("Update Successful")
    
//     } catch(err) { res.status(400).send("Request Failed: " + err.message); }

// }


// //Completed...
// export const getAttendanceReport = async (req,res) => {

//     try{
        
//         let { start_date, end_date, branch, batch } = req.query
//         start_date = new Date(start_date)
//         end_date = new Date(end_date)
//         batch = parseInt(batch)

//         //Take report using group-by studentId
//         let data = await AttendanceModel.aggregate(
//             [
//                 {
//                     "$match": {
//                         branch:branch,
//                         batch:batch,
//                         date:{
//                             $gte: start_date,
//                             $lte:end_date
//                         }
//                     },
//                 },
//                 {
//                     "$project": {
//                         studentId:1,
//                         courseId:1,
//                         batch:1,
//                         presented: {  
//                             $cond: [ { $eq: ["$present", true ] }, 1, 0]
//                         },
//                     }
//                 },
//                 {
//                     $group:{
//                         _id:{
//                             "studentId":"$studentId",
//                             "courseId":"$courseId"
//                         },
//                         total:{$count:{}},
//                         present:{$sum:"$presented" },
//                     }
//                 }

//             ]
//         )

//         await StudentsModel.populate(data, {path:"_id.studentId", select:{register:1, firstName:1, lastName:1}})
//         await CourseDetailsModel.populate(data, {path:"_id.courseId", select:{courseId:1, courseCode:1}})
//         await CurriculumModel.populate(data, {path:"_id.courseId.courseId", select:{title:1}})
        
//         //Regularize data for front-end
//         for(let student of data){
//             student.register = student._id.studentId.register,
//             student.studentName = student._id.studentId.firstName + " " + student._id.studentId.lastName
//             student.courseCode = student._id.courseId.courseCode
//             student.courseName = student._id.courseId.courseId.title
//             student.percent = student.present / student.total *100 
//             delete student._id
//         }

//         res.status(200).json(data)

//     } catch(err) { res.status(400).send("Request Failed: " + err.message); }

// }


// /////////////////////// HALLTICKET MODULE ///////////////////////



// /////////////////////// ENROLLMENT MODULE ///////////////////////



// /////////////////////// RESULT MODULE ///////////////////////



// /////////////////////// REGISTRATION MODULE ///////////////////////



// /////////////////////// EXAM FEE MODULE ///////////////////////



// /////////////////////// EXAMINERS PANEL MODULE ///////////////////////



// /////////////////////// COURSE ATTAINMENT MODULE ///////////////////////
export const getDetials = async (req,res) =>{
    try{
        const final = await CourseDetailsModel.aggregate([
            {$match:{}},
            {
            $lookup:{
            from:"Faculty",
            localField:"facultyId",
            foreignField:"_id",
            as:"facultyDetails"
            }
            },
            {$unwind:"$facultyDetails"},
            {
            $project:{ branch: 1, 
                _id: 0,
                courseCode: 1,
                semester: 1,
                firstname :"$facultyDetails.firstName"
            }
            }]
            )
        const length = final.length
        res.status(200).json({
            success: true,
            final,
            length
        })

    }catch(err) { res.status(400).send("Request Failed: " + err.message) }
}

export const getuploadedData = async (req,res)=>{
    try{
        const test = await COAttainment.find({},{_id:0})
        res.status(200).json({
            success:true,
            test
        })
    }catch(err) { res.status(400).send("Request Failed: " + err.message) }
}


// export const uploadCA = async(req,res) => {
//     try{
//         let file = req.files.data

//         let loadfile = await excelToJson(file)

//         let result = await COAttainmentModel.create(loadfile)

//         res.status(200).json(result);

//     }
    
//     catch (err) { res.status(400).send('Request Failed: ' + err.message) }

// }


// /////////////////////// INTERNALS MODULE ///////////////////////



// /////////////////////// FEEDBACK MODULE ///////////////////////

// export const getStudentFeedback = async(req, res) => {

//     try{
//         let { facultyId } = req.query

//         let result = await CourseDetailsModel.find({ facultyId:facultyId, courseCode: {$courseCode: courseCode} })

//         res.status(200).send(result)
//     }
//     catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// // Controller function to get course code
// export  const getCourseCode = async (req, res) => {
//     const { courseId } = req.params  // Assuming courseId is available in request params
  
//     try {
//       const courseDetails = await CourseDetailsModel.findOne({ courseId })
 
//       if (!courseDetails)
//       {
//         return res.status(404).json({ message: "Course details not found" })
//       }

//       const { courseCode } = courseDetails
//       res.status(200).json({ courseCode })

//     } 

//     catch (error) { res.status(400).send('Request Failed: ' + err.message) }    
// }