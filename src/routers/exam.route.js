const {Router}=require('express')
const multer = require('multer');
const { Exams, studentStatus, AddExam, deleteExam, updateExam } = require('../controllers/exam.controller')
const pg = require('../libs/pg')

const router=Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage });

router.post('/upload-file', upload.single('file'), async (req, res) => {
    try {
      const { student_id, exam_id } = req.body;
      const file_name = req.files.filename;
      const result =await pg(`
        INSERT INTO evalutions (student_id, exam_id, file_name)
        VALUES ($1, $2, $3)
        RETURNING id;
      `,student_id,
       exam_id,
        file_name);
      res.status(201).json({ id: result.id, message: 'File uploaded successfully' });
    } catch (error) {
    
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
router.get('/exams',Exams)

router.post('/status',studentStatus)

router.post('/exams',AddExam)

router.delete('/exams/:id',deleteExam)

router.put('/exams/:id',updateExam)


module.exports=router