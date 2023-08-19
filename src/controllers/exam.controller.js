  
const pg=require('../libs/pg')



const Exams= async (req, res) => {
    try {
      
      const exams = await pg(`SELECT * FROM exams`);
      res.status(200).json(exams);
    } catch (error) {
      
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  const studentStatus= async (req, res) => {
    try {
      const { student_id, exam_id, status } = req.body;
      
      const result = await pg(`INSERT INTO student_exam_status (student_id, exam_id, status)
      VALUES ($1, $2, $3) RETURNING id;`,
      student_id, 
      exam_id, 
      status);
      res.status(201).json({ id: result.id, message: 'Status submitted successfully' });
    } catch (error) {
     
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Imtihon yaratish
const AddExam= async (req, res) => {
    try {
      const { group_id, name, start_time, end_time } = req.body;
    
      const result = await pg(`INSERT INTO exams (group_id, name, start_time, end_time)
      VALUES ($1, $2, $3, $4) RETURNING id;`,
      group_id, 
      name, 
      start_time, 
      end_time) 
      res.status(201).json({ id: result.id, message: 'Exam created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  
// Imtihonni yangilash
const updateExam= async (req, res) => {
  try {
    const examId = req.params.id;
    const { group_id, name, start_time, end_time } = req.body;
    
    await pg(`UPDATE exams
    SET group_id = $1, name = $2, start_time = $3, end_time = $4
    WHERE id = $5;`,
    group_id,
     name,
      start_time,
       end_time,
        examId);
    res.status(200).json({ message: 'Exam updated successfully' });
  } catch (error) {
   
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Imtihonni o'chirish
const deleteExam= async (req, res) => {
  try {
    const examId = req.params.id;
   await  pg(`DELETE FROM exams WHERE id = $1;`,examId);
    
    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
  
    res.status(500).json({ error: 'Internal server error' });
  }
};




  module.exports={
    Exams,
    studentStatus,
    AddExam,
    updateExam,
    deleteExam,

  }