const jwt = require ('jsonwebtoken');
const config = require ('config');
console.log(config)
module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
      return res.status(401).json({msg:' No token, anauthorized denied'});
    }
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    }catch(e){
        res.status(401).json({msg:' Token invalid'});
    }
}

