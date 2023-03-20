import { FeedbackModel } from "../models/FeedbackModel.js"

import { FeedbackQuestionsModel } from "../models/FeedbackQuestionsModel.js"

import { CourseDetailsModel } from "../models/CourseDetailsModel.js"

// import { StudentsModel } from "../models/StudentsModel.js"
// import { StudentDetailsModel } from "../models/StudentDetailsModel.js"
// import {COAttainmentModel} from "../models/COAttainmentModel.js"

import { COAttainment } from "../models/CofileModel.js"
import { excelToJson, jsonToExcel } from "../utilities/excel-parser.js"
// import { FacultyModel } from "../models/FacultyModel.js"
// import { UsersModel } from "../models/UsersModel.js"
// import { CalendarModel } from "../models/CalendarModel.js"
// import { SemesterMetadataModel } from "../models/SemesterMetadataModel.js"
// import { redis } from "../index.js"
// import { BranchModel } from "../models/BranchModel.js"
// import { CurriculumModel } from "../models/CurriculumModel.js"
// import { ElectiveMetadataModel } from "../models/ElectiveMetadataModel.js"

// ///////////////////////  CACHE ///////////////////////

// //Batch cache
// function setCache(redisKey, data){
//     redis.set(redisKey, JSON.stringify(data))
// }

// export const getBatch = async (req, res) => {

//     try {

//         let data = await redis.get("SEMESTER_METADATA")

//         if(data!==null) data = JSON.parse(data)
//         else{

//             data = await SemesterMetadataModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
//             setCache("SEMESTER_METADATA", data)

//         }

//         data = data.map( doc => doc.batch )
//         data = new Set(data.sort(function(a, b){return(b-a)}))
//         res.status(200).json({ batches: [...data] }) 

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// export const getBranchCache = async (req, res) => {

//     try {

//         let data = await redis.get("BRANCH")

//         if(data!==null) data = JSON.parse(data)
//         else{

//             data = await BranchModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
//             setCache("BRANCH", data)

//         }

//         res.status(200).json(data)

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// export const getRegulation = async (req, res) => {

//     try {

//         let data = await redis.get("SEMESTER_METADATA")

//         if(data!==null) data = JSON.parse(data)
//         else{

//             data = await SemesterMetadataModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
//             setCache("SEMESTER_METADATA", data)

//         }

//         data = data.map( doc => doc.regulation )
//         data = new Set(data.sort(function(a, b){return(b-a)}))
//         res.status(200).json({ batches: [...data] }) 

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// ///////////////////////  ADMIN MODULE ///////////////////////

// //Create calendar
// export const createCalendar = async (req, res) => {

//     try {

//         let { from, to, isSaturdayHoliday } = req.body

//         from = new Date(from)
//         to = new Date(to)

//         let dates = generateCalendar(from, to, isSaturdayHoliday)

//         let check = await CalendarModel.find({ date: { $in:[from, to] } })

//         if(check.length==0)  await CalendarModel.create(dates) 
//         else res.status(200).send("Date already exist in calendar")

//         res.status(200).send("Success")

//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// export const manageSaturday = async (req, res) => {

//     try {

//         let { from, to, batches, isWorkingDay } = req.body

//         let data = await CalendarModel.find({ date: { $gte: new Date(from), $lte: new Date(to) }, day: 'Saturday' }, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ date: 'asc' })

//         for (let doc of data) {

//             doc.isWorkingDay = isWorkingDay
//             if (isWorkingDay) {

//                 batches.forEach(batch => {
//                     (!doc.batches.includes(batch)) && doc.batches.push(batch)
//                 })

//             } else{
//                 doc.order = null
//                 doc.batches = null
//             }

//             let _id = doc._id
//             delete doc._id

//             await CalendarModel.updateOne({ _id: _id }, doc)

//         }

//         res.status(200).send("Success")


//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// export const declareHoliday = async (req, res) => {

//     try {

//         let load = req.body

//         if (isDayOrder) {

//             let currentOrder = load[0].order

//             let currentDate = load[0].date

//             for (let doc of load) {
//                 let id = doc._id
//                 delete doc._id
//                 doc.isWorkingDay = false
//                 doc.order = null
//                 doc.batches = null

//                 await CalendarModel.updateOne({ _id: id }, doc)
//             }

//             let data = await CalendarModel.find({ date: { $gte: new Date(currentDate) }, isWorkingDay: true }, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ date: 'asc' })

//             data.map(async doc => {

//                 if (doc.day != "Saturday") {
//                     (doc.order = currentOrder)
//                     if ((currentOrder % 5) == 0) {
//                         currentOrder = 5
//                         currentOrder = 1
//                     } else currentOrder++
//                 }

//                 let id = doc._id
//                 delete doc._id
//                 await CalendarModel.updateOne({ _id: id }, doc)
//             })


//         } else {

//             for (let doc of data) {
//                 let id = doc._id
//                 delete doc._id
//                 doc.isWorkingDay = false
//                 doc.order = null
//                 doc.batches = null
//                 await CalendarModel.updateOne({ _id: id }, doc)
//             }

//         }

//         res.status(200).json(await CalendarModel.find().sort({ date: 'asc' }))
//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// export const addWorkingDay = async (req, res) => {

//     try {

//         let data = { ...req.body, isWorkingDay: true }
//         await CalendarModel.updateOne({ date: (data.date) }, data)

//         res.status(200).send("Success")

//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// export const getAllDates = async (req, res) => {

//     try {

//         let data = await CalendarModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ date: 'asc' })

//         res.status(200).json(data)

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// export const manageBatchInCalendar = async (req, res) => {

//     try {

//         let { batch, from, to, addBatch } = req.body

//         let data = await CalendarModel.find({ date: { $gte: new Date(from), $lte: new Date(to) }, batch: { $contains : batch  }, isWorkingDay: true }, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ date: 'asc' })

//         data = data.map(async doc => {

//             if(!addBatch){
//                 doc.batches = doc.batches.filter( ele => ele != batch )
//                 if(doc.batches) (doc.order = null)
//             }else if(!doc.batches.includes(batch)) doc.batches.push(batch)
//             let id = doc._id
//             delete doc._id
//             await CalendarModel.updateOne({_id:id}, doc)
//         } )

//         res.status(200).send("Success")

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// export const extendSemesterDuration = async (req, res) => {

//     try {

//         let { from, to, batch, proccedDayOrderWith } = req.body

//         //This allots the day order for the batch for the given dates
//         let data = await CalendarModel.find({ date: { $gte: new Date(from), $lte: new Date(to) }, isWorkingDay: true }, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ date: 'asc' })
//         if (!isDayOrder) {
//             for (let doc of data) {
//                 if(!doc.batches.includes(batch)) doc.batches.push(batch)
//                 if( doc.isWorkingDay && doc.order == null ) (doc.order = doc.date.getDay())

//                 let _id = doc._id
//                 delete doc._id
//                 await CalendarModel.updateOne({ _id: _id }, doc)
//             }

//         } else {

//             let dayOrder = data[0].order ?? proccedDayOrderWith
//             for (let doc of data) {

//                 if(!doc.batches.includes(batch)) doc.batches.push(batch)

//                 let currentDayOrder = dayOrder
//                 if ((dayOrder % workingDaysPerWeek) == 0) {
//                     currentDayOrder = workingDaysPerWeek
//                     dayOrder = 1
//                 } else dayOrder++
//                 doc.order = doc.order ?? currentDayOrder

//                 let _id = doc._id
//                 delete doc._id
//                 await CalendarModel.updateOne({ _id: _id }, doc)
//             }

//         }



//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }
// // Generates calendar for given dates
// function generateCalendar(startDate, endDate, isSaturdayHoliday = true) {

//     let currentDate = new Date(startDate);
//     endDate = new Date(endDate)

//     let dates = [];
//     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

//     while (currentDate <= endDate) {

//         let day = currentDate.getDay()

//         let isWorkingDay = (isSaturdayHoliday && day == 6) || (day == 0) ? false : true

//         dates.push({ date: new Date(currentDate), day: days[day], isWorkingDay: isWorkingDay });

//         currentDate.setDate(currentDate.getDate() + 1);

//     }

//     return dates;

// }


// //Semester Metadata
// export const createMetadata = async (req, res) => {

//     try {

//         let metaData = req.body
//         let batch = metaData.batch, semester = metaData.sem, from = metaData.begin, to = metaData.end, isDayOrder = metaData.schedule.isDayOrder, workingDaysPerWeek = metaData.schedule.workingDaysPerWeek

//         //This allots the day order for the batch for the given dates
//         let data = await CalendarModel.find({ date: { $gte: new Date(from), $lte: new Date(to) }, isWorkingDay: true }, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ date: 'asc' })
//         if (!isDayOrder) {
//             for (let doc of data) {
//                 if(!doc.batches.includes(batch)) doc.batches.push(batch)
//                 if( doc.isWorkingDay && doc.order == null ) (doc.order = doc.date.getDay())

//                 let _id = doc._id
//                 delete doc._id
//                 await CalendarModel.updateOne({ _id: _id }, doc)
//             }

//         } else {

//             let dayOrder = data[0].order ?? 1
//             for (let doc of data) {

//                 if(!doc.batches.includes(batch)) doc.batches.push(batch)

//                 let currentDayOrder = dayOrder
//                 if ((dayOrder % workingDaysPerWeek) == 0) {
//                     currentDayOrder = workingDaysPerWeek
//                     dayOrder = 1
//                 } else dayOrder++

//                 doc.order = doc.order ?? currentDayOrder

//                 let _id = doc._id
//                 delete doc._id
//                 await CalendarModel.updateOne({ _id: _id }, doc)
//             }

//         }

//         let forCache = await SemesterMetadataModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })

//         //Checks whether the batch and sem already exists
//         let check = forCache.filter( (doc) => doc.batch == batch && doc.sem == semester )

//         //Creates a doc in semester metadata
//         if (check.length==0){ 
//             await SemesterMetadataModel.create(metaData)
//             forCache.push(metaData)
//             setCache("SEMESTER_METADATA", forCache)
//             res.status(200).send("Semester metadata created successfully!")
//         }

//         else res.status(200).send("Semester for this batch already exists !!!")

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// export const updateMetadata = async (req, res) => {

//     try {

//         let updates = req.body

//         let id = updates._id

//         delete updates._id

//         await SemesterMetadataModel.updateOne( {_id: id}, updates )

//         let forCache = await SemesterMetadataModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
//         setCache("SEMESTER_METADATA", forCache)

//         res.status(200).send("Semester metadata updated successfully!")

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// export const getMetadata = async (req, res) => {

//     try {

//         let meta = await SemesterMetadataModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ createdAt:'desc' })

//         res.status(200).json(meta)

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// //Branch
// export const manageBranch = async (req, res) => {
//     try {

//         let data = req.body

//         await BranchModel.updateOne( { branch: data.branch }, data, { upsert: true } )

//         let branch = await BranchModel.find( {}, { createdAt: 0, updatedAt: 0, __v: 0 } )

//         setCache("BRANCH", branch)

//         res.status(200).send("Branch updates successfully!")

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// export const getBranch = async (req, res) => {

//     try {

//         let data = await BranchModel.find( {}, { createdAt: 0, updatedAt: 0, __v: 0 } )

//         res.status(200).json(data)

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// // Electives
// export const manageElectives = async (req, res) => {
//     try {

//         let data = req.body

//         await ElectiveMetadataModel.updateOne( { branch: data.branch }, data, { upsert: true } )

//         let electives = await ElectiveMetadataModel.find( {}, { createdAt: 0, updatedAt: 0, __v: 0 } )

//         res.status(200).send("Electives updates successfully!")

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// export const getElectives = async (req, res) => {

//     try {

//         let data = await ElectiveMetadataModel.find( {}, { createdAt: 0, updatedAt: 0, __v: 0 } )

//         res.status(200).json(data)

//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// ///////////////////////  USERS MODULE ///////////////////////
// export const getStudentUsers = async (req, res) => {

//     try {

//         let { batch } = req.query

//         // Finds students by batch and returning the result with only required fields
//         let students = await StudentsModel.find({ batch }, { __v: 0, createdAt: 0, updatedAt: 0, regulation: 0, degree: 0, dob: 0 })

//         res.status(200).json(students)

//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// // Create or delete student account from collection based on activation status
// export const manageStudentAccount = async (req, res) => {

//     try {

//         let students = req.body

//         students.forEach(async student => {

//             let id = student._id

//             delete student["_id"]

//             let credentials = { email: student.email, personalEmail: student.personalEmail, userType: "Student" }

//             if (student.isActive) await UsersModel.updateOne({ email: student.email }, credentials, { upsert: true })
//             else await UsersModel.deleteOne({ email: student.email })

//             await StudentsModel.updateOne({ _id: id }, student)

//         })

//         res.status(200).send(students.length + " student document(s) updated")
//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// // Gets the all faculty from the db 
// export const getFacultyUser = async (req, res) => {

//     try {

//         let faculty = await FacultyModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0, admin: 0, cfa: 0, hod: 0, pc: 0, ttc: 0, fa: 0, ci: 0, primaryRole: 0, address: 0 })

//         res.status(200).json(faculty)

//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// // This function manages the faculty account - either the faculty user get added to the user model or get deleted from the user model 
// // When the admin move the user from the acive to inactive state or vice versa
// export const manageFacultyAccount = async (req, res) => {

//     try {

//         let faculty = req.body

//         faculty.forEach(async doc => {

//             let id = doc._id

//             delete doc._id

//             let credentials = { email: doc.email, personalEmail: doc.personalEmail, userType: "Faculty" }

//             if (doc.isActive) await UsersModel.updateOne({ email: doc.email }, credentials, { upsert: true })
//             else await UsersModel.deleteOne({ email: doc.email }, doc)

//             await FacultyModel.updateOne({ _id: id }, doc)

//         })

//         res.status(200).send(faculty.length + " faculty document(s) updated")

//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// ///////////////////////  STUDENTS MODULE ///////////////////////

// // Filters the trash documents and updates the remainig documents
// export const updateStudent = async (req, res) => {

//     try {

//         studentUpdation(req.body)

//         res.status(200).send("Student data updated successfully!")

//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// // Gets all the students of a particular batch
// export const getStudents = async (req, res) => {

//     try {

//         let { batch } = req.query

//         let ids = await StudentsModel.find({ batch }, { _id: 1 })

//         let Students = await StudentDetailsModel.find({ studentId: { $in: ids.map(student => student._id) } }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }).populate("studentId", { __v: 0, createdAt: 0, updatedAt: 0 })

//         Students = Students.map(doc => {
//             doc = doc.toObject()
//             let Student = doc.studentId
//             delete doc.studentId
//             doc = { ...Student, ...doc }
//             return doc
//         })

//         res.status(200).json(Students)

//     } catch (err) { res.status(400).send("Request Failed: " + err.message) }
// }


// // This returns the xlsx file with required students data
// export const downloadStudents = async (req, res) => {

//     try {

//         let { ids } = req.query

//         let Students = await StudentDetailsModel.find({ studentId: { $in: ids } }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }).populate("studentId", { __v: 0, createdAt: 0, updatedAt: 0 })

//         Students = Students.map(doc => {
//             doc = doc.toObject()
//             let Student = doc.studentId
//             delete doc.studentId
//             doc = { ...Student, ...doc }
//             return doc
//         })

//         let blob = jsonToExcel(Students)

//         res.status(200).send(blob)

//     } catch (err) { res.status(400).send("Request Failed: " + err.message) }
// }

// // Uploads the students
// export const uploadStudents = async (req, res) => {

//     try {

//         let file = req.files.students

//         let load = await excelToJson(file), create = [], update = []

//         let { data, trash } = filterValidStudentDocuments(load)

//         let result = await StudentsModel.find({ register: { $in: data.map(doc => doc.register) } }, { register: 1 })

//         // Find existing documents
//         for (let doc of data) {
//             let flag = true
//             for (let rdoc of result) {
//                 if (doc.register == rdoc.register) {
//                     update.push({ ...doc, _id: rdoc._id })
//                     flag = false
//                     break
//                 }
//             } flag && create.push({ ...doc })
//         }

//         // Creation
//         if (create.length > 0) await studentCreation(create)

//         // Updation
//         if (update.length > 0)
//             for (let doc of update)
//                 await studentUpdation(doc)

//         let documents = {
//             total: load.length,
//             created: create.length,
//             update: update.length,
//             trash: trash.length
//         }

//         res.status(200).json({ documents, trash: [...trash] })

//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// const studentCreation = async (data) => {

//     // Creates Id and stores the id for 2 schema
//     data = data.map(doc => { doc["studentId"] = doc["_id"] = mongoose.Types.ObjectId(); return doc })

//     await StudentsModel.create(data)

//     data = data.map(doc => { delete doc["_id"]; return doc })

//     await StudentDetailsModel.create(data)
// }

// const studentUpdation = async (data) => {

//     const id = data._id

//     delete data._id

//     await StudentsModel.updateOne({ _id: id }, data)

//     await StudentDetailsModel.updateOne({ studentId: id }, data)
// }

// const filterValidStudentDocuments = (load) => {

//     let trash = [], data = [], required = ["register", "regulation", "batch", "degree", "branch", "currentSemester", "email", "firstName", "lastName", "dob"]

//     // Filter valid documents
//     for (let doc of load) {
//         let valid = true
//         for (let field of required)
//             if (!doc[field]) {
//                 trash.push({ ...doc })
//                 valid = false
//                 break
//             }
//         valid && data.push({ ...doc })
//     }
//     return { data, trash }

// }

// ///////////////////////  FACULTY MODULE ///////////////////////
// export const updateFaculty = async (req, res) => {

//     try {

//         facultyUpdation(req.body)

//         res.status(200).send("Faculty data updated successfully")

//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// export const getFaculty = async (req, res) => {

//     try {

//         let faculty = await FacultyModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })

//         res.status(200).json(faculty)

//     } catch (err) { res.status(400).send("Request Failed: " + err.message) }
// }

// export const uploadFaculty = async (req, res) => {

//     try {

//         let file = req.files.faculty

//         let load = await excelToJson(file), create = [], update = []

//         let { data, trash } = filterValidFacultyDocuments(load)

//         let result = await FacultyModel.find({ facultyId: { $in: data.map(doc => doc.facultyId) } }, { facultyId: 1 })

//         // Find existing documents
//         for (let doc of data) {
//             let flag = true
//             for (let rdoc of result) {
//                 if (doc.facultyId == rdoc.facultyId) {
//                     update.push({ ...doc, _id: rdoc._id })
//                     flag = false
//                     break
//                 }
//             } flag && create.push({ ...doc })
//         }

//         // Creation
//         if (create.length > 0) await facultyCreation(create)

//         // Updation
//         if (update.length > 0)
//             for (let doc of update)
//                 await facultyUpdation(doc)

//         let documents = {
//             total: load.length,
//             created: create.length,
//             update: update.length,
//             trash: trash.length
//         }

//         res.status(200).json({ documents, trash: [...trash] })

//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }
// }

// // This returns the xlsx file with required faculty data
// export const downloadFaculty = async (req, res) => {

//     try {

//         let { ids } = req.query

//         let Faculty = await FacultyModel.find({ _id: { $in: ids } }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 })

//         let blob = jsonToExcel(Faculty)

//         res.status(200).send(blob)

//     } catch (err) { res.status(400).send("Request Failed: " + err.message) }
// }

// const facultyCreation = async (data) => {

//     await FacultyModel.create(data)

// }

// const facultyUpdation = async (data) => {

//     const id = data._id

//     delete data._id

//     await FacultyModel.updateOne({ _id: id }, data)

// }


// const filterValidFacultyDocuments = (load) => {

//     let trash = [], data = [], required = ["facultyId", "email", "personalEmail", "mobile", "primaryRole", "branch", "firstName", "lastName"]

//     // Filter valid documents
//     for (let doc of load) {
//         let valid = true
//         for (let field of required)
//             if (!doc[field]) {
//                 trash.push({ ...doc })
//                 valid = false
//                 break
//             }
//         valid && data.push({ ...doc })
//     }
//     return { data, trash }

// }


// /////////////////////// CURRICULUM MODULE ///////////////////////

// const curriculumUpdation = async (data) => {

//     const id = data._id

//     delete data._id

//     await CurriculumModel.updateOne({ _id: id }, data)

// }


// const curriculumCreation = async (data) => {

//     await CurriculumModel.create(data)

// }

// const filterValidCurriculumDocuments = (load) => {

//     let trash = [], data = [], required = ["courseCode", "title", "type", "category", "semester", "regulation", "branch","type", "hours", "marks"]

//     // Filter valid documents
//     for (let doc of load) {
//         let valid = true
//         for (let field of required)
//             if (!doc[field]) {
//                 trash.push({ ...doc })
//                 valid = false
//                 break
//             }
//         valid && data.push({ ...doc })
//     }
//     return { data, trash }

// }

// export const uploadCurriculum = async (req, res) => {

//     try {

//         let file = req.files.curriculum

//         let load = await excelToJson(file), create = [], update = []

//         let { data, trash } = filterValidCurriculumDocuments(load)

//         let result = await CurriculumModel.find({ courseCode: { $in: data.map(doc => doc.courseCode) } }, { courseCode: 1 })

//         // Find existing documents
//         for (let doc of data) {
//             let flag = true
//             for (let rdoc of result) {
//                 if (doc.courseCode == rdoc.courseCode) {
//                     update.push({ ...doc, _id: rdoc._id })
//                     flag = false
//                     break
//                 }
//             } flag && create.push({ ...doc })
//         }

//         // Creation
//         if (create.length > 0) await curriculumCreation(create)

//         // Updation
//         if (update.length > 0)
//             for (let doc of update)
//                 await curriculumUpdation(doc)

//         let documents = {
//             total: load.length,
//             created: create.length,
//             update: update.length,
//             trash: trash.length
//         }

//         res.status(200).json({ documents, trash: [...trash] })




//     } catch(err) { res.status(400).send('Request Failed: '+ err.message) }
// }

// export const getCurriculum = async (req, res) => {

//     try {

//         let { regulation } = req.query
//         let curriculum = await CurriculumModel.find({ regulation: regulation }, { __v: 0, createdAt: 0, updatedAt: 0 })

//         res.status(200).json(curriculum)

//     } catch (err) { res.status(400).send("Request Failed: " + err.message) }
// }

// export const updateCurriculum = async (req, res) => {

//     try {

//         curriculumUpdation(req.body)

//         res.status(200).send("Course updated successfully!")

//     } catch (err) { res.status(400).send('Request Failed: ' + err.message) }

// }
// /////////////////////// TIMETABLE MODULE ///////////////////////



// /////////////////////// ATTENDANCE MODULE ///////////////////////



// /////////////////////// HALLTICKET MODULE ///////////////////////



// /////////////////////// ENROLLMENT MODULE ///////////////////////



// /////////////////////// RESULT MODULE ///////////////////////



// /////////////////////// REGISTRATION MODULE ///////////////////////



// /////////////////////// EXAM FEE MODULE ///////////////////////



// /////////////////////// EXAMINERS PANEL MODULE ///////////////////////



// /////////////////////// COURSE ATTAINMENT MODULE ///////////////////////
export const getFaculty = async (req,res) =>{
  try{
      const test = await CourseDetailsModel.find({ facultyId: "63f42892a8a5c50a79ed265f" }, { branch: 1, _id: 0, courseCode: 1, branch: 1, semester: 1 })

      res.status(200).json({
          success: true,
          test
      })

  }catch(err) { res.status(400).send("Request Failed: " + err.message) }
}

export const uploadDetials = async (req, res) => {
  console.log(req.data);
  try {
    let file = req.files.data 

    let loadfile = await excelToJson(file)

    let result = await COAttainment.create(loadfile)

    res.status(200).json(result);

  }

  catch (err) { res.status(400).send('Request Failed: ' + err.message) }

}

export const downloadDetials = async (req, res) => {
try {

  let { COAttainments } = await COAttainment.find({ batch: { $batch: batch } })

  let blob = jsonToExcel(COAttainments)

  res.status(200).send(blob)
}

catch (err) { res.status(400).send('Request Failed: ' + err.message) }
}


// /////////////////////// INTERNALS MODULE ///////////////////////



// /////////////////////// FEEDBACK MODULE ///////////////////////

export const uploadFeedback = async (req, res) => {
  console.log(req.data);
  try {
    let file = req.files.data

    let loadfile = await excelToJson(file)

    let result = await FeedbackQuestionsModel.create(loadfile)

    res.status(200).json(result);

  }

  catch (err) { res.status(400).send('Request Failed: ' + err.message) }

}

//Feedback Report Download

export const downloadFeedback = async (req, res) => {
  try {

    let { FeedbackReport } = await FeedbackModel.find({ batch: { $batch: batch } })

    let blob = jsonToExcel(FeedbackReport)

    res.status(200).send(blob)
  }

  catch (err) { res.status(400).send('Request Failed: ' + err.message) }
}

//Score Calculation


export const calculateScore = async (req, res) => {
  try {
    const feedbackId = req.params.feedbackId; // assuming that feedbackId is passed as a URL parameter
    const feedback = await FeedbackModel.findById(feedbackId).populate('feedback.questionId');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    let score = 0;
    for (let i = 0; i < feedback.feedback.length; i++) {
      const question = feedback.feedback[i].questionId;
      const weightage = question.weightage || 1; // assuming that the question weightage is 1 if not defined
      const response = feedback.feedback[i].score || 0; // assuming that the response score is 0 if not defined
      score += weightage * response;
    }

    return res.json({ score });
  }
  catch (error) { res.status(400).send('Request Failed: ' + err.message) }
}


