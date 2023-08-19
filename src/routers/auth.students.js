const { StudentRegister, StudentLogin } = require('../controllers/auth.student')

const router=require('express').Router()


router.post("/student/register",StudentRegister)


router.post("/student/login",StudentLogin)


module.exports=router