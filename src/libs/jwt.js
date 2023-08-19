const jwt =require('jsonwebtoken')
const config = require('../../config')

const secret=config.key


const sign=async(payload)=>await jwt.sign(payload,secret)

const verify=async(payload)=>await jwt.verify(payload,secret)


module.exports={
    sign,
    verify
}