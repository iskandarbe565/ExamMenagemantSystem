const {Router}=require('express')
const { updateScore, AddScores, Evaluation } = require('../controllers/evalution.controller')


const router=Router()

router.post('/scores',AddScores)

router.put('/scores/:id',updateScore)

router.post('/evaluate-exam',Evaluation)

module.exports=router