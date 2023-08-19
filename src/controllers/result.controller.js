const pg = require("../libs/pg");



// Imtihon javoblari qo'shish
const AddResult= async (req, res) => {
    try {
      const { exam_id, student_id, answers } = req.body;
      const result =await pg(` INSERT INTO exam_answers (exam_id, student_id, answers)
      VALUES ($1, $2, $3) RETURNING id;
    `,exam_id, 
    student_id,
     answers) ;
     res.status(201).json({ id: result.id, message: 'Exam answers submitted successfully' });
    } catch (error) {
   
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Imtihon bahlari ko'rish
const ResultExam=async (req, res) => {
    try {
      const studentId = req.params.student_id;
      const scores = await pg(`SELECT exam_id, answers->>\'score\' AS score FROM exam_answers WHERE student_id = $1`,studentId)
      res.status(200).json(scores.rows);
    } catch (error) {
      
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  const updateStatus= async (req, res) => {
    try {
      const { student_id, exam_id } = req.params;
      const { status } = req.body;
    await  pg(`UPDATE student_exam_status
        SET status = $1
        WHERE student_id = $2 AND exam_id = $3;`,
        status,
         student_id,
          exam_id)
      res.status(200).json({ message: 'Student exam status updated successfully' });
    } catch (error) {
     
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
const status= async (req, res) => {
  try {
    const studentId = req.params.student_id;
    
    const status = await pg(`SELECT * FROM student_exam_status WHERE student_id = $1;`,
    studentId);
    res.status(200).json(status);
  } catch (error) {
   
    res.status(500).json({ error: 'Internal server error' });
  }
};

const Exam_result= async (req, res) => {
  try {
    const examId = req.params.exam_id;
    const results = pg(`
      SELECT s.id AS student_id, s.first_name, s.last_name, e.status
      FROM students s
      INNER JOIN student_exam_status e ON s.id = e.student_id
      WHERE e.exam_id = $1;
    `,examId)
    
    res.status(200).json(results);
  } catch (error) {
   
    res.status(500).json({ error: 'Internal server error' });
  }
};

  module.exports={
    AddResult,
    ResultExam,
    updateStatus,
    status,
    Exam_result
  }