const {Router}=require('express')
const { AddGroup, getGroup, updateGroup, deleteGroup } = require('../controllers/group.controller')


const router=Router()

router.post('/groups',AddGroup)

router.get('/groups',getGroup)

router.put('/groups/:id',updateGroup)

router.delete('/groups/:id',deleteGroup)



module.exports=router;