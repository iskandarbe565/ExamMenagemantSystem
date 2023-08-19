

const pg=require('../libs/pg')

const addAnswer= async (req, res) => {
    try {
      const { exam_id, student_id, answers } = req.body;
      
      const result = await pg(`INSERT INTO exam_answers (exam_id, student_id, answers)
      VALUES ($1, $2, $3)
      RETURNING id`,
      exam_id, 
      student_id, 
      answers);
      res.status(201).json({ id: result.id, message: 'Answers submitted successfully' });
    } catch (error) {
     
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Javoblar ro'yxati
const getAnswer= async (req, res) => {
  try {
    const examAnswers = await pg(`SELECT * FROM exam_answers;`)
    
    res.status(201).json(examAnswers);
  } catch (error) {
  
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Javoblar yangilash
const updateAnswer= async (req, res) => {
  try {
    const examAnswersId = req.params.id;
    const { exam_id, student_id, answers } = req.body;
    await pg(`
      UPDATE exam_answers
      SET exam_id = $1, student_id = $2, answers = $3
      WHERE id = $4;
    `,exam_id, 
    student_id,
     answers,
      examAnswersId);
 
    res.status(201).json({ message: 'Exam answers updated successfully' });
  } catch (error) {
  
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Javoblar o'chirish
const deleteAnswer= async (req, res) => {
  try {
    const examAnswersId = req.params.id;

   await pg(`DELETE FROM exam_answers WHERE id = $1`,examAnswersId)
    
    res.status(201).json({ message: 'Exam answers deleted successfully' });
  } catch (error) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

  
  module.exports={
    addAnswer,
    getAnswer,
    deleteAnswer,updateAnswer
  }