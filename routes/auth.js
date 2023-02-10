const {Router} = require('express');
const { getAuthentication, getDepartments, getCourseList, getCourseInfo, getStudentCourses, dropCourse, 
     addCourse, getInstrCourses, getInstrList, getPrereq, getSearchResults, getRunningDepartments, getDepartmentCourses } = require('../controllers/auth');
const router = Router();

router.get('/authenticate', getAuthentication); //not checked
router.get('/departments', getDepartments); //checked
router.get('/courses', getCourseList); // checked
router.get('/courseinfo', getCourseInfo);
router.get('/studcourses', getStudentCourses);
router.get('/dropcourse', dropCourse);//checked
router.get('/addcourse', addCourse);//checked
router.get('/instrcourses', getInstrCourses); 
router.get('/instrs', getInstrList);
router.get('/prereq', getPrereq);//checked
router.get('/search', getSearchResults);
router.get('/runningDept', getRunningDepartments);
router.get('/deptCourses', getDepartmentCourses);


module.exports = router;