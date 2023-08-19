const { AddResult, ResultExam, updateStatus, status } = require('../controllers/result.controller')

const router=require('express').Router()


router.get('/student-scores/:student_id',AddResult )

router.post('/exam-answers',ResultExam)

router.put('/student-exam-status/:student_id/:exam_id',updateStatus)

router.get('/student_exam_status/:student_id',status)


module.exports=router