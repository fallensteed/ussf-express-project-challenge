const express = require('express')
const app = express()
const port = 3005

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let students = [
    {
        studentid: 1,
        studentname: 'Alpha',
        studentemail: 'alpha@student.mail'
    },
    {
        studentid: 2,
        studentname: 'Beta',
        studentemail: 'beta@student.mail'
    },
    {
        studentid: 3,
        studentname: 'Gamma',
        studentemail: 'gamma@student.mail'
    },
    {
        studentid: 4,
        studentname: 'Delta',
        studentemail: 'delta@student.mail'
    },
    {
        studentid: 5,
        studentname: 'Echo',
        studentemail: 'echo@student.mail'
    }
]

let grades = [
    {
        gradeid: 1,
        studentid: 1,
        grade: 90
    },
    {
        gradeid: 2,
        studentid: 1,
        grade: 80
    },
    {
        gradeid: 3,
        studentid: 2,
        grade: 91
    },
    {
        gradeid: 4,
        studentid: 3,
        grade: 75
    },
    {
        gradeid: 4,
        studentid: 3,
        grade: 62
    },
    {
        gradeid: 5,
        studentid: 4,
        grade: 90
    },
    {
        gradeid: 6,
        studentid: 4,
        grade: 95
    },
    {
        gradeid: 7,
        studentid: 1,
        grade: 99
    },
    {
        gradeid: 8,
        studentid: 3,
        grade: 75
    },
    {
        gradeid: 9,
        studentid: 2,
        grade: 85
    }
]

app.get('/', (req, res) => res.send('Welcome to the app.'));

app.get('/students', (req, res) => {
    if (req.query.search) {
        if (parseInt(req.query.search) > 0) {
            res.send(students.filter(student => student.studentid == req.query.search))
        } else if (typeof req.query.search === 'string') {
            res.send(students.filter(student => student.studentname.toLowerCase() == req.query.search.toLowerCase()))
        }
    } else {
        res.send(students);
    }
});

app.get('/students/:studentid', (req, res) => res.send(students.filter(student => student.studentid == req.params.studentid)));

app.get('/grades/:studentid', (req, res) => res.send(grades.filter(grade => grade.studentid == req.params.studentid)));

app.post('/grades', (req, res) => {
    let {studentid, grade} = req.body;
    let result = {};
    if(studentid && grade){
        let lastid = grades[grades.length - 1].gradeid;
        lastid++;
        req.body.gradeid = lastid;
        grades.push(req.body);
        result = {status: 'Success', message: 'Student result added to the gradebook'};
    } else {
        result = {status: 'Failed', message: 'Not added to the gradebook. Must have studentid and grade.'};
        res.status(400);
    }
    res.json(result);
});

app.post('/register', (req, res) => {
    let {studentname, studentemail} = req.body;
    let result = {};
    if(studentname && studentemail){
        let lastid = students[students.length - 1].studentid;
        lastid++;
        req.body.studentid = lastid;
        students.push(req.body);
        result = {status: 'Success', message: 'Student result added to the roster'};
    } else {
        result = {status: 'Failed', message: 'Not added to the roster. Must have studentname and studentemail.'};
        res.status(400);
    }
    res.json(result);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))