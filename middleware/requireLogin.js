const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) =>{
    const {authorization} = req.headers;
    if(!authorization){
         res.status(401).json({error: "You must be login"});
    }

    const token = authorization.replace("Bearer " , "");
    jwt.verify(token,'secret',(err, payload) => {
        if(err){
            res.status(401).json({error: "You must be login"}); 
        }
        const {_id} = payload;
        User.findById(_id).then(userData =>{
            req.user = userData;
            next();
        });
    });
}