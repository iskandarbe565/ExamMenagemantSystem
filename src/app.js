const express=require('express')
const config = require('../config')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const cookie=require('cookie-parser')
const ejs=require('ejs')
const routes = require('./routers')
const bodyParser=require('body-parser')
const app=express()
app.use(cors({
    origin:"*"
}))

app.use(bodyParser.json())
app.use(fileUpload())
app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(process.cwd()+'/public'))
app.use(express.static(process.cwd()+'/src/views'))
app.use(express.static(process.cwd()+'/uploads'))

app.set('view engine','ejs')
app.set('views',process.cwd()+'/src/views')

app.use(routes)
app.listen(config.port,()=>{
    console.log(`Server running port:${config.port}`);
})
