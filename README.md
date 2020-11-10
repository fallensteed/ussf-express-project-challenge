use npm start or nodemon to start server at localhost:3005

Students has:
    studentid (auto generated)
    studentname (name of student)
    studentemail (email of student)

Grades has:
    gradeid (auto generated)
    studentid (id of student)
    grade (grade received)

GET /students will return all students in roster

GET /students?search= will take id number or name to search for student entry

GET /students/:studentid will return student detail by id

GET /grades/:studentid will return the gradebook entries for that student

POST to /grades will enter grade (requires: studentid and grade)

POST to /register will add student (requires: studentname and studentemail)
