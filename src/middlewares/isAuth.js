
const { verify } = require("../libs/jwt");

const isAuth = (req, res, next) => {
  try {
    const {token} = req.cookies;

  
     if (!token) return res.status(201).json({msg:"Invalid token"})
    const Verify= verify(token);

    req.userId = Verify;

    next();
  } catch (error) {
    res.status(403).json({msg:error.message})
  }
};

module.exports = isAuth;
