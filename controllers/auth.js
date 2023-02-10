const db = require('../db');
const bcrypt = require('bcrypt');
const HASHING_ROUNDS = 8;
// unchecked
exports.getAuthentication = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    // console.log(username+password)
    // (bcrypt.hash(password,HASHING_ROUNDS).then((PSS)=>{
    //     console.log(PSS);
    // }));
    db.query(`SELECT * FROM user_password WHERE ID='${username}'`, (err, result) => {
        if (err||result.rows.length===0) {
            res.status(200).json({authenticate:false,error:'Username not found'});
            return;
        }
        let pass_hash = result.rows[0].hashed_password;
        let pass_match = false;
        console.log(password,pass_hash);
        bcrypt.compare(password, pass_hash, function(err, result) {
            pass_match = result;
            if(pass_match){
                req.session.userdata = {
                    userid:username,
                }
                console.log(req.session)
            }
            res.status(200).json({authenticate : pass_match});
        });
    });
}


//checked
exports.getDepartments = async (req, res) => {
    db.query('SELECT dept_name FROM department', (err, result) => {
        if (err) {
            console.log(err);
        }
        const output = {
            data:result.rows,
            userdata:req.session.userdata
        }
        console.log(output)
        res.status(200).json(output);
    });
}


exports.getRunningDepartments = async (req, res) => {
    const sem = req.query.sem;
    const year = req.query.year;
    tmp_q = `SELECT DISTINCT course.dept_name FROM section, course WHERE section.year=${year} AND section.semester=${sem} AND
     section.course_id=course.course_id`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.status(200).json(result.rows);
        }
    });
}

exports.getDepartmentCourses = async (req, res) => {
    const sem = req.query.sem;
    const year = req.query.year;
    const dept = req.query.dept;

    tmp_q = `SELECT DISTINCT course.course_id, course.title FROM section, course WHERE section.year=${year} AND section.semester=${sem} AND
     section.course_id=course.course_id AND course.dept_name=${dept}`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.status(200).json(result.rows);
        }
    });
}

exports.getCourseList = async (req, res) => {
    tmp_q = `SELECT course_id, title FROM course`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.status(200).json(result.rows);
        }
    });
}

// new query
exports.getCourseInfo = async (req, res) => {
    let cid = req.query.cid;
    let year = req.query.year;
    let semester = req.query.semester;
    tmp_q = `SELECT * FROM course, teaches, prereq WHERE course.course_id=${cid} AND prereq.course_id=${cid} AND teaches.course_id=${cid} AND teaches.year=${year} AND teaches.semester=${semester}`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.status(200).json(result.rows);
        }
    });
}
exports.getHomePageInfo = async(req,res)=>{
    const userid = req.session
    if(req.session.userdata===undefined){
        res.json({userid:null})
        return;
    }
    //construct data.
    const userdata = {
        userid:req.session.userdata.userid
    };

    console.log(userid)
    res.status(200).json(userdata)
}
//checked
exports.getStudentCourses = async (req, res) => {
    let stud_id = req.query.id;
    tmp_q = `SELECT * from takes WHERE id='${stud_id}'`;
    // AND NOT EXISTS (SELECT * FROM instructor WHERE id=${stud_id})`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        else
        {
            res.status(200).json(result.rows);
        }
    });
}

//new query
exports.getStudentInfo = async (req, res) => {
    let stud_id = req.query.id;
    tmp_q = `SELECT * from takes WHERE takes.ID=${stud_id} 
    AND NOT EXISTS (SELECT * FROM instructor WHERE instructor.ID=${stud_ID})`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result.rows);
    });
}

// checked
exports.dropCourse = async (req, res) => {
    let stud_id  = req.query.id;
    let course_id = req.query.course_id;
    let section = req.query.section;
    let year = req.query.year;
    let semester = req.query.semester;
    tmp_q = `DELETE FROM takes WHERE takes.ID=${stud_id} AND takes.course_id=${course_id} AND takes.sec_id=${section} AND takes.year=${year} AND takes.semester=${semester}`;

    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.status(200).send(`Course ${course_id} dropped by student ${stud_id}`);
        }
    });
}

// checked
exports.addCourse = async (req, res) => {
    let stud_id  = req.query.id;
    let course_id = req.query.course_id;
    let section = req.query.section;
    let year = req.query.year;
    let semester = req.query.semester;
    tmp_q = `INSERT INTO takes VALUES (${stud_id}, ${course_id}, ${section}, ${semester}, ${year}, NULL)`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.status(200).send(`Course ${course_id} added by student ${stud_id}`);
        }
    });
}

//checked
exports.getInstrCourses = async (req, res) => {
    let year = req.query.year;
    let sem = req.query.sem;
    let prev = req.query.prev;
    console.log(`year : ${year}`);
    console.log(`sem : ${sem}`)
    console.log(`prev : ${prev}`)

    
    if(year === undefined || sem === undefined)
    {
        tmp_q = `SELECT * from teaches`;
    }
    else if(prev == 0)
    {
        tmp_q = `SELECT * from teaches WHERE year=${year} AND semester=${sem}
        ORDER BY course_id`;
    }else
    {
        tmp_q = `SELECT * from teaches WHERE NOT(year=${year} AND semester=${sem}) 
        ORDER BY year, semester, course_id`;    
    }

    console.log(tmp_q);
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result.rows);
    });
}

//new query
exports.getInstrList = async (req, res) => {
    tmp_q = `SELECT ID, name FROM instructor`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.status(200).json(result.rows);
        }
    });
}


// new query 
exports.getSearchResults = (req, res) => {
    qry = req.query.qry;
    tmp_q = `SELECT course_id, title FROM courses WHERE course_id LIKE '%${qry}%' OR title LIKE '%${qry}%'`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.status(200).json(result.rows);
        }
    });
}

//checked
exports.getPrereq = async (req, res) => {
    let cid = req.query.cid;

    if(cid === undefined)
    {
        tmp_q = `SELECT * FROM prereq`;
    }
    else
    {
        tmp_q = `SELECT * FROM prereq WHERE course_id=${cid}`;
    }
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result.rows);
    });
}


