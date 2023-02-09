const {Router} = require('express');
const { getUsers, getDepartments, getInstrCourses, getCourses, getStudentCourses, getPrereq, dropCourse, addCourse, getInstrList } = require('../controllers/auth');
const router = Router();

router.get('/authenticate', getAuthentication);
router.get('/departments', getDepartments);
router.get('/courses', getCourseList);
router.get('/courseinfo', getCourseInfo);
router.get('/studcourses', getStudentCourses);
router.get('/dropcourse', dropCourse);
router.get('/addcourse', addCourse);
router.get('/instrcourses', getInstrCourses);
router.get('instrs', getInstrList);
router.get('/prereq', getPrereq);


module.exports = router;