const db = require('../db');

// await
exports.getAuthentication = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    console.log(username+password)
    db.query(`SELECT * FROM user_password WHERE ID=${username}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        let pass_hash = result.rows[0].hashed_password;
        let pass_match = false;
        bcrypt.compare(password, pass_hash, function(err, result) {
            pass_match = result;
        });
        res.status(200).json({authenticate : pass_match});
    });
}


//checked
exports.getDepartments = async (req, res) => {
    db.query('SELECT dept_name FROM department', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result.rows);
    });
}


//checked
exports.getCourses = async (req, res) => {
    db.query('SELECT * FROM course', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result.rows);
    });
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
        res.status(200).json(result.rows);
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