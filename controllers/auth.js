const db = require('../db');

// await
exports.getAuthentication = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
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

exports.getDepartments = async (req, res) => {
    db.query('SELECT dept_name FROM department', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result.rows);
    });
}

exports.getCourses = async (req, res) => {
    db.query('SELECT * FROM course', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result.rows);
    });
}

exports.getStudentCourses = async (req, res) => {
    let stud_id = req.params.id;
    tmp_q = `SELECT * from takes WHERE takes.ID=${stud_id} 
    AND NOT EXISTS (SELECT * FROM instructor WHERE instructor.ID=${stud_ID})`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result.rows);
    });
}

exports.getInstrCourses = async (req, res) => {
    let year1 = req.params.year1;
    let sem1 = req.params.sem1;
    let year2 = req.params.year2;
    let sem2 = req.params.sem2;

    tmp_q = `SELECT * from takes WHERE 
    (takes.year=${year1} AND takes.semester=${sem1}) OR
    (takes.year=${year2} AND takes.semester=${sem2})`;

    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result.rows);
    });
}

exports.getPrereq = async (req, res) => {
    tmp_q = `SELECT * FROM prereq`;
    db.query(tmp_q, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result.rows);
    });
}