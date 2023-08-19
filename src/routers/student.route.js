const{Router}=require('express')
const { getStudents, getStudentById, UpdateStudent, DeleteStudent } = require('../controllers/student.controller')

const router=Router()

router.get('/students',getStudents)

router.get('/students/:id',getStudentById)

router.put('/students/:id',UpdateStudent)

router.delete('/students/:id',DeleteStudent)

module.exports=router