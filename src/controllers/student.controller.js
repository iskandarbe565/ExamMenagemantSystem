const pg = require("../libs/pg");



// Talabalarni olish
const getStudents= async (req, res) => {
    try {
      const result = await pg(`SELECT *FROM students`)
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching students' });
    }
  };
  
  // Talabaning ma'lumotlarini olish
  const getStudentById= async (req, res) => {
    const studentId = req.params.id;
    try {
      const result = await pg(`SELECT * FROM students WHERE id = $1`, 
      studentId)
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching student' });
    }
  };
  
  // Talabani tahrirlash
const UpdateStudent= async (req, res) => {
    
    const studentId = req.params.id;
    const { student_password,
        student_username, 
        group_id, 
        first_name, 
        last_name} = req.body;
    try {
        
      const result = await pg(`UPDATE students SET student_password=$1,
      student_username=$2, 
      group_id=$3, 
      first_name=$4, 
      last_name=$5 WHERE id = $6 RETURNING *`,
      student_password,
      student_username, 
      group_id, 
      first_name, 
      last_name,
      studentId
);      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error:'Error updating student' });
    }
  };
  
  // Talabani o'chirish
  const DeleteStudent= async (req, res) => {
    const studentId = req.params.id;
    try {
      await pg(`DELETE FROM students WHERE id = $1`, 
      studentId);
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting student' });
    }
  };
  


  module.exports={
    getStudents,
    getStudentById,
    UpdateStudent,
    DeleteStudent,
  }