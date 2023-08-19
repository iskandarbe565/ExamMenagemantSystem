const pg = require("../libs/pg");
const {passCompare,passHash}=require("../libs/bcrypt");
const { sign } = require("../libs/jwt");






const Register = async(req,res)=>{
    try {
        const { email,username,password,last_name,first_name,phone} = req.body;
    
        const findUser = await pg("select * from users where username = $1",username);
    
        if (findUser.length) {
            return res.status(403).json({message:'Username mavjud'})
           
        }
        else{   
        const hashPass = await passHash(password);
       const newUser=( await pg (`insert into users(username,password,email,first_name,last_name,phone) values($1,$2,$3,$4,$5,$6)`,
        username,hashPass,email,first_name,last_name,phone))[0];
        
        res.status(201).json({message:"succes register"})
        
        }
        } catch (error) {
        res.status(400).json({message:error.message})
        }
        }
    
    
    const Login = async(req,res) => {
    try {
        
        const {username,password } = req.body;
        
        const findUser = (await pg("select * from users where username = $1",username))[0];
        
        if (!findUser) { 
            return  res.status(403).json({message:'Bunday foydalanuvchi mavjud emas.'})
        }
        
        const compare = await passCompare(password,findUser.password)
        if(!compare){
            return res.status(403).json({message:'Username yoki Password xato'})
        }
        console.log(findUser.id);
        const token = await sign(findUser.id);
        res.cookie('token',token)
        console.log(token);
        
        res.status(200).json({message:'Success'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    }

    module.exports={
        Login,
        Register
    }