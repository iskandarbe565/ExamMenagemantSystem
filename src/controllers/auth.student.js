const pg = require("../libs/pg");
const genaratePass=require('random-id-generator')

const uniqieUsename=require('uniqid')


const StudentRegister =async (req, res) => {
  const {group_id, first_name, last_name } = req.body;

let student_password=await genaratePass();
console.log(student_password);
let student_username=await uniqieUsename();
console.log(student_username);
  try {
  const result = await pg(`INSERT INTO students (student_password, student_username, group_id, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    student_password,
    student_username, 
    group_id, 
    first_name, 
    last_name);


    res.status(201).json({ id: result, message: 'Student registered successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Internal server error' });
  }
};

const StudentLogin =async (req, res) => {
  const { student_username, student_password } = req.body;

  try {
   
    const result = await (`SELECT id FROM students WHERE student_username = $1 AND student_password = $2`,
    student_password,
    student_username);

    if (result.length==1) {

      res.json({ id: result.id, message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid login credentials' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Internal server error' });
  }
};


// Update password
const updatePass=async (req, res) => {
  try {
    const studentId = req.params.id;
    const { new_password } = req.body;
    await pg(`
      UPDATE students
      SET student_password = $1
      WHERE id = $2;
    `,new_password,
    studentId);
    res.status(201).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(404).json({ error: 'Internal server error' });
  }
};


module.exports={
    StudentLogin,
    StudentRegister,
    updatePass
}