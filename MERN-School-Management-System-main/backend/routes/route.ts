const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.ts');

const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.ts');
const { complainCreate, complainList } = require('../controllers/complain-controller.ts');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.ts');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance } = require('../controllers/student_controller.ts');
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('../controllers/subject-controller.ts');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controllers/teacher-controller.ts');
const { 
    librarianRegister, 
    librarianLogIn, 
    getLibrarians, 
    getLibrarianDetail, 
    deleteLibrarian 
} = require("../controllers/librarian-controller.ts");
const { createFclass, getFclasses, updateFclass, deleteFclass } = require("../controllers/fclass-controller.ts");
const { createSection, getSections, updateSection, deleteSection } = require('../controllers/section-controller.ts');
// const { 
//     createSubjectGroup, 
//     getSubjectGroups, 
//     getSubjectGroupById, 
//     updateSubjectGroup, 
//     deleteSubjectGroup 
//   } = require('../controllers/subjectGroupController.ts');
  
//   router.post("/subjectgroups", createSubjectGroup);
//   router.get("/subjectgroups", getSubjectGroups);
//   router.get("/subjectgroups/:id", getSubjectGroupById);
//   router.put("/subjectgroups/:id", updateSubjectGroup);
//   router.delete("/subjectgroups/:id", deleteSubjectGroup);

      


router.post("/FclassCreate", createFclass);
router.get("/FclassList", getFclasses);
router.put("/Fclass/:id", updateFclass);
router.delete("/Fclass/:id", deleteFclass);

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)

router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// Subject

router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)

//librarian
 // ✅ `.ts` hata diya agar file `.js` hai

// ✅ Librarian Routes
router.post("/LibrarianReg", librarianRegister);
router.post("/LibrarianLogin", librarianLogIn);
router.get("/Librarians", getLibrarians);
router.get("/Librarian/:id", getLibrarianDetail);
router.delete("/Librarian/:id", deleteLibrarian);

//sections

// Section
router.post('/SectionCreate', createSection);
router.get('/SectionList', getSections);
router.put('/Section/:id', updateSection);
router.delete('/Section/:id', deleteSection);





module.exports = router;