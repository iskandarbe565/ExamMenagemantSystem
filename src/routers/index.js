const authRoute=require('./auth.route')

const evalutionRoute=require('./evalution.route')

const groupRoute=require('./group.route')

const examRoute=require('./exam.route')

const resultRoute=require('./result.route')

const StudentRoute=require('./auth.students')

const studentRoute=require('./student.route')

const examAnswer=require('./exam.answer.route')


module.exports=[
    authRoute,
    evalutionRoute,
    groupRoute,
    examRoute,
    resultRoute,
    StudentRoute,
    studentRoute,
    examAnswer,



]