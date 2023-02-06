const {Router} = require('express');
const { getUsers, getDepartments, getInstrCourses, getCourses, getStudentCourses, getPrereq } = require('../controllers/auth');
const router = Router();

router.get('/authenticate', getAuthentication);
router.get('/departments', getDepartments);
router.get('/courses', getCourses);
router.get('/studcourses', getStudentCourses);
// router.get('./instrcourses', getInstrCourses);
router.get('/instrcourses', getInstrCourses);
router.get('/prereq', getPrereq);


module.exports = router;