const pg = require("../libs/pg");




// Add scores
 const AddScores=async (req, res) => {
    try {
      const { student_id, exam_id, score } = req.body;
      const isActive = true; // Set isActive to true initially
      const result=await pg( `
        INSERT INTO student_exam_scores (student_id, exam_id, score, isActive)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `,student_id,
       exam_id,
        score, 
        isActive);
      
     
      res.status(201).json({ id: result.id, message: 'Score added successfully' });
    } catch (error) {
     
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Update score and status
  const updateScore= async (req, res) => {
    try {
      const scoreId = req.params.id;
      const { score, isActive } = req.body;
await pg(`
        UPDATE student_exam_scores
        SET score = $1, isActive = $2
        WHERE id = $3;
      `,score,
       isActive, 
       scoreId)
      res.status(200).json({ message: 'Score updated successfully' });
    } catch (error) {
     
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const Evaluation =async (req, res) => {
    try {
      const { student_id, exam_id, score } = req.body;
      const isActive = score >= 60 ? true : false;
  
      const result=await pg(`
        INSERT INTO student_exam_scores (student_id, exam_id, score, isActive)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `,student_id, 
      exam_id,
       score, 
       isActive);
      
      
      await pg(`
        INSERT INTO evalutions (baho)
        VALUES ($1)
        RETURNING id;
      `,score);
      
      res.status(201).json({ id: result.id, message: 'Exam evaluation recorded successfully' });
    } catch (error) {
    
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  


  module.exports={
    AddScores,
    updateScore,
    Evaluation,
  }