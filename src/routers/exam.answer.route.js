const {Router}=require('express')
const { addAnswer, getAnswer, deleteAnswer, updateAnswer } = require('../controllers/exam_answer.controller')
const { updatePass } = require('../controllers/auth.student')
const { Exam_result } = require('../controllers/result.controller')


const router=Router()

router.post('/submit-answer',addAnswer)

router.get('/exam-answers',getAnswer)

router.delete('/exam-answers/:id',deleteAnswer)

router.put('/exams/:id',updateAnswer)

router.put('/students/:id/updatePassword',updatePass)

router.get('/exam_results/:exam_id',Exam_result)


module.exports=router;