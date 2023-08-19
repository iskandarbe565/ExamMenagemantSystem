const pg = require("../libs/pg");


const getGroup=async(req,res)=>{
  try {
    
    const group=await pg(`SELECT * FROM groups;`)

    res.status(201).json({msg:"all groups:",data:group})


  } catch (error) {
    
    res.status(404).json({message:`${error.messaga}`})

  }
}

const AddGroup= async (req, res) => {
    
    try {
      const { name } = req.body;

     const  group_name=await pg(`Select *from groups where name=$1`,name)

    if(!group_name.length)
    {
      const result = await pg(`INSERT INTO groups (name) VALUES ($1) RETURNING id;`,
      name);
      res.status(201).json({ id: result.id, message: 'Group created successfully' });
    }
    else{
        res.status(404).json({messaga:"Bunday guruh mavjud !!!"})
    }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const updateGroup=async(req,res)=>{

try {
const {id}=req.params;

const {name}=req.body;

await pg(`UPDATE groups SET name=$1 WHERE id=$2`,
name,
id)

res.status(201).json({msg:"Updated groups successfully"})

} catch (error) {
  res.status(404).json({messaga:`${error.messaga}`})
  
}
  }



  const deleteGroup=async(req,res)=>{

try {
  const {id}=req.params
  await pg(`DELETE FROM groups WHERE id=$1 ;`,id)
  res.status(201).json({message:"deleted groups successfully"})
} catch (error) {

  res.status(404).json({msg:`${error.message}`})
  
}
  }


  module.exports={
    AddGroup,
    getGroup,
    updateGroup,
    deleteGroup


  }